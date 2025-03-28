/**
 * MyTable - raw table wrapper that accepts data and column info
 * CustomTable - No args, page view of custom tables
 * TableWithButtons
 * StaticTable - Memoized TableWithButtons
 * PlaceholderTabs - Buttons for placeholders
 *
 * getTypeFromUrl - parse the types from query string
 * getSelectionFromUrl - parse the types from query string
 * getColumnsFromUrl - parse the types from query string
 * getSortFromUrl - parse the types from query string
 * getUrl - get a full url from the type values
 * getQueryString - get the query string from the type values
 *

 */

import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import DataTable, { DataTableRef } from 'datatables.net-react';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import 'datatables.net-colreorder-dt';
import DT, { Api, ConfigColumns, ObjectColumnRender, OrderIdx } from 'datatables.net';
import { TABLE } from "../../lib/endpoints";
import { Button } from "../../components/ui/button";
import CopyToClipboard, { CopoToClipboardTextArea } from "../../components/ui/copytoclipboard";
import { COMMANDS } from "../../lib/commands";
import { Command, CM, STRIP_PREFIXES, toPlaceholderName, ICommand } from "../../utils/Command";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { ArrowRightToLine, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ClipboardIcon, Download, Sheet } from "lucide-react";
import { BlockCopyButton } from "../../components/ui/block-copy-button";
import { TooltipProvider } from "../../components/ui/tooltip";
import { WebTable, WebTableError } from "../../lib/apitypes";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDialog } from "../../components/layout/DialogContext";
import { Link } from "react-router-dom";
import { getRenderer, isHtmlRenderer } from "../../components/ui/renderers";
import { getQueryParams, queryParamsToObject } from "../../lib/utils";
import { downloadCells, ExportType, ExportTypes } from "../../utils/StringUtil";
import { DEFAULT_TABS } from "../../lib/layouts";
import CommandComponent from "../../components/cmd/CommandComponent";
import { createCommandStoreWithDef } from "../../utils/StateUtil";
import { Input } from "@/components/ui/input";
import EndpointWrapper from "@/components/api/bulkwrapper";
import { ApiFormInputs } from "@/components/api/apiform";

DataTable.use(DT);

function downloadTable(api: Api, useClipboard: boolean, type: ExportType): [string, string] {
    // Get the header
    const header = api.columns().header().toArray().slice(1).map((headerCell: HTMLElement) => headerCell.innerText);

    // Get the rows
    const rows = api.rows().data().toArray().map((row: (string | number)[]) => {
        return header.map((_, index) => row[index]);
    });

    // Combine header and rows
    const data = [header, ...rows];

    // iterate column objects (not the element)
    // (col.render as ObjectColumnRender)
    // cast to have property isEnum: boolean, options: string[] (optional)
    // if isEnum, then need to replace the values in the data with the options[value]
    // Iterate column objects (not the element)
    api.columns().every((index) => {
        const col = api.column(index);
        const render = col.init().render as { isEnum: boolean, options: string[] } | undefined;
        if (render && render.isEnum && render.options) {
            data.forEach((row, rowIndex) => {
                if (rowIndex > 0) { // Skip header row
                    const enumId = row[index - 1] as number;
                    row[index - 1] = render.options[enumId];
                }
            });
        }
    });

    return downloadCells(data, useClipboard, type);
}

export function getTypeFromUrl(params: URLSearchParams): keyof typeof COMMANDS.placeholders | undefined {
    return params.get('type') as keyof typeof COMMANDS.placeholders ?? undefined;
}

export function getSelectionFromUrl(params: URLSearchParams, current: keyof typeof COMMANDS.placeholders | undefined): { [key: string]: string } {
    const result: { [key: string]: string } = {};
    result[""] = params.get('sel') ?? (current ? DEFAULT_TABS[current]!.selections.All : undefined) ?? "*";
    const ignore: Set<string> = new Set(["type", "sel", "col", "sort"]);
    for (const [key, value] of params.entries()) {
        if (!ignore.has(key) && key) {
            result[key] = value;
        }
    }
    return result;
}

