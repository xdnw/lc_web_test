import {ALLIANCESTATS, METRIC_COMPARE_BY_TURN, TABLE} from "../../../lib/endpoints";
import {Link, useParams } from "react-router-dom";
import {CM} from "../../../utils/Command";
import {getPwUrl} from "../../../lib/pwutil";
import { Button } from "@/components/ui/button";
import Color from "../../../components/renderer/Color";
import {commafy} from "../../../utils/StringUtil";
import Timestamp from "../../../components/ui/timestamp";
import {StaticViewGraph} from "../../graphs/view_graph";
import LazyTooltip from "../../../components/ui/LazyTooltip";
import {ViewCommand} from "../../command/view_command";
import {CopoToClipboardTextArea} from "../../../components/ui/copytoclipboard";
import {numericMap} from "../../../components/ui/renderers";
import EndpointWrapper from "@/components/api/bulkwrapper";
import LazyIcon from "@/components/ui/LazyIcon";

/*
# Alliance extends NationList extends Alliances
Basic stats
MMR
Link to wars

Treaties
// Activity button?

- Customize button (customize saves to local storage)
- color links to color bloc pages (TODO color bloc component does this - from the formatter)
  Graphs for alliances, show current value with graph on hover?

  /alliance stats allianceMetricAB
  /alliance stats metricsByTurn
  /alliance stats ranking
  /alliance stats rankingTime


  /sheets_ia ActivitySheet
  /sheets_ia activity_date
  /sheets_ia daychange
  /sheets_ia declares_date
  /sheets_ia deposits_date

Link to guild, or link to add guild

- Member list

/alliance edit

If server is offshore server, and this is an account

- /deposits add
- /deposits check

If meets requirements of being an offshore
/offshore markAsOffshore
 */



