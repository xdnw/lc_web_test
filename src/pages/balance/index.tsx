import { BALANCE, WITHDRAW } from "@/lib/endpoints";
import { Link, useParams } from "react-router-dom";
import { COMMANDS } from "@/lib/commands.ts";
import React, { ReactNode, useRef, useState } from "react";
import { commafy } from "@/utils/StringUtil.ts";
import { Button } from "@/components/ui/button.tsx";
import { BlockCopyButton } from "@/components/ui/block-copy-button.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import Loading from "@/components/ui/loading.tsx";
import { WebBalance, WebTransferResult } from "../../lib/apitypes";
import EndpointWrapper from "@/components/api/bulkwrapper";
import { ApiFormInputs } from "@/components/api/apiform";
import LazyIcon from "@/components/ui/LazyIcon";

export default function BalancePage() {
    const { category } = useParams(); // TODO

    return <EndpointWrapper endpoint={BALANCE} args={{}}>
        {({ data }) => {
            return <RenderBalance balance={data} />;
        }}
    </EndpointWrapper>
}

const rssTypes: string[] = COMMANDS.options.ResourceType.options;

function toResourceString(arr: number[]) {
    const filtered = Object.fromEntries(
        rssTypes.map((type, index) => [type, arr[index]]).filter(([, value]) => value !== 0)
    );
    return JSON.stringify(filtered);
}

function isEmpty(arr: number[]) {
    return arr.every((value) => value === 0);
}

