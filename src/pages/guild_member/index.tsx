import React, {useRef, useState} from "react";
import MarkupRenderer from "@/components/ui/MarkupRenderer.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    BANK_ACCESS,
    MARK_ALL_READ,
    MY_AUDITS, RAID, UNPROTECTED,
    UNREAD_COUNT,
    WebAudits, WebBankAccess, WebTarget, WebTargets
} from "@/components/api/endpoints.tsx";
import {Link} from "react-router-dom";
import {commafy, formatDuration, formatSi} from "@/utils/StringUtil.ts";
import Loading from "@/components/ui/loading.tsx";
import {COMMANDS} from "@/lib/commands.ts";

export default function GuildMember() {
    // audit section
    // announcements
    // bank section
    // raid section
    // grant section
    return (
        <div className="p-2">
            <AnnouncementSection />
            <AuditSection />
            <BankSection />
            <MyWarsSection />
            <EnemySection />
            <RaidSection />
            <GrantSection />
        </div>
    );
}

export function AuditSection() {
    return MY_AUDITS.useDisplay({
        args: {},
        render: (audits) => (<AuditComponent audits={audits} />)
    });
}

export function AuditComponent({ audits }: { audits: WebAudits }) {
    const [showDescription, setShowDescription] = useState<boolean>(false);

    if (Object.keys(audits.values).length === 0) {
        return <div className="text-green-500">You have passed all audits</div>;
    }

    const getSeverityColor = (severity: number) => {
        switch (severity) {
            case 0:
                return "bg-yellow-600/20 border-yellow-500/50 border-2 text-yellow-700 dark:text-yellow-100";
            case 1:
                return "bg-orange-600/20 border-orange-500/50 border-2 text-orange-600 dark:text-orange-100";
            case 2:
                return "bg-red-600/20 border-red-500/50 border-2 text-red-600 dark:text-red-100";
            default:
                return "";
        }
    };

    return (
        <div className="bg-accent p-1 relative">
            <h1 className="text-xl font-bold text-center">Audits</h1>
            {audits.values.map((audit, key) => (
                <div key={key} className={`p-0.5 mb-0.5 border ${getSeverityColor(audit.severity)} break-all`}>
                    <div className="flex justify-between items-center">
                        <span className="font-bold">{audit.audit}: {audit.value}</span>
                    </div>
                    {showDescription && <MarkupRenderer content={audit.description} highlight={false} />}
                </div>
            ))}
            <Button
                variant="outline" size="sm"
                className="bg-primary/25 absolute border-primary/20 top-1 right-1"
                onClick={() => setShowDescription(!showDescription)}
            >
                {showDescription ? "Show Less" : "Show More"}
            </Button>
        </div>
    );
}

export function AnnouncementSection() {
    const countRef = useRef(-1);
    const [rerender, setRerender] = useState(false);

    return UNREAD_COUNT.useDisplay({
        args: {},
        render: (count) => {
            if (countRef.current === -1) {
                countRef.current = count.value;
            }
            return (
                <div className={`${countRef.current === 0 ? "text-primary/80 border-secondary" : "text-red-500 border-red-500"} border-2 w-full mb-1 p-1 relative bg-accent/50`}>
                    <Button variant="outline" size="sm" className="mr-1 bg-primary/25 border-primary/20" asChild>
                        <Link to={`${import.meta.env.BASE_URL}announcements`}>View</Link>
                    </Button>
                    {countRef.current === 0 ? "No new announcements" : `You have ${countRef.current} unread announcements...`}
                    {countRef.current !== 0 && <DismissAnnouncements setUnreadCount={(value) => {
                        countRef.current = value;
                        setRerender(!rerender); // Trigger rerender
                    }} />}
                </div>
            );
        }
    });
}

export function DismissAnnouncements({ setUnreadCount }: { setUnreadCount: (value: number) => void }) {
    return MARK_ALL_READ.useForm({
        default_values: {},
        label: "Dismiss All",
        handle_response: (data, setMessage, setShowDialog, setTitle) => {
            setUnreadCount(0);
            setMessage("Marked all announcements as read");
            setShowDialog(true);
            setTitle("Dismissed All");
        },
        classes: "absolute top-1 right-1"
    });
}

