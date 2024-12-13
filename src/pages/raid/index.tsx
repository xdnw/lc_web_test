import React, {useState, useMemo, useRef, useEffect} from "react";
import {useDialog} from "../../components/layout/DialogContext";
import {Color} from "../../components/ui/renderers";
import { CommonEndpoint } from "@/components/api/endpoint";
import {Button} from "@/components/ui/button.tsx";
import {Link, useParams} from "react-router-dom";
import {commafy, formatDuration, formatSi} from "@/utils/StringUtil.ts";
import Loading from "@/components/ui/loading.tsx";
import {COMMANDS} from "@/lib/commands.ts";
import {WebTarget, WebTargets} from "@/components/api/apitypes";
import {RAID, UNPROTECTED} from "../../components/api/endpoints";
import {IOptionData} from "../../utils/Command";
import {useSession} from "../../components/api/SessionContext";
import {WebSession, WebSuccess} from "../../components/api/apitypes";
import ArgInput from "../../components/cmd/ArgInput";
import QueryComponent from "../../components/cmd/QueryComponent";
import {CommandStoreType, createCommandStore} from "../../utils/StateUtil";
import {OutputValuesDisplay} from "../command";

type RaidOptions = { [key: string]: { endpoint: (typeof RAID | typeof UNPROTECTED), description: string, default_values: { [key: string]: (string | undefined) } } };

export default function RaidSection() {

    const { nation } = useParams<{ nation: string }>();
    const nationOverride = useRef<string | undefined>(nation);
    useEffect(() => {
        if (nation) nationOverride.current = nation;
    }, [nation]);

    const [raidOutput, setRaidOutput] = useState<WebTargets | boolean | string | null>(null);
    const [desc, setDesc] = useState<string | null>(null);
    const { session, error, setSession, refetchSession } = useSession();

    const raiding: RaidOptions = useMemo<RaidOptions>(() => ({
        app_7d: {
            endpoint: RAID,
            default_values: {
                nations: "*,#position<=1",
                num_results: "25",
            } as { [key: string]: string },
            description: "Attackable applicants and nones inactive for 7d"
        },
        members: {
            endpoint: RAID,
            default_values: {
                nations: "*",
                num_results: "25"
            } as { [key: string]: string },
            description: "All attackable nations inactive for 7d"
        },
        beige: {
            endpoint: RAID,
            default_values: {
                nations: "*",
                num_results: "25",
                beige_turns: "24"
            } as { [key: string]: string },
            description: "All nations inactive for 7d, including on beige"
        },
        ground: {
            endpoint: RAID,
            default_values: {
                nations: "#tankpct<0.2,#soldierpct<0.4,*",
                num_results: "25",
                time_inactive: "0d",
                weak_ground: "true"
            } as { [key: string]: string },
            description: "Nations with weak ground, including active nations"
        },
        ground_2d: {
            endpoint: RAID,
            default_values: {
                nations: "#tankpct<0.2,#soldierpct<0.4,*",
                num_results: "25",
                time_inactive: "2d",
                weak_ground: "true"
            } as { [key: string]: string },
            description: "Nations with weak ground, inactive for 2d"
        },
        losing: {
            endpoint: RAID,
            default_values: {
                nations: "#def>0,#RelativeStrength<1,*",
                num_results: "25",
                time_inactive: "0d",
                weak_ground: "true"
            } as { [key: string]: string },
            description: "Nations losing wars"
        },
        unprotected: {
            endpoint: UNPROTECTED,
            default_values: {
                nations: "*",
                num_results: "25",
                ignoreODP: "true",
                includeAllies: "true",
                maxRelativeCounterStrength: "90"
            } as { [key: string]: string },
            description: "Nations least likely to defend or have counters"
        }
    }), [nation]);
    // const [enemies, setEnemies] = useState<WebEnemyInfo | null>(null);
    // WebEnemyInfo = alliance ids, alliance names
    // war find options

    return <div className="themeDiv bg-opacity-10 p-2 rounded mt-2">
        <h1 className="text-2xl mt-2 font-bold">War / Raiding</h1>
        {((!session || !session?.nation) && !nation) && <PickNation nation={nationOverride}/>}
        <div className="p-2 my-1 relative">
            {/*<FetchEnemies setEnemies={setEnemies} />*/}
            {/*{enemies && <DisplayEnemies />}*/}
            Raiding: {Object.keys(raiding).map((key, index) => (
            <span key={index}>
                <RaidButton optionKey={key}
                            setDesc={setDesc}
                            options={raiding}
                            setRaidOutput={setRaidOutput}
                            nation={nationOverride}
                            loading={raidOutput === true}/>
            </span>
        ))}
            <br/>
            {desc && <div className="p-1 bg-primary/10">{desc}</div>}
            <RaidOutput output={raidOutput} dismiss={() => {
                setRaidOutput(null);
                setDesc("")
            }}/>
        </div>
    </div>;
}

export function PickNation({nation}: { nation: React.MutableRefObject<string | undefined> }) {
    const [pickedNation, setPickedNation] = useState<string | undefined>(undefined);
    return (
        <>
            <div className={`${pickedNation ? 'text-primary/80 border-secondary' : 'text-red-500 border-red-500/25'} border w-full mb-1 p-1 relative bg-accent rounded`}>
                {pickedNation ? (
                    <>Currently selected: {pickedNation}</>
                ) : (
                    <>You MUST Select a Nation to use this tool, or login!</>
                )}
            </div>
            <QueryComponent element={"DBNation"} multi={false} argName={"nation"} initialValue={""} setOutputValue={(name, val) => {
                setPickedNation(val);
                nation.current = val;
            }}/>
        </>
    );
}