function RenderBalance({ balance }: { balance: WebBalance }) {
    const [showBreakdown, setShowBreakdown] = useState(false);
    const canWithdraw = balance.access && Object.keys(balance.access).length > 0;
    const [amount, setAmount] = useState<number[]>(new Array(rssTypes.length).fill(0));
    const [loading, setLoading] = useState(false);
    const [reactMessage, setReactMessage] = useState<ReactNode | null>(null);

    const toggleBreakdown = () => {
        setShowBreakdown(!showBreakdown);
    };
    const textRef = useRef<HTMLParagraphElement>(null);
    const qualifiedId = balance.is_aa ? "AA:" + balance.id : balance.id;

    if (loading) return <Loading />;
    if (reactMessage) return reactMessage;

    return <>
        <div className="mb-1">
            <Button variant="outline" size="sm" asChild><Link
                to={`${process.env.BASE_PATH}guild_member`}><LazyIcon name="ChevronLeft" className="h-4 w-4" />Back</Link></Button>
            <h1 className="text-2xl font-bold">Balance</h1>
            <div className="inline-block">
                <div className="inline-block flex">
                    <table className="table-auto divide-y bg-background">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="border border-gray-200">Resource Type</th>
                                <th className="border border-gray-200">Value</th>
                                {canWithdraw && <th className="border border-gray-200">Amount</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {rssTypes.map((type, index) => {
                                return type != "CREDITS" && <tr key={type}>
                                    <td className="border border-gray-200 px-1">{type}</td>
                                    <td className="border border-gray-200 px-1">{commafy(balance.total[index])}</td>
                                    {canWithdraw && <td className="border border-gray-200">
                                        <input
                                            type="number"
                                            className="px-1 w-20 relative"
                                            value={amount[index]}
                                            onChange={(e) => {
                                                const newAmount = [...amount];
                                                newAmount[index] = parseInt(e.target.value, 10) || 0;
                                                setAmount(newAmount);
                                            }}
                                        />
                                    </td>}
                                </tr>
                            })}
                        </tbody>
                    </table>
                    {canWithdraw && <WithdrawForm setReactMessage={setReactMessage} setLoading={setLoading} balance={balance} amount={amount} />}
                </div>
                <Button variant="secondary" size="sm" className="w-full mb-1" asChild>
                    <Link to={`${process.env.BASE_PATH}records`}>View Transaction Records</Link>
                </Button>
                <Button variant="secondary" size="sm" onClick={toggleBreakdown} className="w-full">
                    {showBreakdown ? <>Hide<LazyIcon name="ChevronUp" /></> : <>Breakdown<LazyIcon name="ChevronDown" /></>}
                </Button>
            </div>
            <div className={`transition-all duration-200 ease-in-out ${showBreakdown ? 'p-1 max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <table className="table-auto divide-y w-full bg-background">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                            <th className="border border-gray-200">Category</th>
                            {rssTypes.map((type) => (
                                <th key={type} className="border border-gray-200">{type}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(balance.breakdown).map((category) => (
                            <tr key={category}>
                                <td className="border border-gray-200 px-1">{category}</td>
                                {balance.breakdown[category].map((value, index) => (
                                    <td key={`${category}-${index}`}
                                        className="border border-gray-200 px-1">{commafy(value)}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        {canWithdraw && !isEmpty(amount) && <div className="p-1 bg-accent relative">
            <h4 className="text-lg font-bold">Discord Withdraw Command</h4>
            <TooltipProvider>
                <BlockCopyButton getText={() => textRef.current ? textRef.current.textContent ?? "" : ''} />
            </TooltipProvider>
            <p ref={textRef}>
                /transfer resources receiver:{qualifiedId} transfer:{toResourceString(amount)} deposittype:{balance.is_aa ? "IGNORE" : "DEPOSIT"}
            </p>
        </div>}
    </>;
}

export function WithdrawForm({ balance, amount, setLoading, setReactMessage }: { balance: WebBalance, amount: number[], setLoading: (loading: boolean) => void, setReactMessage: (message: ReactNode | null) => void }) {
    return <ApiFormInputs
        endpoint={WITHDRAW}
        default_values={{
            receiver: (balance.is_aa ? "AA:" : "") + balance.id,
            amount: toResourceString(amount),
            note: balance.is_aa ? "IGNORE" : "DEPOSIT",
        }}
        label={<span className="transform rotate-90 flex items-center"><LazyIcon name="ChevronUp" />Withdraw</span>}
        handle_error={(error) => setReactMessage(<TransferError message={error.message} />)}
        classes="w-10 p-0 row-span-full h-50 flex items-center justify-center bg-destructive"
        handle_response={({ data }) => {
            setLoading(false);
            setReactMessage(<TransferSuccess message={data} />);
        }}
    />
}

export function TransferSuccess({ message }: { message: WebTransferResult }) {
    return (
        <>
            <Button variant="outline" size="sm" asChild>
                <Link to={`${process.env.BASE_PATH}guild_member`}>
                    <LazyIcon name="ChevronLeft" className="h-4 w-4" />Back
                </Link>
            </Button>
            <div className={`${message.status_success ? "bg-green-100/10 text-green-500 border-green-400" : "bg-red-100/10 text-red-500 border-red-400"} border-2 px-4 py-3 relative`} role="alert">
                <strong className="font-bold">Success!</strong>
                <span className="block sm:inline"> {message.status_msg}</span>
                <ul className="mt-2 list-disc list-inside">
                    <li><strong>Status:</strong> {message.status}</li>
                    <li><strong>Receiver: </strong>
                        <Link className="text-blue-500 hover:text-blue-600 underline"
                            to={`https://politicsandwar.com/${message.receiver_is_aa ? "alliance" : "nation"}/id=${message.receiver_id}`}>
                            {message.receiver_name} / {message.receiver_is_aa ? "AA:" : "nation:"}{message.receiver_id}
                        </Link>
                    </li>
                    <li><strong>Amount:</strong> {toResourceString(message.amount)}</li>
                    <li><strong>Note:</strong> {message.note}</li>
                    <li><strong>Messages:</strong>
                        <ul className="list-disc list-inside ml-4">
                            {message.messages.map((msg, index) => (
                                <li key={index}>{msg}</li>
                            ))}
                        </ul>
                    </li>
                </ul>
            </div>
        </>
    );
}

export function TransferError({ message }: { message: string }) {
    return (
        <>
            <Button variant="outline" size="sm" asChild><Link
                to={`${process.env.BASE_PATH}guild_member`}><LazyIcon name="ChevronLeft" className="h-4 w-4" />Back</Link></Button>
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> {message}</span>
            </div>
        </>
    );
}