export function BankSection() {
    return <div className="p-2 my-1 bg-accent">
        <h1 className="text-xl font-bold text-center">Banking</h1>
        {BANK_ACCESS.useDisplay({
            args: {},
            render: (access) => (<BankAccess access={access} />),
            renderError: (error) => (<div>{error}</div>)
        })}
    </div>;
}

export function BankAccess({ access }: { access: WebBankAccess }) {
    const canWithdraw = Object.keys(access).length > 0;
    const hasEcon = Object.values(access).some((value) => value > 0);
    const sections: {[key: string]: string[][]} = {};
    sections["Balance"] = [["Self","balance/self"]];
    // sections["Records"] = [["Self", "balance_history_self"]];
    if (canWithdraw) {
        // sections["Transfer"] = [];
        // sections["Transfer"].push(["Self", "withdraw/self"]);
        // sections["Transfer"].push(["Nation", "withdraw/nation"]);
        // sections["Transfer"].push(["Alliance", "withdraw/alliance"]);
    }
    if (hasEcon) {
        // sections["Balance"].push(["Manage", "manage_bank"]);
        // sections["Transfer"].push(["From Offshore", "withdraw/alliance"]);
        // sections["Records"].push(["Nation", "balance_history/self"]);
        // sections["Records"].push(["Offshore", "balance_history/offshore"]);
    }
    return (
        <div className="p-1">
            {Object.keys(sections).map((section, key) => (
                <div key={key} className="p-1 bg-primary/10 mb-1">
                    <h1 className="font-bold">{section}</h1>
                    {sections[section].map((action, key) => (
                        <Button
                            key={key}
                            variant="outline" size="sm"
                            className="bg-primary/25 border-primary/20 mr-1"
                            asChild
                        >
                            <Link to={`${import.meta.env.BASE_URL}${action[1]}`}>{action[0]}</Link>
                        </Button>
                    ))}
                </div>
            ))}
        </div>
    );
}

export function RaidSection() {
    const options: Record<string, { description: string, default_values: { nations?: string; weak_ground?: string; vm_turns?: string; beige_turns?: string; ignore_dnr?: string; time_inactive?: string; min_loot?: string; num_results?: string } }> = {
        app_7d: {
            default_values: {
                nations: "*,#position<=1",
                num_results: "25",
            },
            description: "Attackable applicants and nones inactive for 7d"
        },
        members: {
            default_values: {
                nations: "*",
                num_results: "25"
            },
            description: "All attackable nations inactive for 7d"
        },
        beige: {
            default_values: {
                nations: "*",
                num_results: "25",
                beige_turns: "24"
            },
            description: "All nations inactive for 7d, including on beige"
        },
        ground: {
            default_values: {
                nations: "#tankpct<0.2,#soldierpct<0.4,*",
                num_results: "25",
                time_inactive: "0d",
                weak_ground: "true"
            },
            description: "Nations with weak ground, including active nations"
        },
        ground_2d: {
            default_values: {
                nations: "#tankpct<0.2,#soldierpct<0.4,*",
                num_results: "25",
                time_inactive: "2d",
                weak_ground: "true"
            },
            description: "Nations with weak ground, inactive for 2d"
        },
        losing: {
            default_values: {
                nations: "#def>0,#RelativeStrength<1,*",
                num_results: "25",
                time_inactive: "0d",
                weak_ground: "true"
            },
            description: "Nations losing wars"
        },
    }

    const unprotected = {
        nations: "*",
        num_results: "25",
        ignoreODP: "true",
        includeAllies: "true",
        maxRelativeCounterStrength: "90"
    }
    const unprotected_desc = "Nations least likely to defend or have counters";

    const [raidOutput, setRaidOutput] = useState<WebTargets | boolean | string | null>(null);
    const [desc, setDesc] = useState<string | null>(null);

    return <div className="p-2 my-1 bg-accent">
        <h1 className="text-xl font-bold text-center">Raiding</h1>
        <hr className="my-2 border-2 border-primary/50"/>
        {Object.keys(options).map((key, index) => (
            <span key={index}>
                <RaidButton optionKey={key} setDesc={setDesc} options={options} setRaidOutput={setRaidOutput} loading={raidOutput === true}/>
            </span>
        ))}
        <UnprotectedButton desc={unprotected_desc} setDesc={setDesc} options={unprotected} setRaidOutput={setRaidOutput} loading={raidOutput === true}/>
        <hr className="my-2 border-2 border-primary/50"/>
        {desc && <div className="p-1 bg-primary/10">{desc}</div>}
        <RaidOutput output={raidOutput} dismiss={() => {setRaidOutput(null); setDesc("")}} />
    </div>;
}

