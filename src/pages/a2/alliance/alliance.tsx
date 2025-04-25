import { ALLIANCESTATS, METRIC_COMPARE_BY_TURN, TABLE } from "../../../lib/endpoints";
import { Link, useParams } from "react-router-dom";
import { CM } from "../../../utils/Command";
import { getPwUrl } from "../../../lib/pwutil";
import { Button } from "@/components/ui/button";
import Color from "../../../components/renderer/Color";
import { commafy } from "../../../utils/StringUtil";
import Timestamp from "../../../components/ui/timestamp";
import { StaticViewGraph } from "../../graphs/view_graph";
import { ViewCommand } from "../../command/view_command";
import { CopoToClipboardTextArea } from "../../../components/ui/copytoclipboard";
import { numericMap } from "../../../components/ui/renderers";
import EndpointWrapper from "@/components/api/bulkwrapper";
import LazyIcon from "@/components/ui/LazyIcon";
import { ReactNode } from "react";
import LazyExpander from "@/components/ui/LazyExpander";

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

const builder = CM.placeholders('DBAlliance')
    .aliased()
    .add({ cmd: 'getname', alias: 'name' })
    .add({ cmd: 'getid', alias: 'id' })
    .add({ cmd: 'getacronym', alias: 'acronym' })
    .add({ cmd: 'getflag', alias: 'flag' })
    .add({ cmd: 'getforum_link', alias: 'forumLink' })
    .add({ cmd: 'getdiscord_link', alias: 'discordLink' })
    .add({ cmd: 'getwiki_link', alias: 'wikiLink' })
    .add({ cmd: 'getdatecreated', alias: 'dateCreated' })
    .add({ cmd: 'getcolor', alias: 'color' })
    .add({ cmd: 'getscore', alias: 'score' })
    .add({ cmd: 'getestimatedstockpilevalue', alias: 'stockpileValue' })
    .add({ cmd: 'getestimatedstockpile', alias: 'stockpile' })
    .add({ cmd: 'getlootvalue', args: { 'score': '1' }, alias: 'lootValue' })
    .add({ cmd: 'getrevenueconverted', alias: 'revenue' })
    .add({ cmd: 'getcostconverted', alias: 'cost' })
    .add({ cmd: 'countmembers', alias: 'memberCount' })
    .add({ cmd: 'countnations', args: { "filter": "#position=1" }, alias: 'applicantCount' })
    .add({ cmd: 'countnations', args: { "filter": "#isTaxable" }, alias: 'taxableCount' })
    .add({ cmd: 'getnumtreasures', alias: 'treasures' })
    .add({ cmd: 'countnations', args: { "filter": "#color=gray,#vm_turns=0" }, alias: 'grayCount' })
    .add({ cmd: 'countnations', args: { "filter": "#color=gray,#vm_turns=0,#active_m<7200" }, alias: 'activeGrayCount' })
    .add({ cmd: 'countnations', args: { "filter": "#cities<10,#FreeOffensiveSlots>0,(#color!=beige|#isblockaded=0)" }, alias: 'c10WithoutRaids' })
    .add({ cmd: 'getcities', alias: 'cities' })
    .add({ cmd: 'gettotal', args: { "attribute": "cityvalue", 'filter': "#position>1,#vm_turns=0" }, alias: 'cityValue' });

// Type for the row adapter created from the column data
type RowAdapter = ReturnType<typeof builder.createRowAdapter>;

// Type definition for button configuration
interface ButtonConfig {
    text: ((row: RowAdapter) => string);
    path: ((row: RowAdapter) => string);
    condition?: (row: RowAdapter) => boolean;
}

// Type definition for table row configuration
interface TableRowConfig {
    id: string;
    label: string;
    value?: (row: RowAdapter) => ReactNode;
    tooltip?: (row: RowAdapter) => ReactNode;
    buttons?: ButtonConfig[];
    condition?: (row: RowAdapter) => boolean;
}

