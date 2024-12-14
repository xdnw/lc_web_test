import React, {ReactNode, useCallback, useEffect, useMemo, useRef, useState} from "react";
import DataTable, { DataTableRef } from 'datatables.net-react';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import 'datatables.net-colreorder-dt';
import DT, {Api, ConfigColumns, ObjectColumnRender, OrderIdx} from 'datatables.net';
import {TABLE} from "../../components/api/endpoints";
import {Button} from "../../components/ui/button";
import CopyToClipboard, {CopoToClipboardTextArea} from "../../components/ui/copytoclipboard";
import {COMMANDS} from "../../lib/commands";
import {Command, COMMAND_MAP, IOptionData, STRIP_PREFIXES, toPlaceholderName} from "../../utils/Command";
import {Tabs, TabsList, TabsTrigger} from "../../components/ui/tabs";
import {ArrowRightToLine, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ClipboardIcon, Download, Sheet} from "lucide-react";
import {BlockCopyButton} from "../../components/ui/block-copy-button";
import {TooltipProvider} from "../../components/ui/tooltip";
import {WebGraph, WebTable, WebTableError} from "../../components/api/apitypes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {useDialog} from "../../components/layout/DialogContext";
import { Link } from "react-router-dom";
import {getRenderer, graph, isHtmlRenderer} from "../../components/ui/renderers";
import {getQueryParams} from "../../lib/utils";
import {createRoot} from "react-dom/client";

DataTable.use(DT);

interface Columns {
    value: (string | [string, string])[],
    sort: OrderIdx | OrderIdx[],
}

interface TabDefault {
    selections: { [key: string]: string },
    columns: { [key: string]: Columns },
}

const DEFAULT_TABS: {[key: string]: TabDefault} = {
    DBAlliance: {
        selections: {
            "All": "*",
            "All (>0 active member)": "*,#countNations(\"#position>1,#vm_turns=0,#active_m<10080\")>0",
            "Top 10": "*,#rank<=10",
            "Top 15": "*,#rank<=15",
            "Top 25": "*,#rank<=25",
            "Top 50": "*,#rank<=50",
            "Guild Alliances": "%guild_alliances%",
        },
        columns: {
            "General": {
                value: [
                    ["{markdownUrl}", "Alliance"],
                    "{score}",
                    "{cities}",
                    "{color}",
                    ["{countNations(#position>1)}", "members"]
                ],
                sort: {idx: 3, dir: 'desc'}
            },
            "Revenue": {
                value: [
                    ["{markdownUrl}", "Alliance"],
                    ["{revenueConverted}", "Total"],
                    ...(((COMMANDS.options["ResourceType"] as IOptionData).options ?? [])).filter(f => f !== "CREDITS").map((type) => [`{revenue.${type}}`, type] as [string, string])
                ],
                sort: {idx: 2, dir: 'desc'}
            },
            "City Growth (30d)": {
                value: [
                    ["{markdownUrl}", "Alliance"],
                    ["{countMembers}", "Members"],
                    "{cities}",
                    ["{MembershipChangesByReason(\"recruited,joined\",30d,0d)}", "Joined"],
                    ["{MembershipChangesByReason(left,30d,0d)}", "Left"],
                    ["{NetMembersAcquired(30d,0d)}", "Net"],

                    ["{MembershipChangeAssetCount(joined,cities,30d,0d)}", "Poached City"],
                    ["{MembershipChangeAssetValue(joined,cities,30d,0d)}", "Poached City $"],

                    ["{MembershipChangeAssetCount(recruited,cities,30d,0d)}", "Recruited City"],
                    ["{MembershipChangeAssetCount(left,cities,30d,0d)}", "Left City"],
                    ["{MembershipChangeAssetCount(vm_returned,cities,30d,0d)}", "VM Ended City"],
                    ["{MembershipChangeAssetCount(vm_left,cities,30d,0d)}", "VM City"],
                    ["{MembershipChangeAssetCount(deleted,cities,30d,0d)}", "Deleted City"],

                    ["{BoughtAssetCount(cities,30d,0d)}", "City Buy"],
                    ["{EffectiveBoughtAssetCount(cities,30d,0d)}", "City Buy (remain)"],

                    ["{SpendingValue(cities,30d,0d)}", "City Buy $"],
                    ["{EffectiveSpendingValue(cities,30d,0d)}", "City Buy $ (remain)"],

                    ["{NetAsset(cities,30d,0d)}", "Net City"],
                    ["{NetAssetValue(cities,30d,0d)}", "Net City $"],
                ],
                sort: {idx: 18, dir: 'desc'}
            },
            "Growth (30d)": {
                value: [
                    ["{markdownUrl}", "Alliance"],
                    ["{countMembers}", "Members"],
                    "{score}",
                    ["{NetMembersAcquired(30d,0d)}", "Net Member"],

                    ["{NetAsset(cities,30d,0d)}", "Net City"],

                    ["{NetAssetValue(cities,30d,0d)}", "Net City $"],
                    ["{NetAssetValue(projects,30d,0d)}", "Net Project $"],
                    ["{NetAssetValue(land,30d,0d)}", "Net Land $"],
                    ["{NetAssetValue(infra,30d,0d)}", "Net Infra $"],
                    ["{NetAssetValue(*,30d,0d)}", "Net Asset $"],

                    ["{EffectiveSpendingValue(cities,30d,0d)}", "City Buy $"],
                    ["{EffectiveSpendingValue(projects,30d,0d)}", "Project Buy $"],
                    ["{EffectiveSpendingValue(land,30d,0d)}", "Land Buy $"],
                    ["{EffectiveSpendingValue(infra,30d,0d)}", "Infra Buy-Loss $"],

                    ["{CumulativeRevenueValue(30d,0d)}", "Total Revenue"],
                ],
                sort: {idx: 10, dir: 'desc'}
            },
            "Normalized Growth (30d)": {
                value: [
                    ["{markdownUrl}", "Alliance"],
                    ["{countMembers}", "Members"],
                    ["{EffectiveBoughtAssetCount(\"cities,projects,land\",30d,0d)}/{countMembers}", "Cities/Member"],
                    ["{EffectiveSpendingValue(\"cities,projects,land\",30d,0d)}/{countMembers}", "Invest/Member"],
                    ["{EffectiveSpendingValue(\"cities,projects,land\",30d,0d)}/{CumulativeRevenueValue(30d,0d)}", "Invest/Revenue"],
                ],
                sort: {idx: 10, dir: 'desc'}
            },
            "Cumulative Revenue (30d)": {
                value: [
                    ["{markdownUrl}", "Alliance"],
                    ["{CumulativeRevenueValue(30d,0d)}", "Value"],
                    ...(((COMMANDS.options["ResourceType"] as IOptionData).options ?? [])).filter(f => f !== "CREDITS").map((type) => [`{CumulativeRevenue(30d,0d).${type}}`, type] as [string, string])
                ],
                sort: {idx: 2, dir: 'desc'}
            },
            "City Exponent": {
                value: [
                    ["{markdownUrl}", "Alliance"],
                    ["{countMembers}", "Members"],
                    ["{cities}", "Cities"],
                    ["{score}", "Score"],
                    ["{exponentialCityStrength}", "city^3"],
                    ["{exponentialCityStrength(2.5)}", "city^2.5"],
                ],
                sort: {idx: 6, dir: 'desc'}
            }
        }
    },
    ResourceType: {
        selections: {
            "All": "*",
            "Raws": "raws",
            "Manufactured": "manu",
            ...Object.fromEntries(((COMMANDS.options["ResourceType"] as IOptionData).options ?? []).map((type) => [type, type]))
        },
        columns: {
            "Price": {
                value: [
                    "{name}",
                    "test",
                    "{low}",
                    "{high}",
                    "{margin}"],
                sort: {idx: 1, dir: 'asc'}
            },
        }
    },
    DBNation: {
        selections: {
            "All": "*",
            "Alliance Nations": "%guild_alliances%",
            "Members (Non VM)": "%guild_alliances%,#position>1,#vm_turns=0",
            "Active Applicant (1d)": "%guild_alliances%,#position=1,#vm_turns=0,#active_m<1440",
            "Inactive Member >5d": "%guild_alliances%,#position>1,#vm_turns=0,#active_m>7200",
            "Inactive Member >1w": "%guild_alliances%,#position>1,#vm_turns=0,#active_m>10080",
            "Allies": "~allies,#position>1,#vm_turns=0,#active_m<10800",
            "Allies (underutilized)": "~allies,#active_m<2880,#freeoffensiveslots>0,#tankpct>0.8,#aircraftpct>0.8,#RelativeStrength>1.3,#vm_turns=0,#isbeige=0",
            "Enemies": "~enemies,#position>1,#vm_turns=0,#active_m<10800",
            "Enemies (priority)": "~enemies,#cities>10,#active_m<2880,#def<3,#off>0,#vm_turns=0,#isbeige=0,#RelativeStrength>0.7,#fighting(~allies)",
            "Spyable Enemies": "~enemies,#position>1,#vm_turns=0,#active_m<2880,#espionageFull=0",
            "Lacking Spies": "%guild_alliances%,#position>1,#vm_turns=0,#getSpyCapLeft>0,#daysSinceLastSpyBuy>0",
            "Member Not Verified": "%guild_alliances%,#position>1,#vm_turns=0,#verified=0",
            "Member Not in Guild": "%guild_alliances%,#position>1,#vm_turns=0,#isInAllianceGuild=0",
            "Member Not in Milcom Guild": "%guild_alliances%,#position>1,#vm_turns=0,#isInMilcomGuild=0",
            "Low Tier, Not Raiding": "%guild_alliances%,#cities<10,#position>1,#vm_turns=0,#active_m<2880,#off<5,#color!=beige,#blockaded=0",
        },
        columns: {
            "General": {
                value: [
                    ["{markdownUrl}", "name"],
                    ["{allianceUrlMarkup}", "AA"],
                    "{agedays}",
                    "{color}",
                    "{cities}",
                    "{score}"],
                sort: [{idx: 2, dir: 'desc'}, {idx: 5, dir: 'desc'}]
            },
            "MMR": {
                value: [
                    ["{markdownUrl}", "name"],
                    ["{allianceUrlMarkup}", "AA"],
                    "{cities}",
                    ["{avg_infra}", "infra"],
                    ["{score}", "ns"],
                    ["{off}", "🗡"],
                    ["{def}", "🛡"],
                    ["{soldiers}", "💂"],
                    ["{tanks}", "⚙"],
                    ["{aircraft}", "✈"],
                    ["{ships}", "⛵"],
                    ["{spies}", "🔎"],
                    ["{daysSinceLastSpyBuy}", "$🔎days"],
                    ["{spyCap}", "🔎cap"],
                    ["{MMRBuildingDecimal}", "MMR[build]"],
                    ["{daysSinceLastSoldierBuy}", "$💂days"],
                    ["{daysSinceLastTankBuy}", "$⚙days"],
                    ["{daysSinceLastAircraftBuy}", "$✈days"],
                    ["{daysSinceLastShipBuy}", "$⛵days"],
                ],
                sort: [{idx: 2, dir: 'desc'}, {idx: 3, dir: 'desc'}]
            },
            // "Revenue": [],
            // "Usernames": [],
            // "Activity": [],
            // "Projects": [],
            // "War Slots": [],
            // "Utilization": [],
            // "Stockpile": [],
            // "Deposits": [],
            // "Warchest": [],
            // "Escrow": [],
            // "Audits": [],
            // "DayChange": [],
            // "Espionage": [],
            // "War Range": [],
            // "Timers": [],

        }
    }
}