export function getColumnsFromUrl(params: URLSearchParams): Map<string, string | null> | undefined {
    const urlCols: { [key: string]: string | null } = Object.fromEntries(
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
    const type = useRef<keyof typeof COMMANDS.placeholders>(getTypeFromUrl(params) ?? "DBNation");
    const selection = useRef<{ [key: string]: string }>(getSelectionFromUrl(params, type.current));
    const columns = useRef<Map<string, string | null>>(getColumnsFromUrl(params) ?? new Map(
        (DEFAULT_TABS[type.current]?.columns[Object.keys(DEFAULT_TABS[type.current]?.columns ?? {})[0]]?.value ?? ["{id}"]).map(col => {
            if (Array.isArray(col)) {
                return [col[0], col[1]];
            } else {
                return [col, null];
            }
        })
    ));
    const sort = useRef<OrderIdx | OrderIdx[]>(getSortFromUrl(params) ?? (DEFAULT_TABS[type.current]?.columns[Object.keys(DEFAULT_TABS[type.current]?.columns ?? {})[0]]?.sort || { idx: 0, dir: 'asc' }));

    return (
        <>
            <div className="">
                <PlaceholderTabs selectionRef={selection} columnsRef={columns} typeRef={type} sortRef={sort} />
            </div>
            <div className="bg-light/10 border border-light/10 p-2 rounded mt-2">
                <TableWithButtons type={type} selection={selection} columns={columns} sort={sort} load={false} />
            </div>
        </>
    );
}

export function getUrl(type: string, selection: string, columns: string[], sort?: OrderIdx | OrderIdx[]): string {
    return `${process.env.BASE_PATH}custom_table?${getQueryString({
        type: type,
        sel: selection,
        columns: new Map(columns.map(col => [col, null])),
        sort: sort ? sort : { idx: 0, dir: "asc" }
    })}`;
}

export function toSelAndModifierString(selAndModifiers: { [key: string]: string }): string | undefined {
    let sel = undefined;
    if (Object.keys(selAndModifiers).length === 1) {
        sel = selAndModifiers[""];
    } else if (Object.keys(selAndModifiers).length > 1) {
        sel = JSON.stringify(selAndModifiers);
    }
    return sel;
}

export function getQueryString(
    { type, sel, selAndModifiers, columns, sort }: {
        type: string,
        sel?: string,
        selAndModifiers?: { [key: string]: string },
        columns: Map<string, string | null>,
        sort: OrderIdx | OrderIdx[]
    }
) {
    const params = new URLSearchParams();
    params.set('type', type);
    if (sel) params.set('sel', sel);
    else if (selAndModifiers) {
        for (const [key, value] of Object.entries(selAndModifiers)) {
            if (value) {
                params.append(key === "" ? "sel" : key, value);
            } else {
                // sel = value
                params.set('sel', value);
            }
        }
    }
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

export function StaticTable({ type, selection, columns, sort }: { type: string, selection: { [key: string]: string }, columns: (string | [string, string])[], sort: OrderIdx | OrderIdx[] | null }) {
    const typeRef = useRef(type);
    const selectionRef = useRef<{ [key: string]: string }>(selection);
    const columnsRef = useRef<Map<string, string | null>>(new Map(columns.map(col => {
        if (Array.isArray(col)) {
            return [col[0], col[1]];
        } else {
            return [col, null];
        }
    })));
    const sortRef = useRef<OrderIdx | OrderIdx[]>(sort ?? { idx: 0, dir: "asc" });

    return useMemo(() => (
        <TableWithButtons type={typeRef} selection={selectionRef} columns={columnsRef} sort={sortRef} load={true} />
    ), []);
}

export function TableWithButtons({ type, selection, columns, sort, load }: {
    type: React.RefObject<string>,
    selection: React.RefObject<{ [key: string]: string }>,
    columns: React.RefObject<Map<string, string | null>>,
    sort: React.RefObject<OrderIdx | OrderIdx[]>,
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
            <TableExports table={table as React.RefObject<DataTableRef>} type={type} selection={selection} columns={columns} />
            <Button
                variant="outline"
                size="sm"
                className=""
                onClick={() => {
                    const baseUrlWithoutPath = window.location.protocol + "//" + window.location.host;
                    const url = (`${baseUrlWithoutPath}${process.env.BASE_PATH}#/view_table?${encodeURIComponent(getQueryString({
                        type: type.current,
                        selAndModifiers: selection.current,
                        columns: columns.current,
                        sort: sort.current
                    }))}`);
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
                table={table as React.RefObject<DataTableRef>}
                data={data}
                columnsInfo={columnsInfo}
                sort={sort}
                searchSet={searchSet}
                visibleColumns={visibleColumns}
            />
        </>
    );
}

// function updateTable({table, columns, data: renderers}: {table: DataTableRef, columns: string[], data: (string | number | number[])[][], renderers?: (string | undefined)[]}) {
//     const api = table.current!.dt() as Api;
//     api.clear();
//     api.columns().remove();
//
// }

export function TableWith2DData({ columns, data, renderers, sort }: { columns: string[], data: (string | number | number[] | boolean)[][], renderers?: (string | undefined)[], sort?: OrderIdx | OrderIdx[] }) {
    const table = useRef<DataTableRef>(null);
    const sort2 = useRef<OrderIdx | OrderIdx[]>(sort ?? { idx: 0, dir: "asc" });
    const dataRef = data;
    const visibleColumns = Array.from(Array(data.length).keys());
    const searchSet = new Set<number>();
    const columnsInfo = columns.map((col, index) => ({
        title: col,
        data: index,
        render: renderers && renderers[index] ? getRenderer(renderers[index] as string) : undefined
    }));
    return useMemo(() => (
        <>
            <TableExports table={table} />
            <MyTable
                table={table}
                data={{ current: dataRef }}
                columnsInfo={{ current: columnsInfo }}
                sort={sort2}
                searchSet={{ current: searchSet }}
                visibleColumns={{ current: visibleColumns }}
            />
        </>
    ), [data]);
}
export function TableExports({ table, type, selection, columns }: {
    table: React.RefObject<DataTableRef | null>,
    type?: React.RefObject<string>,
    selection?: React.RefObject<{ [key: string]: string }>,
    columns?: React.RefObject<Map<string, string | null>>,
}) {
    const { showDialog } = useDialog();

    return <DropdownMenu modal={false}>
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
            {type && selection && columns && <DropdownMenuItem className="cursor-pointer" onClick={() => {
                const body = <>
                    <ul className="list-decimal list-inside">
                        <li className="bg-accent/20 mb-1 p-1 border-primary/5 border-2 rounded">
                            Set the google sheet tab name as the selection:<br />
                            <CopyToClipboard
                                text={`${toPlaceholderName(type.current)}:${selection.current}`} />
                        </li>
                        <li className="bg-accent/20 mb-1 p-1 border-primary/5 border-2 rounded">
                            Set the columns as the first row of cells in the sheet tab:<br />
                            <CopyToClipboard
                                text={`${Array.from(columns.current.keys()).join("\t")}`} />
                        </li>
                        <li className="bg-accent/20 mb-1 p-1 border-primary/5 border-2 rounded">
                            Run the discord command, with the sheet url, to autofill the remaining
                            cells:<br />
                            <CopyToClipboard
                                text={`/sheet_custom auto`} />
                        </li>
                    </ul>
                </>
                showDialog("Creating custom google sheets", body)
            }}>
                <kbd className="bg-accent rounded flex items-center space-x-1"><Sheet className="h-4 w-6" /></kbd>
                &nbsp;Google Sheets
            </DropdownMenuItem>}
        </DropdownMenuContent>
    </DropdownMenu>
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
    errors: React.RefObject<WebTableError[]>,
    table: React.RefObject<DataTableRef | null>,
    data: React.RefObject<(string | number | number[])[][]>,
    columnsInfo: React.RefObject<ConfigColumns[]>,
    sort: React.RefObject<OrderIdx | OrderIdx[]>,
    searchSet: React.RefObject<Set<number>>,
    visibleColumns: React.RefObject<number[]>,
    setRerender: React.Dispatch<React.SetStateAction<number>>,
    columns: React.RefObject<Map<string, string | null>>
) {
    errors.current = newData.errors ?? [];

    const api = table.current!.dt() as Api;
    // const elem = api.table().container() as HTMLElement;
    const header: string[] = columns.current.size > 0 ? Array.from(columns.current).map(([key, value]) => value ?? key) : newData.cells[0] as string[];
    const body = newData.cells.slice(1);
    const renderFuncNames = newData.renderers;
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
    if (true || api.columns().count() !== header.length + 1) {
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
    { type, selection, columns, errors, table, data, columnsInfo, sort, searchSet, visibleColumns, setRerender }:
        {
            type: React.RefObject<string>,
            selection: React.RefObject<{ [key: string]: string }>,
            columns: React.RefObject<Map<string, string | null>>,
            errors: React.RefObject<WebTableError[]>,
            table: React.RefObject<DataTableRef | null>,
            data: React.RefObject<(string | number | number[])[][]>,
            columnsInfo: React.RefObject<ConfigColumns[]>,
            sort: React.RefObject<OrderIdx | OrderIdx[]>,
            searchSet: React.RefObject<Set<number>>,
            visibleColumns: React.RefObject<number[]>,
            setRerender: React.Dispatch<React.SetStateAction<number>>
        }
) {
    const { showDialog } = useDialog();
    const url = useRef(`${process.env.BASE_PATH}custom_table?${getQueryString({
        type: type.current,
        selAndModifiers: selection.current,
        columns: columns.current,
        sort: sort.current
    })}`);
    return <EndpointWrapper endpoint={TABLE} args={{
        type: type.current,
        selection_str: toSelAndModifierString(selection.current),
        columns: Array.from(columns.current.keys()),
    }}>{({ data: newData }) => {
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
        }
    </EndpointWrapper>
}

/**
 * A table with a button to fetch and render the data
 * @param type
 * @param selection
 * @param columns
 * @param errors
 * @param table
 * @param data
 * @param columnsInfo
 * @param sort
 * @param searchSet
 * @param visibleColumns
 * @param setRerender
 * @constructor
 */
function DeferTable(
    { type, selection, columns, errors, table, data, columnsInfo, sort, searchSet, visibleColumns, setRerender }:
        {
            type: React.RefObject<string>,
            selection: React.RefObject<{ [key: string]: string }>,
            columns: React.RefObject<Map<string, string | null>>,
            errors: React.RefObject<WebTableError[]>,
            table: React.RefObject<DataTableRef | null>,
            data: React.RefObject<(string | number | number[])[][]>,
            columnsInfo: React.RefObject<ConfigColumns[]>,
            sort: React.RefObject<OrderIdx | OrderIdx[]>,
            searchSet: React.RefObject<Set<number>>,
            visibleColumns: React.RefObject<number[]>,
            setRerender: React.Dispatch<React.SetStateAction<number>>
        }
) {
    const { showDialog } = useDialog();

    return (
        <>
            <ApiFormInputs
                endpoint={TABLE}
                default_values={{
                    type: type.current,
                    selection_str: toSelAndModifierString(selection.current),
                    columns: Array.from(columns.current.keys()),
                }}
                classes="bg-destructive"
                label="Generate Table"
                handle_response={({ data: newData }) => {
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
                }}
            />
        </>
    );
}

// export type DataTableSlots = {     [p: string]: DataTableSlot     [p: number]: DataTableSlot }
function getReactSlots(columnsInfo: ConfigColumns[]): { [key: number]: ((data: unknown, row: unknown, rowData: object[]) => ReactNode) } | undefined {
    const reactSlots: { [key: number]: (data: unknown, row: unknown, rowData: object[]) => ReactNode } = {};
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

export function MyTable({ table, data, columnsInfo, sort, searchSet, visibleColumns }:
    {
        table: React.RefObject<DataTableRef | null>,
        data: React.RefObject<(string | number | boolean | number[])[][]>,
        columnsInfo: React.RefObject<ConfigColumns[]>,
        sort: React.RefObject<OrderIdx | OrderIdx[]>,
        searchSet: React.RefObject<Set<number>>,
        visibleColumns: React.RefObject<number[]>,
        // reactColumns: ((data: object) => ReactNode)[],
    }) {

    return (
        <DataTable
            slots={getReactSlots(columnsInfo.current)}
            ref={table}
            data={data.current}
            columns={[{ data: null, title: "#", orderable: false, searchable: false, className: 'dt-center' },
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
            className="display table-auto divide-y w-full border-separate border-spacing-y-1 text-xs compact font-mono" />
    );
}

export function getColOptions(type: string, filter?: (f: Command) => boolean): [string, string][] {
    const commands: { [key: string]: Command } = CM.getPlaceholderCommands(type);
    const result: [string, string][] = [];
    for (const [key, value] of Object.entries(commands)) {
        if (filter && !filter(value)) {
            continue;
        }
        if (!value.hasRequiredArgument()) {
            result.push([value.name, value.command.desc]);
        }
    }
    return result;
}

export function PlaceholderTabs({ typeRef, selectionRef, columnsRef, sortRef }: {
    typeRef: React.RefObject<keyof typeof COMMANDS.placeholders>,
    selectionRef: React.RefObject<{ [key: string]: string }>,
    columnsRef: React.RefObject<Map<string, string | null>>,
    sortRef: React.RefObject<OrderIdx | OrderIdx[]>,
}) {
    const { showDialog } = useDialog();
    const addButton = useRef<HTMLButtonElement>(null);
    const [rerender, setRerender] = useState(0);
    const [collapseColumns, setCollapseColumns] = useState(false);
    const [collapseSelections, setCollapseSelections] = useState(false);
    const [collapseColOptions, setCollapseColOptions] = useState(true);
    const filterRef = useRef<HTMLInputElement>(null);

    const phTypes = useMemo(() => CM.getPlaceholderTypes(false), []);
    const colTemplates = useRef(Object.keys(DEFAULT_TABS[typeRef.current]?.columns ?? {}));
    const selTemplates = useRef(Object.keys(DEFAULT_TABS[typeRef.current]?.selections ?? {}));

    const selInputRef = useRef<HTMLInputElement>(null);
    const colInputRef = useRef<HTMLInputElement>(null);

    const colOptions = useRef<[string, string][]>(getColOptions(typeRef.current));
    const filter = useRef("");

    // Memoize filtered column options instead of doing this on every render
    const filteredOptions = useMemo(() => 
        colOptions.current.filter(([key, value]) => 
        !filter.current || key.toLowerCase().includes(filter.current) || value.toLowerCase().includes(filter.current)
        ), [rerender, filter.current]);

    const moveColumn = useCallback((from: number, amount: number) => {
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
    }, []);

    const setQueryParam = useCallback(() => {
        const params = getQueryString({
            type: typeRef.current,
            selAndModifiers: selectionRef.current,
            columns: columnsRef.current,
            sort: sortRef.current
        });
        const currentHash = window.location.hash;
        const [basePath] = currentHash.split('?');
        const newHash = `${basePath}?${params}`;
        window.history.replaceState(null, '', `${window.location.pathname}${newHash}`);
    }, []);

    const setSelectedTab = useCallback((valueStr: string) => {
        const value = valueStr as keyof typeof COMMANDS.placeholders;
        typeRef.current = value;
        selectionRef.current = { "": DEFAULT_TABS[value]?.selections[Object.keys(DEFAULT_TABS[value]?.selections ?? {})[0]] || "*" };
        (selInputRef.current as HTMLInputElement).value = selectionRef.current[""];
        selTemplates.current = Object.keys(DEFAULT_TABS[value]?.selections ?? []);

        const colInfo = DEFAULT_TABS[value]?.columns[Object.keys(DEFAULT_TABS[value]?.columns ?? {})[0]];
        columnsRef.current = new Map((colInfo?.value || ["{id}"]).map(col => {
            if (Array.isArray(col)) {
                return [col[0], col[1]];
            } else {
                return [col, null];
            }
        }));
        colTemplates.current = Object.keys(DEFAULT_TABS[value]?.columns ?? []);
        colOptions.current = getColOptions(value);

        sortRef.current = colInfo?.sort || { idx: 0, dir: 'asc' };

        filter.current = "";
        const filterElem = filterRef.current;
        if (filterElem) {
            filterElem.value = "";
        }

        setQueryParam();

        setRerender(prevRerender => prevRerender + 1);
    }, []);

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
            <div className="bg-light/10 border border-light/10 rounded mt-2">
                <Button variant="ghost" size="md"
                    className="text-2xl w-full border-b border-secondary px-2 bg-primary/10 rounded-t justify-start"
                    onClick={() => setCollapseSelections(!collapseSelections)}>
                    Selection {collapseSelections ? <ChevronDown /> : <ChevronUp />}
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
                                selectionRef.current[""] = DEFAULT_TABS[typeRef.current]?.selections[selection] || "*";
                                (selInputRef.current as HTMLInputElement).value = selectionRef.current[""];
                                setQueryParam();
                                setRerender(prevRerender => prevRerender + 1);
                            }}
                        >
                            {selection}
                        </Button>
                    ))}
                    <h2 className="text-lg my-1">Current Selection</h2>
                    <div className="flex items-center">
                        <Input className="relative px-1 w-full"
                            ref={selInputRef}
                            type="text" defaultValue={selectionRef.current[""]}
                            onChange={(e) => {
                                selectionRef.current[""] = e.target.value
                                setQueryParam();
                            }
                            } />
                        <TooltipProvider>
                            <BlockCopyButton getText={() => selectionRef.current[""]}
                                className="rounded-[6px] [&_svg]:size-3.5 ml-2" size="sm" />
                        </TooltipProvider>
                    </div>
                    {CM.placeholders(typeRef.current).getCreate() && <ModifierComponent modifier={CM.placeholders(typeRef.current).getCreate() as Command} selectionRef={selectionRef} setQueryParam={setQueryParam} />}
                    <a href={`https://github.com/xdnw/locutus/wiki/${toPlaceholderName(typeRef.current)}_placeholders`}
                        className="text-xs text-blue-800 dark:text-blue-400 underline hover:no-underline active:underline"
                        target="_blank" rel="noreferrer"
                    >View All {toPlaceholderName(typeRef.current)} Filters</a>
                </div>
            </div>
            <div className="bg-light/10 border border-light/10 rounded mt-2">
                <Button variant="ghost" size="md"
                    className="text-2xl w-full border-b border-secondary px-2 bg-primary/10 rounded-t justify-start"
                    onClick={() => setCollapseColumns(!collapseColumns)}>
                    Columns {collapseColumns ? <ChevronDown /> : <ChevronUp />}
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
                                sortRef.current = colInfo?.sort || { idx: 0, dir: 'asc' };
                                setQueryParam();
                                setRerender(prevRerender => prevRerender + 1);
                            }}
                        >
                            {column}
                        </Button>
                    ))}
                    <h2 className="text-lg mt-1 pb-0 mb-0">Current Columns</h2>
                    <span className="text-sm opacity-50 p-0 m-0">left-click to remove | middle-click to sort | shift+middle to sort by multiple | right click and type/backspace to edit alias | clipboard button to copy</span><br />
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
                                                    sortRef.current = { idx: 0, dir: 'asc' };
                                                } else if (sortRef.current.idx > index + 1) {
                                                    sortRef.current = { ...sortRef.current, idx: sortRef.current.idx - 1 };
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
                                                        val.push({ idx: index + 1, dir: 'asc' });
                                                    } else {
                                                        sortRef.current = { idx: index + 1, dir: 'asc' };
                                                    }
                                                }
                                            } else if (val.idx !== index + 1) {
                                                if (e.shiftKey && val.idx !== 0) {
                                                    sortRef.current = [{ idx: val.idx, dir: val.dir }, {
                                                        idx: index + 1,
                                                        dir: 'asc'
                                                    }];
                                                } else {
                                                    sortRef.current = { idx: index + 1, dir: 'asc' };
                                                }
                                            } else if (val.dir === 'asc') {
                                                sortRef.current = { idx: index + 1, dir: 'desc' };
                                            } else {
                                                sortRef.current = { idx: 0, dir: 'asc' };
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
                            }} className="rounded [&_svg]:size-3.5 me-1" size="sm" />
                        </TooltipProvider>
                        <Button variant="destructive" size="sm" className="rounded" onClick={() => {
                            columnsRef.current = new Map();
                            sortRef.current = { idx: 0, dir: 'asc' };
                            setQueryParam();
                            setRerender(prevRerender => prevRerender + 1);
                        }}>X</Button>
                    </div>
                    <h2 className="text-lg mt-1 mb-0 p-0">Add Custom</h2>
                    <span className="text-sm opacity-50">type or paste in the placeholder, then press Enter | Use tab for multiple | Use semicolon ;BLAH for column alias</span>
                    <div className="flex w-full">
                        <Input type="text" className="relative px-1 grow"
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
                            Add Simple {collapseColOptions ? <ChevronDown /> : <ChevronUp />}
                        </Button>
                        <div
                            className={`transition-all duration-200 ease-in-out ${collapseColOptions ? 'max-h-0 opacity-0 overflow-hidden' : 'p-2 opacity-100'}`}>
                            <input
                                ref={filterRef}
                                type="text"
                                className="relative px-1 w-full mb-2"
                                placeholder="Filter options"
                                onChange={(e) => {
                                    filter.current = e.target.value.toLowerCase();
                                    setRerender(prevRerender => prevRerender + 1);
                                }}
                            />
                            {filteredOptions.map((option) =>
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

export function ModifierComponent({ modifier, selectionRef, setQueryParam }: { modifier: Command, selectionRef: React.RefObject<{ [key: string]: string }>, setQueryParam: () => void }) {
    return <>
        <CommandComponent overrideName={"Modifier"} command={modifier} filterArguments={() => true} initialValues={selectionRef.current}
            setOutput={(key: string, value: string) => {
                if (value === undefined || value === null || value === "") {
                    delete selectionRef.current[key];
                } else {
                    selectionRef.current[key] = value;
                }
                setQueryParam();
            }}
        />
    </>
}