// Define the alliance data table configuration
const allianceTableConfig: TableRowConfig[] = [
    {
        id: 'created',
        label: 'Created',
        value: (row) => <Timestamp millis={row.dateCreated as number} />
    },
    {
        id: 'color',
        label: 'Color',
        value: (row) => (
            <div className="flex items-center">
                <Color colorId={row.color as string} />
                <span>{row.color as string}</span>
            </div>
        )
    },
    {
        id: 'rank',
        label: 'Rank',
        value: () => "TODO"
    },
    {
        id: 'score',
        label: 'Score',
        value: (row) => (
            <LazyExpander className={"underline"} content={
                <>
                    <ViewCommand command={["alliance", "stats", "attribute_ranking"]} args={{ attribute: "{score}", num_results: "5", highlight: row.id + "" }} />
                    <StaticViewGraph endpoint={METRIC_COMPARE_BY_TURN} args={{
                        metric: 'score',
                        alliances: "aa:" + row.id,
                        start: 'timestamp:' + row.dateCreated,
                    }} />
                </>
            }>
                {commafy(row.score as number)}ns
            </LazyExpander>
        )
    },
    {
        id: 'stockpileValue',
        label: 'Estimated Stockpile Value',
        value: (row) => (
            <LazyExpander className={"underline"} content={<>
                <ViewCommand command={["alliance", "stats", "attribute_ranking"]} args={{ attribute: "{getestimatedstockpilevalue}", num_results: "5", highlight: row.id + "" }} />
                <CopoToClipboardTextArea text={numericMap(row.stockpileValue as string)} />
            </>}>
                ${commafy(row.stockpileValue as number)}
            </LazyExpander>
        )
    },
    {
        id: 'lootValue',
        label: 'Loot Per Score',
        value: (row) => (
            <LazyExpander className={"underline"} content={<>
                <ViewCommand command={["alliance", "stats", "loot_ranking"]} args={{ time: "30d", num_results: "5", highlight: "AA:" + (row.id as number) }} />
                <hr />
                Alliance Loot Losses:
                <ViewCommand command={["stats_war", "warcostranking"]} args={{ timeStart: "30d", type: "ATTACKER_LOSSES", allowedAttacks: "A_LOOT", groupByAlliance: "true", num_results: "5", highlight: "AA:" + (row.id as number) }} />
            </>}>
                ${commafy(row.lootValue as number)}
            </LazyExpander>
        )
    },
    {
        id: 'revenue',
        label: 'Revenue Converted',
        value: (row) => (
            <LazyExpander className={"underline"} content={<>
                <ViewCommand command={["trade", "findproducer"]} args={{ resources: "*", includeNegative: "true", num_results: "5", highlight: row.id as number + "" }} />
                <StaticViewGraph endpoint={ALLIANCESTATS} args={{
                    metrics: 'revenue',
                    coalition: "aa:" + row.id,
                    start: 'timestamp:' + row.dateCreated,
                    end: "0"
                }} />
                <ViewCommand command={["alliance", "revenue"]} args={{ nations: "AA:" + (row.id as number) }} />
            </>}>
                ${commafy(row.revenue as number)}
            </LazyExpander>
        )
    },
    {
        id: 'cost',
        label: 'Alliance Value',
        value: (row) => (
            <LazyExpander className={"underline"} content={<>
                <ViewCommand command={["alliance", "cost"]} args={{ nations: "AA:" + row.id }} />
            </>}>
                ${commafy(row.cost as number)}
            </LazyExpander>
        )
    },
    {
        id: 'gray',
        label: 'Gray (non VM)',
        buttons: [
            {
                text: (row) => `${row.grayCount as number} All`,
                path: (row) => `${process.env.BASE_PATH}nations/AA:${row.id as number},#color=gray,#vm_turns=0`
            },
            {
                text: (row) => `${row.activeGrayCount as number} Active (5d)`,
                path: (row) => `${process.env.BASE_PATH}nations/AA:${row.id as number},#color=gray,#vm_turns=0,#active_m<7200`
            }
        ]
    },
    {
        id: 'c10WithoutRaids',
        label: '&#91;C10 without raids',
        buttons: [
            {
                text: (row) => `${row.c10WithoutRaids as number} Nations`,
                path: (row) => `${process.env.BASE_PATH}nations/AA:${row.id as number},#cities<10,#FreeOffensiveSlots>0,(#color!=beige|#isblockaded=0)`
            }
        ]
    },
    {
        id: 'treasures',
        label: 'Treasures',
        value: (row) => (
            <LazyExpander className={"underline"} content={<>
                <ViewCommand command={["alliance", "stats", "attribute_ranking"]} args={{ attribute: "{numtreasures}", num_results: "5", highlight: row.id as number + "" }} />
                <StaticViewGraph endpoint={METRIC_COMPARE_BY_TURN} args={{
                    metric: 'treasures',
                    alliances: "aa:" + row.id,
                    start: 'timestamp:' + row.dateCreated,
                }} />
            </>}>
                {commafy(row.treasures as number)} ({Math.sqrt((row.treasures as number) * 4).toFixed(2)}%)
            </LazyExpander>
        ),
        buttons: [
            {
                text: () => "View",
                path: (row) => `${process.env.BASE_PATH}treasures/AA:${row.id},#treasure`,
                condition: (row) => (row.treasures as number) >= 0
            }
        ]
    },
    {
        id: 'cities',
        label: 'Cities',
        value: (row) => (
            <LazyExpander className={"underline"} content={<>
                <ViewCommand command={["alliance", "stats", "attribute_ranking"]} args={{ attribute: "{numcities}", num_results: "5", highlight: row.id as number + "" }} />
                <StaticViewGraph endpoint={METRIC_COMPARE_BY_TURN} args={{
                    metric: 'cities',
                    alliances: "aa:" + row.id,
                    start: 'timestamp:' + row.dateCreated,
                }} />
            </>}>
                {commafy(row.cities as number)} (${commafy(row.cities as number * 4)})
            </LazyExpander>
        ),
        buttons: [
            {
                text: () => "View",
                path: (row) => `${process.env.BASE_PATH}cities/AA:${row.id},#cities`,
                condition: (row) => (row.cities as number) >= 0
            }
        ]
    },
    // TODO rows
    { id: 'avgInfra', label: 'Avg Infra', value: () => "TODO avg infra + infra value\nTODO infra by tier\nTODO avg infra over time" },
    { id: 'avgLand', label: 'Avg Land', value: () => "TODO avg land + land value\nTODO land by tier\nTODO avg land over time" },
    { id: 'mmr', label: 'MMR', value: () => "TODO (non tooltip) unit= | build=\nTODO MMR over time + MMR tier graph" },
    { id: 'soldierPercent', label: 'Soldier %', value: () => "TODO unit tier graph, unit over time" },
    { id: 'tankPercent', label: 'Tank %', value: () => "TODO unit tier graph, unit over time" },
    { id: 'aircraftPercent', label: 'Aircraft %', value: () => "TODO unit tier graph, unit over time" },
    { id: 'shipsPercent', label: 'Ships %', value: () => "TODO unit tier graph, unit over time" },
    { id: 'missiles', label: 'Missiles', value: () => "TODO num missiles (... avg)\nTODO MLP tier graph\nTODO missiles over time\nTODO ranking" },
    { id: 'nukes', label: 'Nukes', value: () => "TODO num nukes (... avg)\nTODO nuke tier graph\nTODO NRF tier graph\nTODO nuke over time\nTODO ranking" },
    { id: 'spies', label: 'Spies', value: () => "TODO Spy tier graph\nTODO avg spies over time" },
    { id: 'activeWars', label: 'Active Wars', value: () => "TODO Off: 5, Def: 5 (10 Total)\nTODO Wars by tier\nTODO strength tier graph" }
];