interface ExportType {
    delimiter: string,
    ext: string,
    mime: string
}

const ExportTypes = {
    CSV: {
        delimiter: ',',
        ext: 'csv',
        mime: 'text/csv'
    },
    TSV: {
        delimiter: '\t',
        ext: 'csv',
        mime: 'text/tab-separated-values'
    }
}

function downloadCells(data: (string | number)[][], useClipboard: boolean, type: ExportType): [string, string] {
    const csvContent = (useClipboard ? '' : 'sep=' + type.delimiter + '\n') + data.map(e => e.join(type.delimiter)).join("\n");

    if (useClipboard) {
        navigator.clipboard.writeText(csvContent).then(() => {
            console.log("Copied to clipboard");
        }).catch((err) => {
            console.error("Failed to copy to clipboard", err);
        });
        return ["Copied to clipboard", "The data for the currently selected columns has been copied to your clipboard."];
    } else {
        // Create a blob from the CSV content
        const blob = new Blob([csvContent], { type: type.mime + ';charset=utf-8;' });

        // Create a link element
        const link = document.createElement("a");

        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "data." + type.ext);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        return ["Download starting", "The data for the currently selected columns should begin downloading. If the download does not start, please check your browser settings, or try the clipboard button instead."];
    }
}

function downloadTable(api: Api, useClipboard: boolean, type: ExportType): [string, string] {
    // Get the header
    const header = api.columns().header().toArray().slice(1).map((headerCell: HTMLElement) => headerCell.innerText);

    // Get the rows
    const rows = api.rows().data().toArray().map((row: (string | number)[]) => {
        return header.map((_, index) => row[index]);
    });

    // Combine header and rows
    const data = [header, ...rows];

    // Call downloadCells with the data
    return downloadCells(data, useClipboard, type);
}