export function RaidButton({optionKey, options, setRaidOutput, loading, setDesc, nation}: {
    optionKey: string;
    options: RaidOptions,
    setRaidOutput: (value: WebTargets | boolean | string | null) => void,
    loading: boolean,
    setDesc: (value: string) => void,
    nation: React.MutableRefObject<string | undefined>
}) {
    const { showDialog } = useDialog();
    return options[optionKey].endpoint.useForm({
        default_values: options[optionKey].default_values as { [key: string]: string },
        label: optionKey,
        handle_submit: (data) => {
            if (nation.current) {
                data.nation = nation.current;
            } else {
                delete data.nation;
            }
            return true;
        },
        handle_response: (data) => {
            setRaidOutput(data);
        },
        handle_loading: () => {
            setDesc(options[optionKey].description);
            setRaidOutput(true);
        },
        handle_error: (error) => {
            setRaidOutput(null);
            showDialog("Error", error, true);
        },
        classes: `mb-1 border-primary/20 ${loading ? "cursor-wait disabled" : ""}`
    });
}

export function UnprotectedButton({options, setRaidOutput, loading, desc, setDesc }: { options: {[key: string]: string}, setRaidOutput: (value: WebTargets | boolean | string | null) => void, loading: boolean, desc: string, setDesc: (value: string) => void }) {
    const { showDialog } = useDialog();
    return UNPROTECTED.useForm({
        default_values: options,
        label: "unprotected",
        handle_response: (data) => {
            setRaidOutput(data);
        },
        handle_loading: () => {
            setDesc(desc);
            setRaidOutput(true);
        },
        handle_error: (error) => {
            setRaidOutput(null);
            showDialog("Error", error, true);
        },
        classes: `mb-1 border-primary/20 ${loading ? "cursor-wait disabled" : ""}`
    });
}

const ranks: string[] = (((COMMANDS.options["Rank"] as IOptionData).options ?? [])).map((o) => o === "REMOVE" ? "" : o);

export function RaidOutput({ output, dismiss }: { output: WebTargets | boolean | string | null, dismiss: () => void }) {
    if (!output) return <></>
    if (output === true) return (<Loading />);
    const now_ms = Date.now();
    const targets = output as WebTargets;
    return (
        <div className="w-full">
            <table className="w-full text-sm table-auto">
                <thead className="text-left">
                <tr>
                    <th>Name</th>
                    <th>Alliance</th>
                    <th></th>
                    {targets.include_strength && <th>Strength</th>}
                    <th>Loot</th>
                    <th>Rank</th>
                    <th>Active</th>
                    <th>💂</th>
                    <th>⚙</th>
                    <th>✈</th>
                    <th>🚢</th>
                    <th>🔎</th>
                    <th>🚀</th>
                    <th>☢</th>
                    <th>Score</th>
                    <th>Infra</th>
                </tr>
                </thead>
                <tbody>
                {[targets.self, ...targets.targets].map((target, index) => (
                    <WebTargetRow key={index} includeStrength={targets.include_strength} now={now_ms} self={targets.self} target={target}
                                  classes={`even:bg-black/10 even:dark:bg-white/5 ${target.id === targets.self.id ? "border border-2 border-blue-500/50 bg-blue-500/20" : ""}`}/>
                ))}
                </tbody>
            </table>
            <Button onClick={dismiss} variant="outline" size="sm" className="w-full">Dismiss</Button>
        </div>
    );
}

export function WebTargetRow({includeStrength, self, target, classes, now }: { includeStrength: boolean, self: WebTarget, target: WebTarget, classes: string, now: number }) {
    return (
        <tr className={classes}>
            <td className="border border-gray-500/25 p-1">{target.id == self.id ? "Your Nation" : <Link className="text-blue-600 hover:text-blue-800 underline"
                                                                                                        to={`https://politicsandwar.com/nation/id=${target.id}`}>{target.nation}</Link>}</td>
            <td className="border border-gray-500/25 p-1">{target.id == self.id ? "" : target.alliance_id === 0 ? "None" :
                <Link className="text-blue-600 hover:text-blue-800 underline"
                      to={`https://politicsandwar.com/nation/id=${target.alliance_id}`}>{target.alliance}</Link>}</td>
            <td className="border border-gray-500/25">
                <div className="flex justify-center items-center text-center">
                    <Color colorId={target.color_id} beigeTurns={target.beige_turns}/>
                </div>
            </td>
            {includeStrength &&
                <td className="border-0.5border border-gray-500/25 p-1">{target.id != self.id ? `${formatSi(target.strength)}%` : ""}</td>}
            <td className="border border-gray-500/25 p-1">{target.id == self.id ? "" : `$${target.expected != 0 && target.expected != target.actual ? formatSi(target.expected) + "-" : ""}${formatSi(target.actual)}`}</td>
            <td className="border border-gray-500/25 p-1">{ranks[target.position]}</td>
            <td className="border border-gray-500/25 p-1">{formatDuration(Math.round((now - target.active_ms) / 1000), 2)}</td>
            <td className="border border-gray-500/25 p-1">{commafy(target.soldier)}</td>
            <td className="border border-gray-500/25 p-1">{commafy(target.tank)}</td>
            <td className="border border-gray-500/25 p-1">{commafy(target.aircraft)}</td>
            <td className="border border-gray-500/25 p-1">{commafy(target.ship)}</td>
            <td className="border border-gray-500/25 p-1">{commafy(target.spies)}</td>
            <td className="border border-gray-500/25 p-1">{commafy(target.missile)}</td>
            <td className="border border-gray-500/25 p-1">{commafy(target.nuke)}</td>
            <td className="border border-gray-500/25 p-1">{commafy(Math.round(target.avg_infra))}</td>
            <td className="border border-gray-500/25 p-1">{commafy(target.score)}</td>
        </tr>
    );
}