export default function Alliance() {
    const type = "Alliance";
    const {alliance} = useParams<{ alliance: string }>();

    const columns = CM.placeholders('DBAlliance')
        .array()
        .add({cmd: 'getname'}) // 0
        .add({cmd: 'getid'}) // 1
        .add({cmd: 'getacronym'}) // 2
        .add({cmd: 'getflag'}) // 3
        .add({cmd: 'getforum_link'}) // 4
        .add({cmd: 'getdiscord_link'}) // 5
        .add({cmd: 'getwiki_link'}) // 6
        .add({cmd: 'getdatecreated'}) // 7
        .add({cmd: 'getcolor'}) // 8
        .add({cmd: 'getscore'}) // 9
        .add({cmd: 'getestimatedstockpilevalue'}) // 10
        .add({cmd: 'getestimatedstockpile'}) // 11
        .add({cmd: 'getlootvalue', args: {'score': '1'}}) // 12
        .add({cmd: 'getrevenueconverted'}) // 13
        .add({cmd: 'getcostconverted'}) // 14
        .add({cmd: 'countmembers'}) // 15
        .add({cmd: 'countnations', args: {"filter": "#position=1"}}) // 16
        .add({cmd: 'countnations', args: {"filter": "#isTaxable"}}) // 17
        .add({cmd: 'getnumtreasures'}) // 18
        .add({cmd: 'countnations', args: {"filter": "#color=gray,#vm_turns=0"}}) // 19 gray (all)
        .add({cmd: 'countnations', args: {"filter": "#color=gray,#vm_turns=0,#active_m<7200"}}) // 20 gray (active)
        .add({cmd: 'countnations', args: {"filter": "#cities<10,#FreeOffensiveSlots>0,(#color!=beige|#isblockaded=0)"}}) // 21 C10 without raids
        .add({cmd: 'getcities'}) // 22
        .add({cmd: 'gettotal', args: {"attribute": "cityvalue", 'filter': "#position>1,#vm_turns=0"}}) // 23
        .build();

    return <EndpointWrapper endpoint={TABLE} args={{
        type: type,
        selection_str: alliance,
        columns: columns,
    }}>
        {({data}) => {
            if (data.cells.length != 2) {
                return <>{JSON.stringify(data)}</>
            }
            const row = data.cells[1] as (string | number)[];
            return (<>
            TEST
                <table className="display text-xs compact font-mono dataTable">
                <thead>
                    <tr>
                        <div className="mt-1 flex flex-wrap gap-1 justify-start">
                        {row[4] && <Button variant="outline" size="sm" asChild><Link to={row[4] as string}>Forum</Link></Button>}
                        {row[5] && <Button variant="outline" size="sm" asChild><Link
                            to={row[5] as string}>Discord</Link></Button>}
                        {row[6] && <Button variant="outline" size="sm" asChild><Link
                            to={row[6] as string}>Wiki</Link></Button>}
                        {row[15] as number > 0 && <Button variant="outline" size="sm" asChild><Link
                            to={`${process.env.BASE_PATH}nations/AA:${row[1]},#position>1`}>{row[15]}&nbsp;Members</Link></Button>}
                        {row[17] as number > 0 && <Button variant="outline" size="sm" asChild><Link
                            to={`${process.env.BASE_PATH}nations/AA:${row[1]},#isTaxable`}>{row[17]}&nbsp;Taxable</Link></Button>}
                        {row[16] as number > 0 && <Button variant="outline" size="sm" asChild><Link
                            to={`${process.env.BASE_PATH}nations/AA:${row[1]},#position=1`}>{row[16]}&nbsp;Applicants</Link></Button>}
                        </div>
                    </tr>
                    <tr>
                        <th colSpan={2}>
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
                                    {row[0] as string} <LazyIcon name="ExternalLink"/>
                                </Link>
                                {row[2] && (
                                    <span className="text-sm text-gray-500">
                                        ({row[2] as string})
                                    </span>
                                )}
                            </div>
                        </th>
                    </tr>
                </thead>
                    <tbody>
                        <tr>
                            <td className="p-1">Created</td>
                            <td className="p-1">
                                <Timestamp millis={row[7] as number}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-1">Color</td>
                            <td className="p-1 flex items-center">
                                <Color colorId={row[8] as string}/>
                                <span>{row[8] as string}</span>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-1">Rank</td>
                            <td className="p-1 flex items-center">
                                TODO
                            </td>
                        </tr>
                        <tr>
                            <td className="p-1">Score</td>
                            <td className="p-1">
                                <LazyTooltip className={"underline"} content={
                                    <>
                                        <ViewCommand command={["alliance", "stats", "attribute_ranking"]} args={{attribute: "{score}", num_results: "5", highlight: row[1] + ""}}/>
                                        <StaticViewGraph endpoint={METRIC_COMPARE_BY_TURN} args={{
                                        metric: 'score',
                                        alliances: "aa:" + row[1],
                                        start: 'timestamp:' + row[7],
                                    }} />
                                    </>
                                } >
                                    {commafy(row[9] as number)}ns
                                </LazyTooltip>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-1">Estimated Stockpile Value</td>
                            <td className="p-1">
                                <LazyTooltip className={"underline"} content={<>
                                        <ViewCommand command={["alliance", "stats", "attribute_ranking"]} args={{attribute: "{getestimatedstockpilevalue}", num_results: "5", highlight: row[1] + ""}}/>
                                        <CopoToClipboardTextArea text={numericMap(row[11] as string)} />
                                    </>
                                } >
                                    ${commafy(row[10] as number)}
                                </LazyTooltip>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-1">Loot Per Score</td>
                            <td className="p-1">
                                <LazyTooltip className={"underline"} content={<>
                                        <ViewCommand command={["alliance", "stats", "loot_ranking"]} args={{time: "30d", num_results: "5", highlight: "AA:" + row[1]}}/>
                                        <hr/>
                                        Alliance Loot Losses:
                                        <ViewCommand command={["stats_war", "warcostranking"]} args={{timeStart: "30d", type: "ATTACKER_LOSSES", allowedAttacks: "A_LOOT", groupByAlliance: "true", num_results: "5", highlight: "AA:" + row[1]}}/>
                                    </>
                                } >

                                    ${commafy(row[12] as number)}
                                </LazyTooltip>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-1">Revenue Converted</td>
                            <td className="p-1">
                                <LazyTooltip className={"underline"} content={<>
                                        <ViewCommand command={["trade", "findproducer"]} args={{resources: "*", includeNegative: "true", num_results: "5", highlight: row[1] + ""}}/>
                                        <StaticViewGraph endpoint={ALLIANCESTATS} args={{
                                            metrics: 'revenue',
                                            coalition: "aa:" + row[1],
                                            start: 'timestamp:' + row[7],
                                            end: "0"
                                        }} />
                                        <ViewCommand command={["alliance", "revenue"]} args={{nations: "AA:" + row[1]}}/>
                                    </>
                                } >
                                    ${commafy(row[13] as number)}
                                </LazyTooltip>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-1">Alliance Value</td>
                            <td className="p-1">
                                <LazyTooltip className={"underline"} content={<>
                                        <ViewCommand command={["alliance", "cost"]} args={{nations: "AA:" + row[1]}}/>
                                    </>
                                } >
                                    ${commafy(row[14] as number)}
                                </LazyTooltip>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-1">Gray (non VM)</td>
                            <td className="p-1 flex items-center">
                                <Button variant="outline" size="sm" asChild><Link to={`${process.env.BASE_PATH}nations/AA:${row[1]},#color=gray,#vm_turns=0`}>{row[19]}&nbsp;All</Link></Button>
                                <Button variant="outline" size="sm" asChild><Link to={`${process.env.BASE_PATH}nations/AA:${row[1]},#color=gray,#vm_turns=0,#active_m<7200`}>{row[20]}&nbsp;Active (5d)</Link></Button>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-1">&#91;C10 without raids</td>
                            <td className="p-1 flex items-center">
                                <Button variant="outline" size="sm" asChild><Link
                                    to={`${process.env.BASE_PATH}nations/AA:${row[1]},#cities<10,#FreeOffensiveSlots>0,(#color!=beige|#isblockaded=0)`}>{row[21]}&nbsp;Nations</Link></Button>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-1">Treasures</td>
                            <td className="p-1 flex items-center">
                                <LazyTooltip className={"underline"} content={<>
                                        <ViewCommand command={["alliance", "stats", "attribute_ranking"]} args={{attribute: "{numtreasures}", num_results: "5", highlight: row[1] + ""}}/>
                                        <StaticViewGraph endpoint={METRIC_COMPARE_BY_TURN} args={{
                                            metric: 'treasures',
                                            alliances: "aa:" + row[1],
                                            start: 'timestamp:' + row[7],
                                        }} />
                                    </>
                                } >
                                {commafy(row[18] as number)} ({Math.sqrt((row[18] as number) * 4).toFixed(2)}%)
                                </LazyTooltip>
                                {row[18] as number >= 0 && <Button className="ms-1" variant="outline" size="sm" asChild><Link
                                    to={`${process.env.BASE_PATH}treasures/AA:${row[1]},#treasure`}>View</Link></Button>}
                            </td>
                        </tr>
                        <tr>
                            <td className="p-1">Cities</td>
                            <td className="p-1 flex items-center">
                                <LazyTooltip className={"underline"} content={<>
                                        <ViewCommand command={["alliance", "stats", "attribute_ranking"]} args={{attribute: "{numtreasures}", num_results: "5", highlight: row[1] + ""}}/>
                                        <StaticViewGraph endpoint={METRIC_COMPARE_BY_TURN} args={{
                                            metric: 'treasures',
                                            alliances: "aa:" + row[1],
                                            start: 'timestamp:' + row[7],
                                        }} />
                                    </>
                                } >
                                    {commafy(row[22] as number)} (${commafy(row[22] as number * 4)})
                                </LazyTooltip>
                                TODO num cities + city value
                                TODO ranking
                                TODO city tier graph
                                TODO cities over time
                            </td>
                        </tr>
                        <tr>
                            <td className="p-1">Avg Infra</td>
                            <td className="p-1 flex items-center">
                                TODO avg infra + infra value
                                TODO infra by tier
                                TODO avg infra over time
                            </td>
                        </tr>
                        <tr>
                            <td className="p-1">Avg Land</td>
                            <td className="p-1 flex items-center">
                                TODO avg land + land value
                                TODO land by tier
                                TODO avg land over time
                            </td>
                        </tr>
                        <tr>
                            <td className="p-1">MMR</td>
                            <td className="p-1 flex items-center">
                                TODO (non tooltip) unit= | build=
                                TODO MMR over time + MMR tier graph
                            </td>
                        </tr>
                        <tr>
                            <td className="p-1">Soldier %</td>
                            <td className="p-1 flex items-center">
                                TODO unit tier graph, unit over time
                            </td>
                        </tr>
                        <tr>
                            <td className="p-1">Tank %</td>
                            <td className="p-1 flex items-center">
                                TODO unit tier graph, unit over time
                            </td>
                        </tr>
                        <tr>
                            <td className="p-1">Aircraft %</td>
                            <td className="p-1 flex items-center">
                                TODO unit tier graph, unit over time
                            </td>
                        </tr>
                        <tr>
                            <td className="p-1">Ships %</td>
                            <td className="p-1 flex items-center">
                                TODO unit tier graph, unit over time
                            </td>
                        </tr>
                        <tr>
                            <td className="p-1">Missiles</td>
                            <td className="p-1 flex items-center">
                                TODO num missiles (... avg)
                                TODO MLP tier graph
                                TODO missiles over time
                                TODO ranking
                            </td>
                        </tr>
                        <tr>
                            <td className="p-1">Nukes</td>
                            <td className="p-1 flex items-center">
                                TODO num nukes (... avg)
                                TODO nuke tier graph
                                TODO NRF tier graph
                                TODO nuke over time
                                TODO ranking
                            </td>
                        </tr>
                        <tr>
                            <td className="p-1">Spies</td>
                            <td className="p-1 flex items-center">
                                TODO Spy tier graph
                                TODO avg spies over time
                            </td>
                        </tr>
                        <tr>
                            <td className="p-1">Active Wars</td>
                            <td className="p-1 flex items-center">
                                TODO Off: 5, Def: 5 (10 Total)
                                TODO Wars by tier
                                TODO strength tier graph
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>);
        }}
    </EndpointWrapper>
}

export function ExampleContent() {
    console.log("Rendering lazy content");
    return (
        <div>
            This is the text in the tooltip, that is rendered lazily
        </div>
    );
}