export function getTypeFromUrl(params: URLSearchParams): string | undefined {
    return params.get('type') ?? undefined;
}

export function getSelectionFromUrl(params: URLSearchParams): string | undefined {
    return params.get('sel') ?? undefined;
}

export function getColumnsFromUrl(params: URLSearchParams): Map<string, string | null> | undefined {
    const urlCols: {[key: string]: string | null} = Object.fromEntries(
        params.getAll('col').map(colParam => {
            const [key, value] = colParam.split(';');
            return [key, value || null];
        })
    );
    return Object.keys(urlCols).length > 0 ? new Map(Object.entries(urlCols)) : undefined;
}

export function getSortFromUrl(params: URLSearchParams): OrderIdx | OrderIdx[] | undefined {
    const urlSort = params.getAll('sort').map(sortParam => {
        const [idx, dir] = sortParam.split(';');
        return { idx: parseInt(idx, 10), dir: dir as 'asc' | 'desc' };
    });
    return urlSort.length > 0 ? urlSort : undefined;
}

export default function CustomTable() {
    const params = getQueryParams();
    // Placeholder data
    const type = useRef<string>(getTypeFromUrl(params) ?? "DBNation");
    const selection = useRef<string>(getSelectionFromUrl(params) ?? DEFAULT_TABS[type.current].selections.All ?? "*");
    const columns = useRef<Map<string, string | null>>(getColumnsFromUrl(params) ?? new Map(
        (DEFAULT_TABS[type.current]?.columns[Object.keys(DEFAULT_TABS[type.current]?.columns)[0]]?.value || ["{id}"]).map(col => {
            if (Array.isArray(col)) {
                return [col[0], col[1]];
            } else {
                return [col, null];
            }
        })
    ));
    const sort = useRef<OrderIdx | OrderIdx[]>(getSortFromUrl(params) ?? (DEFAULT_TABS[type.current]?.columns[Object.keys(DEFAULT_TABS[type.current]?.columns)[0]]?.sort || { idx: 0, dir: 'asc' }));

    return (
        <>
            <div className="">
                <PlaceholderTabs selectionRef={selection} columnsRef={columns} typeRef={type} sortRef={sort}/>
            </div>
            <div className="themeDiv bg-opacity-10 p-2 rounded mt-2">
                <TableWithButtons type={type} selection={selection} columns={columns} sort={sort} load={false}/>
            </div>
        </>
    );
}

export function getQueryString(
    {type, sel, columns, sort}: {
        type: string,
        sel: string,
        columns: Map<string, string | null>,
        sort: OrderIdx | OrderIdx[]
    }
) {
    const params = new URLSearchParams();
    params.set('type', type);
    params.set('sel', sel);
    columns.forEach((value, key) => {
        params.append('col', value ? `${key};${value}` : key);
    });
    if (Array.isArray(sort)) {
        for (const sortItem of sort) {
            params.append('sort', `${sortItem.idx};${sortItem.dir}`);
        }
    } else {
        params.append('sort', `${sort.idx};${sort.dir}`);
    }
    return params.toString();
}

export function StaticTable({type, selection, columns, sort}: { type: string, selection: string, columns: (string | [string, string])[], sort: OrderIdx | OrderIdx[] | null }) {
    const typeRef = useRef(type);
    const selectionRef = useRef(selection);
    const columnsRef = useRef<Map<string, string | null>>(new Map(columns.map(col => {
        if (Array.isArray(col)) {
            return [col[0], col[1]];
        } else {
            return [col, null];
        }
    })));
    const sortRef = useRef<OrderIdx | OrderIdx[]>(sort ?? {idx: 0, dir: "asc"});

    return useMemo(() => (
        <TableWithButtons type={typeRef} selection={selectionRef} columns={columnsRef} sort={sortRef} load={true} />
    ), []);
}