export function RaidButton({optionKey, options, setRaidOutput, loading, setDesc }: { optionKey: string; options: Record<string, { description: string, default_values: {[key: string]: string} }>, setRaidOutput: (value: WebTargets | boolean | string | null) => void, loading: boolean, setDesc: (value: string) => void }) {
    return RAID.useForm({
        default_values: options[optionKey].default_values,
        label: optionKey,
        handle_response: (data, setMessage, setShowDialog, setTitle) => {
            setRaidOutput(data);
        },
        handle_loading: () => {
            setDesc(options[optionKey].description);
            setRaidOutput(true);
        },
        handle_error: (error, setMessage, setShowDialog, setTitle) => {
            setRaidOutput(null);
            setMessage(error);
            setTitle("Error");
            setShowDialog(true);
        },
        classes: `mb-1 bg-primary/25 border-primary/20 ${loading ? "cursor-wait disabled" : ""}`
    });
}

export function UnprotectedButton({options, setRaidOutput, loading, desc, setDesc }: { options: {[key: string]: string}, setRaidOutput: (value: WebTargets | boolean | string | null) => void, loading: boolean, desc: string, setDesc: (value: string) => void }) {
    return UNPROTECTED.useForm({
        default_values: options,
        label: "unprotected",
        handle_response: (data, setMessage, setShowDialog, setTitle) => {
            setRaidOutput(data);
        },
        handle_loading: () => {
            setDesc(desc);
            setRaidOutput(true);
        },
        handle_error: (error, setMessage, setShowDialog, setTitle) => {
            setRaidOutput(null);
            setMessage(error);
            setTitle("Error");
            setShowDialog(true);
        },
        classes: `mb-1 bg-primary/25 border-primary/20 ${loading ? "cursor-wait disabled" : ""}`
    });
}

const colors: string[] = COMMANDS.options["NationColor"].options;

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
            {[targets.self, ...targets.targets].map((target) => (
                <WebTargetRow includeStrength={targets.include_strength} now={now_ms} self={targets.self} target={target}
                              classes={target.id === targets.self.id ? "border border-2 border-primary/50 bg-blue-500/20" : ""}/>
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
            <td>{target.id == self.id ? "Your Nation" : <Link className="text-blue-600 hover:text-blue-800 underline"
                                                              to={`https://politicsandwar.com/nation/id=${target.id}`}>{target.nation}</Link>}</td>
            <td>{target.id == self.id ? "" : target.alliance_id === 0 ? "None" :
                <Link className="text-blue-600 hover:text-blue-800 underline"
                      to={`https://politicsandwar.com/nation/id=${target.alliance_id}`}>{target.alliance}</Link>}</td>
            <td>
                <div
                    className="w-5 h-5 border border-2 border-black relative"
                    style={{background: `${target.color}`}}
                    title={`${colors[target.color]}`}
                >
                    {target.beige_turns > 0 && (
                        <span className="absolute top-0 left-0 text-xs text-black">{target.beige_turns}</span>
                    )}
                </div>
            </td>
            {includeStrength && <td>{target.id != self.id ? `${formatSi(target.strength)}%` : ""}</td>}
            <td>{target.id == self.id ? "" : `$${target.expected != 0 && target.expected != target.actual ? formatSi(target.expected) + "-" : ""}${formatSi(target.actual)}`}</td>
            <td>{target.rank}</td>
            <td>{formatDuration(Math.round((now - target.active_ms) / 1000), 2)}</td>
            <td>{commafy(target.soldier)}</td>
            <td>{commafy(target.tank)}</td>
            <td>{commafy(target.aircraft)}</td>
            <td>{commafy(target.ship)}</td>
            <td>{commafy(target.spies)}</td>
            <td>{commafy(target.missile)}</td>
            <td>{commafy(target.nuke)}</td>
            <td>{commafy(Math.round(target.avg_infra))}</td>
            <td>{commafy(target.score)}</td>
        </tr>
    );
}

export function GrantSection() {
    return <div className="p-2 my-1 bg-accent">No grants are available at this time</div>;
}

export function MyWarsSection() {
    return <div className="p-2 my-1 bg-accent">TODO</div>;
}

export function EnemySection() {
    return <div className="p-2 my-1 bg-accent">TODO</div>;
}