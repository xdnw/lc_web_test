import {useDialog} from "../../../components/layout/DialogContext";
import React, {useRef} from "react";
import {METRIC_COMPARE_BY_TURN, TABLE} from "../../../components/api/endpoints";
import {getUrl} from "../../custom_table";
import {Link, useParams } from "react-router-dom";
import { COMMANDS } from "@/lib/commands";
import {CM, PlaceholderArrayBuilder} from "../../../utils/Command";
import {getPwUrl} from "../../../lib/pwutil";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Color from "../../../components/renderer/Color";
import {commafy} from "../../../utils/StringUtil";
import Timestamp from "../../../components/ui/timestamp";
import {StaticViewGraph} from "../../graphs/view_graph";
import { WebGraph } from "@/components/api/apitypes";
import LazyTooltip from "../../../components/ui/LazyTooltip";
import {ViewCommand} from "../../command/view_command";

export default function Alliance() {
    // return (
    //     <div>
    //         Hello World<br />
    //         <LazyTooltip content={ExampleContent} delay={500} lockTime={1000} unlockTime={500}>
    //             <span>This is a tooltip</span>
    //         </LazyTooltip>
    //     </div>
    // );
    const type = "Alliance";
    const {alliance} = useParams<{ alliance: string }>();

    const columns = CM.placeholders('DBAlliance')
        .array()
        .add({cmd: 'getname'})
        .add({cmd: 'getid'})
        .add({cmd: 'getacronym'})
        .add({cmd: 'getflag'})
        .add({cmd: 'getforum_link'})
        .add({cmd: 'getdiscord_link'})
        .add({cmd: 'getwiki_link'})
        .add({cmd: 'getdatecreated'})
        .add({cmd: 'getcolor'})
        .add({cmd: 'getscore'})
        .add({cmd: 'getestimatedstockpilevalue'})
        .add({cmd: 'getlootvalue', args: {'score': '1'}})
        .add({cmd: 'getrevenueconverted'})
        .build();
    const {showDialog} = useDialog();
    const url = useRef(getUrl(type, alliance as string, columns));

    return <>
        {TABLE.useDisplay({
            args: {
                type: type,
                selection_str: alliance,
                columns: columns,
            },
            render: (newData) => {
                if (newData.cells.length != 2) {
                    return <>{JSON.stringify(newData)}</>
                }
                const row = newData.cells[1] as (string | number)[];
                return (<>
                    <div className="flex items-center space-x-2">
                        {row[3] && (
                            <img
                                src={row[3] as string}
                                alt="Alliance flag"
                                className="w-16 h-10"
                            />
                        )}
                        <Link
                            className="text-2xl font-bolt flex items-center"
                            to={getPwUrl(`alliance/id=${row[1] as string}`)}
                        >
                            {row[0] as string} <ExternalLink/>
                        </Link>
                        {/*acronym in (bracket) if present*/}
                        {row[2] && (
                            <span className="text-sm text-gray-500">
                                ({row[2] as string})
                            </span>
                        )}
                    </div>
                    <div className="mt-1">
                        {row[4] && <Button variant="outline" size="sm" asChild><Link to={row[4] as string}>Forum</Link></Button>}
                        {row[5] && <Button variant="outline" size="sm" asChild><Link
                            to={row[5] as string}>Discord</Link></Button>}
                        {row[6] && <Button variant="outline" size="sm" asChild><Link
                            to={row[6] as string}>Wiki</Link></Button>}
                    </div>
                    <table>
                        <tbody>
                        <tr>
                            <td className="p-1">Created</td>
                            <td className="p-1"><Timestamp millis={row[7] as number}/></td>
                        </tr>
                        <tr>
                            <td className="p-1">Color</td>
                            <td className="p-1 flex items-center">
                                <Color colorId={row[8] as string}/>
                                <span>{row[8] as string}</span>
                            </td>
                        </tr>
                        <tr>
                            {/* show over time*/}

                            {/*TODO show ranking */}
                                <td className="p-1">Score</td>
                                <td className="p-1">
                                    <LazyTooltip className={"underline w-1/2"} content={() => {
                                        return <>
                                            <ViewCommand command={"alliance stats attribute_ranking"} args={{attribute: "{score}", num_results: "5"}}/>
                                            <StaticViewGraph endpoint={METRIC_COMPARE_BY_TURN} args={{
                                            metric: 'score',
                                            alliances: "aa:" + row[1],
                                            start: 'timestamp:' + row[7],
                                        }} />
                                        </>
                                    }} delay={500} lockTime={1000} unlockTime={500}>
                                        {commafy(row[9] as number)}
                                    </LazyTooltip>
                                </td>
                            </tr>
                            <tr>
                                {/* show ranking */}
                                <td className="p-1">Estimated Stockpile Value</td>
                                <td className="p-1">${commafy(row[10] as number)}</td>
                            </tr>
                            <tr>
                                {/* show ranking */}
                                {/* show losses (30d) */}
                                {/* show losses 30d ranking */}
                                <td className="p-1">Loot Value</td>
                                <td className="p-1">${commafy(row[11] as number)}</td>
                            </tr>
                            <tr>
                                {/* show ranking */}
                                {/* show value over time for total and each rss */}
                                <td className="p-1">Revenue Converted</td>
                                <td className="p-1">${commafy(row[12] as number)}</td>
                            </tr>
                        </tbody>
                    </table>
                </>);
            }
        })}
    </>
}

export function ExampleContent() {
    console.log("Rendering lazy content");
    return (
        <div>
            This is the text in the tooltip, that is rendered lazily
        </div>
    );
}