export function TableWithButtons({type, selection, columns, sort, load}: {
    type: React.MutableRefObject<string>,
    selection: React.MutableRefObject<string>,
    columns: React.MutableRefObject<Map<string, string | null>>,
    sort: React.MutableRefObject<OrderIdx | OrderIdx[]>,
    load: boolean
}) {
    const table = useRef<DataTableRef>(null);

    const [rerender, setRerender] = useState(0);
    const { showDialog } = useDialog();

    const data = useRef<(string | number | number[])[][]>([]);
    const visibleColumns = useRef<number[]>([]);
    const searchSet = useRef<Set<number>>(new Set<number>());
    const columnsInfo = useRef<ConfigColumns[]>([]);

    const errors = useRef<WebTableError[]>([]);

    const highlightRowOrColumn = (col?: number, row?: number) => {
        const api = table.current!.dt() as Api;
        const tableElem = api.table().container() as HTMLElement;
        // remove all bg-red-500 from table th and td
        const elemsWithRed = tableElem.querySelectorAll('.bg-red-500');
        for (const elem of elemsWithRed) {
            elem.classList.remove('bg-red-500');
        }
        if (row !== undefined && row !== null) {
            const rawRowAtIndexRow = api.rows().data()[row];
            const displayedRowIndex = api.rows((idx, data, node) => {
                return data === rawRowAtIndexRow;
            }).indexes()[0];

            if (displayedRowIndex !== undefined) {
                // Navigate to the page containing the row
                const page = Math.floor(displayedRowIndex / api.page.len());
                // if not current page
                if (api.page() !== page) {
                    api.page(page).draw(false);
                }

                const rowInCurrentPage = displayedRowIndex % api.page.len();
                const rowElem = tableElem.querySelector(`tbody tr:nth-child(${rowInCurrentPage + 1})`);
                if (rowElem) {
                    if (col !== undefined && col !== null) {
                        const td = rowElem.querySelector(`td:nth-child(${col + 2})`);
                        if (td) {
                            td.classList.add('bg-red-500');
                        }
                    } else {
                        const tds = rowElem.querySelectorAll('td');
                        for (const td of tds) {
                            td.classList.add('bg-red-500');
                        }
                    }
                }
            }
        } else if (col !== undefined && col !== null) {
            const th = tableElem.querySelector(`thead th:nth-child(${col + 2})`);
            if (th) {
                th.classList.add('bg-red-500');
            }
        }
    };
    return (
        <>
            {load ?
                <LoadTable
                    type={type}
                    selection={selection}
                    columns={columns}
                    errors={errors}
                    table={table}
                    data={data}
                    columnsInfo={columnsInfo}
                    sort={sort}
                    searchSet={searchSet}
                    visibleColumns={visibleColumns}
                    setRerender={setRerender}
                /> :
                <DeferTable
                      type={type}
                      selection={selection}
                      columns={columns}
                      errors={errors}
                      table={table}
                      data={data}
                      columnsInfo={columnsInfo}
                      sort={sort}
                      searchSet={searchSet}
                      visibleColumns={visibleColumns}
                      setRerender={setRerender}
                />
            }
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="me-1">Export</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => showDialog(...downloadTable(table.current!.dt() as Api, false, ExportTypes.CSV))}>
                        <kbd className="bg-accent rounded flex items-center space-x-1"><Download className="h-4 w-4" /> <span>,</span></kbd>&nbsp;Download CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => showDialog(...downloadTable(table.current!.dt() as Api, true, ExportTypes.CSV))}>
                        <kbd className="bg-accent rounded flex items-center space-x-1"><ClipboardIcon className="h-4 w-4" /> <span>,</span></kbd>&nbsp;Copy CSV
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => showDialog(...downloadTable(table.current!.dt() as Api, false, ExportTypes.TSV))}>
                        <kbd className="bg-accent rounded flex items-center space-x-1"><Download className="h-4 w-3" /><ArrowRightToLine className="h-4 w-3" /></kbd>&nbsp;Download TSV
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => showDialog(...downloadTable(table.current!.dt() as Api, true, ExportTypes.TSV))}>
                        <kbd className="bg-accent rounded flex items-center space-x-1"><ClipboardIcon className="h-4 w-3" /><ArrowRightToLine className="h-4 w-3" /></kbd>&nbsp;Copy TSV
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => {
                        const body = <>
                            <ol className="list-decimal list-inside">
                                <li className="bg-accent/20 mb-1 p-1 border-primary/5 border-2 rounded">
                                    Set the google sheet tab name as the selection:<br/>
                                    <CopyToClipboard
                                        text={`${toPlaceholderName(type.current)}:${selection.current}`}/>
                                </li>
                                <li className="bg-accent/20 mb-1 p-1 border-primary/5 border-2 rounded">
                                    Set the columns as the first row of cells in the sheet tab:<br/>
                                    <CopyToClipboard
                                        text={`${Array.from(columns.current.keys()).join("\t")}`}/>
                                </li>
                                <li className="bg-accent/20 mb-1 p-1 border-primary/5 border-2 rounded">
                                    Run the discord command, with the sheet url, to autofill the remaining
                                    cells:<br/>
                                    <CopyToClipboard
                                        text={`/sheet_custom auto`}/>
                                </li>
                            </ol>
                        </>
                        showDialog("Creating custom google sheets", body)
                    }}>
                        <kbd className="bg-accent rounded flex items-center space-x-1"><Sheet className="h-4 w-6" /></kbd>
                        &nbsp;Google Sheets
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button
                variant="outline"
                size="sm"
                className=""
                onClick={() => {
                    const baseUrlWithoutPath = window.location.protocol + "//" + window.location.host;
                    const url = (`${baseUrlWithoutPath}${process.env.BASE_PATH}#/view_table?${getQueryString({
                        type: type.current,
                        sel: selection.current,
                        columns: columns.current,
                        sort: sort.current
                    })}`);
                    navigator.clipboard.writeText(url).then(() => {
                        showDialog("URL copied to clipboard", url, true);
                    }).catch((err) => {
                        showDialog("Failed to copy URL to clipboard", err + "", true);
                    });
                }}
            >
                Share
            </Button>
            <Button variant="outline" size="sm" className={`ms-1 bg-destructive ${errors.current.length == 0 ? "hidden" : ""}`}
                    onClick={() => {
                        const title = errors.current.length > 0 ? "Errors updating table" : "No errors";
                        const body = errors.current.length > 0 ? <>
                            Errors updating the table may prevent some data from being displayed.
                            Click the buttons below to highlight the errors in the table.
                            {errors.current.map((error, index) => (
                                <Button key={index} variant="destructive" className="my-1 h-auto break-words w-full justify-start size-sm whitespace-normal" onClick={() => highlightRowOrColumn(error.col, error.row)}>
                                    [col:{(error.col || 0) + 1}{error.row ? `row:${error.row + 1}` : ""}] {error.msg}
                                </Button>
                            ))}
                        </> : "No errors";
                        showDialog(title, body);
                    }}>
                View {errors.current.length} Errors</Button>
            <MyTable key={rerender}
                     table={table}
                     data={data}
                     columnsInfo={columnsInfo}
                     sort={sort}
                     searchSet={searchSet}
                     visibleColumns={visibleColumns}
            />
        </>
    );
}

function formatColName(str: string): string {
    if (str.includes("{")) {
        for (const prefix of STRIP_PREFIXES) {
            if (str.includes("{" + prefix)) {
                str = str.replace("{" + prefix, "{");
            }
        }
        return str.replace("{", "").replace("}", "");
    } else {
        return str;
    }
}

function setTableVars(
    newData: WebTable,
    errors: React.MutableRefObject<WebTableError[]>,
    table: React.RefObject<DataTableRef>,
    data: React.MutableRefObject<(string | number | number[])[][]>,
    columnsInfo: React.MutableRefObject<ConfigColumns[]>,
    sort: React.MutableRefObject<OrderIdx | OrderIdx[]>,
    searchSet: React.MutableRefObject<Set<number>>,
    visibleColumns: React.MutableRefObject<number[]>,
    setRerender: React.Dispatch<React.SetStateAction<number>>,
    columns: React.MutableRefObject<Map<string, string | null>>
) {
    errors.current = newData.errors ?? [];

    const api = table.current!.dt() as Api;
    // const elem = api.table().container() as HTMLElement;
    const header: string[] = columns.current.size > 0 ? Array.from(columns.current).map(([key, value]) => value ?? key) : newData.cells[0] as string[];
    const body = newData.cells.slice(1);
    const renderFuncNames = newData.renderers;

    // // iterate columns and print their name / renderFuncNames
    // for (let i = 0; i < header.length; i++) {
    //     console.log(`Column ${i}: ${header[i]} - ${renderFuncNames ? renderFuncNames[i] : "no render func"}`);
    // }
    const newColumnsInfo: ConfigColumns[] = header.map((col: string, index: number) => ({
        title: formatColName(col),
        data: index,
        render: renderFuncNames ? getRenderer(renderFuncNames[index]) : undefined,
    }));
    // columns
    columnsInfo.current = newColumnsInfo;
    // data
    data.current = body;
    // visibleColumns
    visibleColumns.current = Array.from(Array(header.length).keys());
    // searchSet
    searchSet.current = new Set();

    // set table options sort to sortRef.current
    api.order(sort.current);

    // Check if the number of columns is different
    if (api.columns().count() !== header.length + 1) {
        api.destroy(false);
        setRerender(prevRerender => prevRerender + 1);
    } else {
        // Update the header
        api.columns().header().each((elem: HTMLElement, index: number) => {
            elem.innerText = index == 0 ? '#' : formatColName(header[index - 1]);
        });
        // Add new rows
        api.clear().rows.add(body).draw();
    }
}