// Define the alliance header links configuration
const allianceHeaderLinks: ButtonConfig[] = [
    {
        text: () => "Forum",
        path: (row) => row.forumLink as string,
        condition: (row) => !!row.forumLink
    },
    {
        text: () => "Discord",
        path: (row) => row.discordLink as string,
        condition: (row) => !!row.discordLink
    },
    {
        text: () => "Wiki",
        path: (row) => row.wikiLink as string,
        condition: (row) => !!row.wikiLink
    },
    {
        text: (row) => `${row.memberCount as number} Members`,
        path: (row) => `${process.env.BASE_PATH}nations/AA:${row.id as number},#position>1`,
        condition: (row) => (row.memberCount as number) > 0
    },
    {
        text: (row) => `${row.taxableCount as number} Taxable`,
        path: (row) => `${process.env.BASE_PATH}nations/AA:${row.id as number},#isTaxable`,
        condition: (row) => (row.taxableCount as number) > 0
    },
    {
        text: (row) => `${row.applicantCount as number} Applicants`,
        path: (row) => `${process.env.BASE_PATH}nations/AA:${row.id as number},#position=1`,
        condition: (row) => (row.applicantCount as number) > 0
    }
];

export default function Alliance() {
    const type = "Alliance";
    const { alliance } = useParams<{ alliance: string }>();

    return <EndpointWrapper endpoint={TABLE} args={{
        type: type,
        selection_str: alliance,
        columns: builder.array(),
    }}>
        {({ data }) => {
            if (data.cells.length != 2) {
                return <>{JSON.stringify(data)}</>
            }
            const row = builder.createRowAdapter(data.cells[1] as (string | number)[]);

            // Render header links
            const renderHeaderLinks = () => (
                <div className="mt-1 flex flex-wrap gap-1 justify-start">
                    {allianceHeaderLinks.map((link, index) => {
                        if (link.condition && !link.condition(row)) {
                            return null;
                        }

                        // Handle dynamic text
                        const buttonText = typeof link.text === 'function' ? link.text(row) : link.text;

                        return (
                            <Button key={index} variant="outline" size="sm" asChild>
                                <Link to={link.path(row)}>{buttonText}</Link>
                            </Button>
                        );
                    })}
                </div>
            );

            const renderTableRows = () => (
                allianceTableConfig.map((config, i) => {
                    // Skip if condition is defined and returns false
                    if (config.condition && !config.condition(row)) {
                        return null;
                    }

                    return (
                        <tr key={config.id} className={`divide-x divide-primary/5 ${i % 2 === 0 ? "bg-primary/5" : ""}`}>
                            <td className="p-1 min-w-fit whitespace-nowrap font-medium text-right pr-3">{config.label}</td>
                            <td className="p-1 w-full">
                                <div className="flex items-center relative">
                                    {config.value && config.value(row)}

                                    {config.buttons && config.buttons.map((button, buttonIndex) => {
                                        // Skip if condition is defined and returns false
                                        if (button.condition && !button.condition(row)) {
                                            return null;
                                        }

                                        // Handle dynamic button text
                                        const buttonText = typeof button.text === 'function' ? button.text(row) : button.text;
                                        return (
                                            <Button
                                                key={buttonIndex}
                                                className={buttonIndex > 0 ? "ms-1" : ""}
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <Link to={button.path(row)}>{buttonText}</Link>
                                            </Button>
                                        );
                                    })}
                                </div>
                            </td>
                        </tr>
                    );
                })
            )

            return (
                <div className="overflow-hidden rounded-lg border border-primary/20 shadow-sm">
                <table className="display text-xs compact font-mono w-full bg-accent">
                    <colgroup>
                        <col className="w-auto" /> {/* Label column - just enough width for content */}
                        <col className="w-full" /> {/* Content column - takes all remaining space */}
                    </colgroup>
                    <thead>
                        <tr>
                            {renderHeaderLinks()}
                        </tr>
                        <tr>
                            <th colSpan={2}>
                                <div className="flex items-center space-x-2">
                                    {row.flag && (
                                        <img
                                            src={row.flag as string}
                                            alt="Alliance flag"
                                            className="w-16 h-10"
                                        />
                                    )}
                                    <Link
                                        className="text-2xl font-bolt flex items-center"
                                        to={getPwUrl(`alliance/id=${row.id as number}`)}
                                    >
                                        {row.name as string} <LazyIcon name="ExternalLink" />
                                    </Link>
                                    {row.acronym && (
                                        <span className="text-sm text-gray-500">
                                            ({row.acronym as string})
                                        </span>
                                    )}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-primary/5">
                        {renderTableRows()}
                    </tbody>
                </table>
                </div>
            );
        }}
    </EndpointWrapper>
}