function LoadTable(
    {type, selection, columns, errors, table, data, columnsInfo, sort, searchSet, visibleColumns, setRerender}:
    {
        type: React.MutableRefObject<string>,
        selection: React.MutableRefObject<string>,
        columns: React.MutableRefObject<Map<string, string | null>>,
        errors: React.MutableRefObject<WebTableError[]>,
        table: React.RefObject<DataTableRef>,
        data: React.MutableRefObject<(string | number | number[])[][]>,
        columnsInfo: React.MutableRefObject<ConfigColumns[]>,
        sort: React.MutableRefObject<OrderIdx | OrderIdx[]>,
        searchSet: React.MutableRefObject<Set<number>>,
        visibleColumns: React.MutableRefObject<number[]>,
        setRerender: React.Dispatch<React.SetStateAction<number>>
    }
) {
    const { showDialog } = useDialog();
    const url = useRef(`${process.env.BASE_PATH}custom_table?${getQueryString({
        type: type.current,
        sel: selection.current,
        columns: columns.current,
        sort: sort.current
    })}`);
    return <>
        {TABLE.useDisplay({
            args: {
                type: type.current,
                selection_str: selection.current,
                columns: Array.from(columns.current.keys()),
            },
            render: (newData) => {
                try {
                    setTableVars(newData, errors, table, data, columnsInfo, sort, searchSet, visibleColumns, setRerender, columns);
                } catch (e) {
                    console.error(e);
                    const errorMessage = e instanceof Error ? <>
                        {e.message}
                        <CopoToClipboardTextArea text={e.stack + ""} />
                    </> : e + "";
                    showDialog("Failed to update table", errorMessage, true);
                }
                return <Button variant="outline"
                               size="sm"
                               className="me-1"
                               asChild><Link to={url.current}>Edit Table</Link></Button>
            }
        })}
    </>
}

function DeferTable(
    {type, selection, columns, errors, table, data, columnsInfo, sort, searchSet, visibleColumns, setRerender}:
    {
        type: React.MutableRefObject<string>,
        selection: React.MutableRefObject<string>,
        columns: React.MutableRefObject<Map<string, string | null>>,
        errors: React.MutableRefObject<WebTableError[]>,
        table: React.RefObject<DataTableRef>,
        data: React.MutableRefObject<(string | number | number[])[][]>,
        columnsInfo: React.MutableRefObject<ConfigColumns[]>,
        sort: React.MutableRefObject<OrderIdx | OrderIdx[]>,
        searchSet: React.MutableRefObject<Set<number>>,
        visibleColumns: React.MutableRefObject<number[]>,
        setRerender: React.Dispatch<React.SetStateAction<number>>
    }
) {
    const { showDialog } = useDialog();

    return (
        <>
            {TABLE.useForm({
                default_values: {
                    type: type.current,
                    selection_str: selection.current,
                    columns: Array.from(columns.current.keys()),
                },
                classes: "bg-destructive",
                label: "Generate Table",
                handle_submit: (args): boolean => {
                    if (columns.current.size === 0) {
                        showDialog("Failed to update table", "Please select at least one column.");
                        return false;
                    }
                    args.type = type.current;
                    args.selection_str = selection.current;
                    args.columns = Array.from(columns.current.keys());
                    return true;
                },
                handle_response: (newData) => {
                    try {
                        setTableVars(newData, errors, table, data, columnsInfo, sort, searchSet, visibleColumns, setRerender, columns);
                    } catch (e) {
                        console.error(e);
                        const errorMessage = e instanceof Error ? <>
                            {e.message}
                            <CopoToClipboardTextArea text={e.stack + ""} />
                        </> : e + "";
                        showDialog("Failed to update table", errorMessage, true);
                    }
                }
            })}
        </>
    );
}

function getReactSlots(columnsInfo: ConfigColumns[]): { [key: number]: ((data, row, rowData: object[]) => ReactNode)} | undefined {
    const reactSlots: { [key: number]: (data, row, rowData: object[]) => ReactNode } = {};

    for (let i = 0; i < columnsInfo.length; i++) {
        const col = columnsInfo[i];
        if (col.render && isHtmlRenderer(col.render as ObjectColumnRender)) {
            const tmpRender = ((col.render as ObjectColumnRender).display) as ((data: object) => ReactNode);
            col.render = undefined;
            reactSlots[i + 1] = (data, row, rowData: object[]) => tmpRender(rowData[i]);
        }
    }
    return reactSlots ? reactSlots : undefined;
}

export function MyTable({table, data, columnsInfo, sort, searchSet, visibleColumns}:
{
    table: React.RefObject<DataTableRef>,
    data: React.MutableRefObject<(string | number | number[])[][]>,
    columnsInfo: React.MutableRefObject<ConfigColumns[]>,
    sort: React.MutableRefObject<OrderIdx | OrderIdx[]>,
    searchSet: React.MutableRefObject<Set<number>>,
    visibleColumns: React.MutableRefObject<number[]>,
    // reactColumns: ((data: object) => ReactNode)[],
}) {

    return (
        <DataTable
            slots={getReactSlots(columnsInfo.current)}
            ref={table}
            data={data.current}
            columns={[{data: null, title: "#", orderable: false, searchable: false, className: 'dt-center'},
                ...columnsInfo.current]}
            options={{
                paging: true,
                lengthMenu: [[15, 25, 50, 100, -1], [15, 25, 50, 100, "All"]],
                deferRender: true,
                orderClasses: false,
                order: sort.current,
                autoWidth: false,
                info: false,
                processing: false,
                stateSave: false,
                scrollX: false,
                rowCallback: function (row: Node, data: (string | number)[] | object, index: number, displayIndexFull: number) {
                    const firstCell = (row as HTMLElement).querySelector('td:nth-child(1)');
                    if (firstCell) {
                        firstCell.textContent = (displayIndexFull + 1).toString();
                    }
                } as (row: Node, data: (string | number)[] | object, index: number) => void,
            }}
            className="display table-auto divide-y w-full border-separate border-spacing-y-1 text-xs compact"/>
    );
}

export function PlaceholderTable({type, selection, columns, sort}: { type: string, selection: string, columns: (string | [string, string])[], sort: OrderIdx | OrderIdx[] }) {
    const typeRef = useRef<string>(type);
    const selectionRef = useRef<string>(selection);
    const columnsRef = useRef<Map<string, string | null>>(new Map(columns.map(col => {
        if (Array.isArray(col)) {
            return [col[0], col[1]];
        } else {
            return [col, null];
        }
    })));
    const sortRef = useRef<OrderIdx | OrderIdx[]>(sort);
    return (
        <>
        <TableWithButtons columns={columnsRef} selection={selectionRef} type={typeRef} sort={sortRef} load={true} />
        </>
    )
}

function getColOptions(type: string): [string, string][] {
    const commands: {[key: string]: Command} = COMMAND_MAP.getPlaceholderCommands(type);
    const result: [string, string][] = [];
    for (const [key, value] of Object.entries(commands)) {
        if (!value.hasRequiredArgument()) {
            result.push([value.name, value.command.desc]);
        }
    }
    return result;
}

export function PlaceholderTabs({ typeRef, selectionRef, columnsRef, sortRef }: {
    typeRef: React.MutableRefObject<string>,
    selectionRef: React.MutableRefObject<string>,
    columnsRef: React.MutableRefObject<Map<string, string | null>>,
    sortRef: React.MutableRefObject<OrderIdx | OrderIdx[]>,
}) {
    const { showDialog } = useDialog();
    const addButton = useRef<HTMLButtonElement>(null);
    const [rerender, setRerender] = useState(0);
    const [collapseColumns, setCollapseColumns] = useState(false);
    const [collapseSelections, setCollapseSelections] = useState(false);
    const [collapseColOptions, setCollapseColOptions] = useState(true);
    const filterRef = useRef<HTMLInputElement>(null);

    const phTypes = useMemo(() => COMMAND_MAP.getPlaceholderTypes(false), []);
    const colTemplates = useRef(Object.keys(DEFAULT_TABS[typeRef.current]?.columns ?? []));
    const selTemplates = useRef(Object.keys(DEFAULT_TABS[typeRef.current]?.selections ?? []));

    const selInputRef = useRef<HTMLInputElement>(null);
    const colInputRef = useRef<HTMLInputElement>(null);

    const colOptions = useRef<[string, string][]>(getColOptions(typeRef.current));
    const filter = useRef("");

    function moveColumn(from: number, amount: number) {
        const columnsArray = Array.from(columnsRef.current);
        const to = from + amount;

        // Check if the move is within bounds
        if (to < 0 || to >= columnsArray.length) {
            return;
        }

        // Swap the columns
        const [movedColumn] = columnsArray.splice(from, 1);
        columnsArray.splice(to, 0, movedColumn);

        // Update columnsRef
        columnsRef.current = new Map(columnsArray);

        // Update sortRef
        if (Array.isArray(sortRef.current)) {
            sortRef.current = sortRef.current.map(sortItem => {
                if (sortItem.idx === from + 1) {
                    return { ...sortItem, idx: to + 1 };
                } else if (sortItem.idx === to + 1) {
                    return { ...sortItem, idx: from + 1 };
                } else if (sortItem.idx > from + 1 && sortItem.idx <= to + 1) {
                    return { ...sortItem, idx: sortItem.idx - 1 };
                } else if (sortItem.idx < from + 1 && sortItem.idx >= to + 1) {
                    return { ...sortItem, idx: sortItem.idx + 1 };
                }
                return sortItem;
            });
        } else {
            if (sortRef.current.idx === from + 1) {
                sortRef.current = { ...sortRef.current, idx: to + 1 };
            } else if (sortRef.current.idx === to + 1) {
                sortRef.current = { ...sortRef.current, idx: from + 1 };
            } else if (sortRef.current.idx > from + 1 && sortRef.current.idx <= to + 1) {
                sortRef.current = { ...sortRef.current, idx: sortRef.current.idx - 1 };
            } else if (sortRef.current.idx < from + 1 && sortRef.current.idx >= to + 1) {
                sortRef.current = { ...sortRef.current, idx: sortRef.current.idx + 1 };
            }
        }
        setQueryParam();
        setRerender(prevRerender => prevRerender + 1);
    }

    function setQueryParam() {
        const params = getQueryString({
            type: typeRef.current,
            sel: selectionRef.current,
            columns: columnsRef.current,
            sort: sortRef.current
        });
        const currentHash = window.location.hash;
        const [basePath] = currentHash.split('?');
        const newHash = `${basePath}?${params}`;
        window.history.replaceState(null, '', `${window.location.pathname}${newHash}`);
    }

    function setSelectedTab(value: string) {
        typeRef.current = value;
        selectionRef.current = DEFAULT_TABS[value]?.selections[Object.keys(DEFAULT_TABS[value]?.selections)[0]] || "*";
        (selInputRef.current as HTMLInputElement).value = selectionRef.current;
        selTemplates.current = Object.keys(DEFAULT_TABS[value]?.selections ?? []);

        const colInfo = DEFAULT_TABS[value]?.columns[Object.keys(DEFAULT_TABS[value]?.columns)[0]];
        columnsRef.current = new Map((colInfo?.value || ["{id}"]).map(col => {
            if (Array.isArray(col)) {
                return [col[0], col[1]];
            } else {
                return [col, null];
            }
        }));
        colTemplates.current = Object.keys(DEFAULT_TABS[value]?.columns ?? []);
        colOptions.current = getColOptions(value);

        sortRef.current = colInfo?.sort || {idx: 0, dir: 'asc'};

        filter.current = "";
        const filterElem = filterRef.current;
        if (filterElem) {
            filterElem.value = "";
        }

        setQueryParam();

        setRerender(prevRerender => prevRerender + 1);
    }

    const handlePaste = useMemo(() => (event: React.ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        const text = event.clipboardData.getData('text');
        const sanitizedText = text.replace(/\r?\n|\r/g, '\t');
        if (colInputRef.current) {
            const { selectionStart, selectionEnd, value } = colInputRef.current;
            const newValue = value.slice(0, selectionStart!) + sanitizedText + value.slice(selectionEnd!);
            colInputRef.current.value = newValue;
        }
    }, []);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key.length === 1 || event.key === "Backspace") {
            const element = document.activeElement as HTMLElement;
            const id = element?.id?.startsWith("btn-") ? element.id.split("-")[1] : "";
            if (!id) return;
            // get the span inside the button
            const span = element.querySelector("span") as HTMLElement;
            const key = event.key;
            const currentValue = columnsRef.current.get(id) || "";
            if (key === "Backspace") {
                const newValue = currentValue.slice(0, -1);
                columnsRef.current.set(id, newValue || null);
                span.firstChild!.textContent = newValue.trim() ? `\u00A0as ${newValue}` : "​";
            } else {
                if (event.key === " ") {
                    event.preventDefault();
                }
                const newValue = currentValue.trim() + key;
                columnsRef.current.set(id, newValue);
                span.firstChild!.textContent = `\u00A0as ${newValue}`;
            }
            setQueryParam();
        }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <>
            <Tabs defaultValue={typeRef.current} className="w-full" onValueChange={setSelectedTab}>
                <div className="w-full overflow-x-auto">
                    <TabsList className="min-w-full">
                        {phTypes.map((f) => (
                            <TabsTrigger key={f} value={f} className='w-full'>
                                {toPlaceholderName(f)}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>
            </Tabs>
            <div className="themeDiv bg-opacity-10 rounded mt-2">
                <Button variant="ghost" size="md"
                        className="text-2xl w-full border-b border-secondary px-2 bg-primary/10 rounded-t justify-start"
                        onClick={() => setCollapseSelections(!collapseSelections)}>
                    Selection {collapseSelections ? <ChevronDown/> : <ChevronUp/>}
                </Button>
                <div className={`transition-all duration-200 ease-in-out ${collapseSelections ? 'max-h-0 opacity-0 overflow-hidden' : 'p-2 opacity-100'}`}>
                    <h2 className="text-lg mb-1">Templates</h2>
                    {selTemplates.current.map((selection) => (
                        <Button
                            key={selection}
                            variant="outline"
                            size="sm"
                            className="me-1"
                            onClick={() => {
                                selectionRef.current = DEFAULT_TABS[typeRef.current]?.selections[selection] || "*";
                                (selInputRef.current as HTMLInputElement).value = selectionRef.current;
                                setRerender(prevRerender => prevRerender + 1);
                            }}
                        >
                            {selection}
                        </Button>
                    ))}
                    <h2 className="text-lg my-1">Current Selection</h2>
                    <div className="flex items-center">
                        <input className="px-1 w-full"
                               ref={selInputRef}
                               type="text" defaultValue={selectionRef.current}
                               onChange={(e) => {
                                   selectionRef.current = e.target.value
                                   setQueryParam();
                               }
                               }/>
                        <TooltipProvider>
                            <BlockCopyButton getText={() => selectionRef.current}
                                             className="rounded-[6px] [&_svg]:size-3.5 ml-2" size="sm"/>
                        </TooltipProvider>
                    </div>
                    <a href={`https://github.com/xdnw/locutus/wiki/${toPlaceholderName(typeRef.current)}_placeholders`}
                       className="text-xs text-blue-800 dark:text-blue-400 underline hover:no-underline active:underline"
                       target="_blank" rel="noreferrer"
                    >View All {toPlaceholderName(typeRef.current)} Filters</a>
                </div>
            </div>
            <div className="themeDiv bg-opacity-10 rounded mt-2">
                <Button variant="ghost" size="md"
                        className="text-2xl w-full border-b border-secondary px-2 bg-primary/10 rounded-t justify-start"
                        onClick={() => setCollapseColumns(!collapseColumns)}>
                    Columns {collapseColumns ? <ChevronDown/> : <ChevronUp/>}
                </Button>
                <div
                    className={`transition-all duration-200 ease-in-out ${collapseColumns ? 'max-h-0 opacity-0 overflow-hidden' : 'p-2 opacity-100'}`}>
                    <h2 className="text-lg mb-1">Templates</h2>
                    {colTemplates.current.map((column) => (
                        <Button
                            key={column}
                            variant="outline"
                            size="sm"
                            className="me-1"
                            onClick={() => {
                                const colInfo = DEFAULT_TABS[typeRef.current]?.columns[column];
                                columnsRef.current = new Map((colInfo?.value || ["{id}"]).map(col => {
                                    if (Array.isArray(col)) {
                                        return [col[0], col[1]];
                                    } else {
                                        return [col, null];
                                    }
                                }));
                                sortRef.current = colInfo?.sort || {idx: 0, dir: 'asc'};
                                setQueryParam();
                                setRerender(prevRerender => prevRerender + 1);
                            }}
                        >
                            {column}
                        </Button>
                    ))}
                    <h2 className="text-lg mt-1 pb-0 mb-0">Current Columns</h2>
                    <span className="text-sm opacity-50 p-0 m-0">left-click to remove | middle-click to sort | shift+middle to sort by multiple | right click and type/backspace to edit alias | clipboard button to copy</span><br/>
                    <div className="inline-flex flex-wrap">
                    {Array.from(columnsRef.current).map((colInfo, index) => (
                    <span key={`spw-${index}`} className="inline-flex items-center bg-background rounded me-1 mb-1">
                        <ChevronLeft className="cursor-pointer w-4 h-6 rounded-s hover:bg-accent" onClick={() => moveColumn(index, -1)} />
                        <Button
                            key={colInfo[0]}
                            id={"btn-" + colInfo[0]}
                            variant="outline"
                            size="sm"
                            className="rounded-none border-r-input/50 border-l-input/50 inline-block"
                            onContextMenu={(e) => {
                                e.preventDefault();
                                e.currentTarget.focus();
                            }}
                            onClick={() => {
                                const index = Array.from(columnsRef.current).indexOf(colInfo);
                                if (index !== -1) {
                                    if (Array.isArray(sortRef.current)) {
                                        sortRef.current = sortRef.current
                                            .filter(sortItem => sortItem.idx !== index + 1)
                                            .map(sortItem => ({
                                                ...sortItem,
                                                idx: sortItem.idx > index + 1 ? sortItem.idx - 1 : sortItem.idx
                                            }));
                                    } else {
                                        if (sortRef.current.idx === index + 1) {
                                            sortRef.current = {idx: 0, dir: 'asc'};
                                        } else if (sortRef.current.idx > index + 1) {
                                            sortRef.current = {...sortRef.current, idx: sortRef.current.idx - 1};
                                        }
                                    }
                                }
                                columnsRef.current.delete(colInfo[0]);
                                setQueryParam();
                                setRerender(prevRerender => prevRerender + 1);
                                return false;
                            }}
                            onMouseDown={(e) => {
                                if (e.button === 1) {
                                    e.preventDefault();
                                    const val: OrderIdx | OrderIdx[] = sortRef.current;
                                    if (Array.isArray(val)) {
                                        const sortIndex = val.findIndex(sortItem => sortItem.idx === index + 1);
                                        if (sortIndex !== -1) {
                                            if (val[sortIndex].dir === 'asc') {
                                                val[sortIndex].dir = 'desc';
                                            } else {
                                                val.splice(sortIndex, 1);
                                            }
                                        } else {
                                            if (e.shiftKey && val.length > 0) {
                                                val.push({idx: index + 1, dir: 'asc'});
                                            } else {
                                                sortRef.current = {idx: index + 1, dir: 'asc'};
                                            }
                                        }
                                    } else if (val.idx !== index + 1) {
                                        if (e.shiftKey && val.idx !== 0) {
                                            sortRef.current = [{idx: val.idx, dir: val.dir}, {
                                                idx: index + 1,
                                                dir: 'asc'
                                            }];
                                        } else {
                                            sortRef.current = {idx: index + 1, dir: 'asc'};
                                        }
                                    } else if (val.dir === 'asc') {
                                        sortRef.current = {idx: index + 1, dir: 'desc'};
                                    } else {
                                        sortRef.current = {idx: 0, dir: 'asc'};
                                    }
                                    setQueryParam();
                                    setRerender(prevRerender => prevRerender + 1);
                                    return false;
                                }
                            }}
                        >
                            {colInfo[0]}
                            <span key={`colspan-${index}`} className="text-xs opacity-50">{colInfo[1] && colInfo[1] !== colInfo[0] ? `\u00A0as ${colInfo[1]}` : "​"}</span>
                            {Array.isArray(sortRef.current) ? (
                                sortRef.current.map((sortItem, sortIndex) => (
                                    sortItem.idx === index + 1 && (
                                        <span key={`sort-${index}-${sortIndex}`} className="bg-red-400 dark:bg-red-900 text-xs ml-1">
                {sortItem.dir} ({sortIndex + 1})
            </span>
                                    )
                                ))
                            ) : (
                                sortRef.current.idx === index + 1 && (
                                    <span key={`sort-${index}`} className="bg-red-400 dark:bg-red-900 text-xs ml-1">
            {sortRef.current.dir}
        </span>
                                )
                            )}
                        </Button>
                            <ChevronRight className="cursor-pointer inline-block w-4 rounded-e hover:bg-accent align-middle" onClick={() => moveColumn(index, 1)} />
                            </span>
                    ))}
                            <TooltipProvider>
                                <BlockCopyButton getText={() => {
                                    return Array.from(columnsRef.current).map(([key, value]) => value ? `${key};${value}` : key).join("\n");
                                }} className="rounded [&_svg]:size-3.5 me-1" size="sm"/>
                            </TooltipProvider>
                            <Button variant="destructive" size="sm" className="rounded" onClick={() => {
                                columnsRef.current = new Map();
                                sortRef.current = {idx: 0, dir: 'asc'};
                                setQueryParam();
                                setRerender(prevRerender => prevRerender + 1);
                            }}>X</Button>
                    </div>
                    <h2 className="text-lg mt-1 mb-0 p-0">Add Custom</h2>
                    <span className="text-sm opacity-50">type or paste in the placeholder, then press Enter | Use tab for multiple | Use semicolon ;BLAH for column alias</span>
                    <div className="flex w-full">
                        <input type="text" className="px-1 flex-grow"
                               placeholder="Custom column placeholders..."
                               ref={colInputRef}
                               onPaste={handlePaste}
                               onKeyDown={(e) => {
                                   if (e.key === "Enter") {
                                       e.preventDefault();
                                       if (colInputRef.current?.value) {
                                           const button = addButton.current;
                                           if (button) {
                                               button.click();
                                           }
                                       }
                                   } else if (e.key === "Tab") {
                                       e.preventDefault();
                                       const input = colInputRef.current;
                                       if (input) {
                                           const start = input.selectionStart;
                                           const end = input.selectionEnd;
                                           if (start !== null && end !== null) {
                                               const value = input.value;
                                               input.value = value.substring(0, start) + "\t" + value.substring(end);
                                               input.selectionStart = input.selectionEnd = start + 1;
                                           }
                                       }
                                   }
                               }}
                        />
                        <Button variant="outline" size="sm"
                                ref={addButton}
                                className="bg-destructive ml-2"
                                onClick={() => {
                                    const elem = (colInputRef.current as HTMLInputElement);
                                    const value = elem.value;
                                    if (value === "") {
                                        showDialog("Column name cannot be empty", "Please enter a column name before adding");
                                        return;
                                    }
                                    // split by tab
                                    const values = value.split("\t");
                                    const errors = [];
                                    for (const val of values) {
                                        if (val === "") continue;
                                        const aliasSplit = val.split(";");
                                        if (!aliasSplit[0]) continue;
                                        if (!aliasSplit[0].includes("{") && !aliasSplit[0].includes("}")) {
                                            aliasSplit[0] = "{" + aliasSplit[0] + "}";
                                        }
                                        if (columnsRef.current.has(aliasSplit[0]) && columnsRef.current.get(aliasSplit[0]) === (aliasSplit[1] ?? null)) {
                                            errors.push("Column `" + val + "` is already added");
                                            continue;
                                        }
                                        columnsRef.current.set(aliasSplit[0], aliasSplit[1] || null);
                                    }
                                    elem.value = "";
                                    if (errors.length > 0) {
                                        showDialog("Errors adding columns", errors.join("\n"));
                                    }
                                    setQueryParam();
                                    setRerender(prevRerender => prevRerender + 1);
                                }}>Add</Button>
                    </div>
                    <a href={`https://github.com/xdnw/locutus/wiki/${typeRef.current}_placeholders`}
                       className="text-xs text-blue-800 dark:text-blue-400 underline hover:no-underline active:underline"
                       target="_blank" rel="noreferrer"
                    >View All {typeRef.current} Placeholders</a>
                    <div className="bg-secondary rounded">
                        <Button variant="ghost" size="sm"
                                className="text-lg w-full border-b border-secondary px-2 bg-primary/10 rounded justify-start"
                                onClick={() => setCollapseColOptions(!collapseColOptions)}>
                            Add Simple {collapseColOptions ? <ChevronDown/> : <ChevronUp/>}
                        </Button>
                        <div
                            className={`transition-all duration-200 ease-in-out ${collapseColOptions ? 'max-h-0 opacity-0 overflow-hidden' : 'p-2 opacity-100'}`}>
                            <input
                                ref={filterRef}
                                type="text"
                                className="px-1 w-full mb-2"
                                placeholder="Filter options"
                                onChange={(e) => {
                                    filter.current = e.target.value.toLowerCase();
                                    setRerender(prevRerender => prevRerender + 1);
                                }}
                            />
                            {colOptions.current.filter(([key, value]) => !filter.current || key.toLowerCase().includes(filter.current) || value.toLowerCase().includes(filter.current)).map((option) =>
                                (
                                    <Button
                                        key={option[0]}
                                        variant="outline"
                                        size="sm"
                                        className={`me-1 mb-1 ${columnsRef.current.has("{" + option[0] + "}") ? "hidden" : ""}`}
                                        onClick={() => {
                                            columnsRef.current.set("{" + option[0] + "}", null);
                                            setQueryParam();
                                            setRerender(prevRerender => prevRerender + 1);
                                        }}
                                    >
                                        {option[0]}:&nbsp;<span key={option[0] + "-span"} className="text-xs opacity-50">{option[1]}</span>
                                    </Button>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}