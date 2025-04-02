import React, { ReactNode, useCallback, useMemo, useRef, useState } from "react";
import { TABLE } from "../../lib/endpoints";
import { Button } from "../../components/ui/button";
import { CopoToClipboardTextArea } from "../../components/ui/copytoclipboard";
import { WebTable, WebTableError } from "../../lib/apitypes";
import { useDialog } from "../../components/layout/DialogContext";
import { Link } from "react-router-dom";
import EndpointWrapper from "@/components/api/bulkwrapper";
import { ApiFormInputs } from "@/components/api/apiform";
import { TableWithExports } from "./TableWithExports";
import { getQueryString, setTableVars, toSelAndModifierString } from "./table_util";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { bulkQueryOptions, singleQueryOptions } from "@/lib/queries";
import { ConfigColumns, DataTable, OrderIdx } from "./DataTable";
import { DataGridHandle } from "react-data-grid";

export type TableInfo = {
    data: (string | number | number[])[][],
    visibleColumns: number[],
    searchSet: Set<number>,
    columnsInfo: ConfigColumns[],
    errors: WebTableError[],
    sort: OrderIdx | OrderIdx[],
}

export type TableProps = {
    type: string,
    selection: { [key: string]: string },
    columns: Map<string, string | null>,
    sort: OrderIdx | OrderIdx[],
}

export function AbstractTableWithButtons({ getTableProps, load }: {
    getTableProps: () => TableProps,
    load: boolean
}) {
    const table = useRef<DataGridHandle>(null);
    const { showDialog } = useDialog();

    const [type, setType] = useState<string | null>(null);
    const [selection, setSelection] = useState<{ [key: string]: string }>({});
    const [columns, setColumns] = useState<Map<string, string | null>>(new Map<string, string | null>());
    const [sortState, setSortState] = useState<OrderIdx | OrderIdx[]>({"dir": "asc", "idx": 0});
    
    const [data, setData] = useState<(string | number | number[])[][]>([]);
    const [visibleColumns, setVisibleColumns] = useState<number[]>([]);
    const [searchSet, setSearchSet] = useState<Set<number>>(new Set<number>());
    const [columnsInfo, setColumnsInfo] = useState<ConfigColumns[]>([]);
    const [errors, setErrors] = useState<WebTableError[]>([]);

    // const [rerender, setRerender] = useState(0);

    const getTablePropsFinal = useCallback(() => {
        const props = getTableProps();
        setType(props.type);
        setSelection(props.selection);
        setColumns(props.columns);
        setSortState(props.sort);
        return props;
    }, [getTableProps]);

    const updateTable = useCallback((data: TableInfo) => {
        // if (table) {
        //     const api = table.current!.dt() as Api;
        //     api.destroy(false);
        // }
        setData(data.data);
        setColumnsInfo(data.columnsInfo);
        setVisibleColumns(data.visibleColumns);
        setSearchSet(data.searchSet);
        setErrors(data.errors);
        setSortState(data.sort);
        // setRerender(prev => prev + 1);
    }, [setData, setColumnsInfo, setVisibleColumns, setSearchSet, setErrors, setSortState]);

    const highlightRowOrColumn = useCallback((col?: number, row?: number) => {
        const tableElem = table?.current?.element;
        // remove all bg-red-500 from table th and td
        const elemsWithRed = tableElem?.querySelectorAll('.bg-red-500') || [];
        for (const elem of elemsWithRed) {
            elem.classList.remove('bg-red-500');
        }
        console.log("Highlighting row", row, "and column", col);
        // if (row !== undefined && row !== null) {
        //     const rawRowAtIndexRow = api.rows().data()[row];
        //     const displayedRowIndex = api.rows((idx, data, node) => {
        //         return data === rawRowAtIndexRow;
        //     }).indexes()[0];

        //     if (displayedRowIndex !== undefined) {
        //         // Navigate to the page containing the row
        //         const page = Math.floor(displayedRowIndex / api.page.len());
        //         // if not current page
        //         if (api.page() !== page) {
        //             api.page(page).draw(false);
        //         }

        //         const rowInCurrentPage = displayedRowIndex % api.page.len();
        //         const rowElem = tableElem.querySelector(`tbody tr:nth-child(${rowInCurrentPage + 1})`);
        //         if (rowElem) {
        //             if (col !== undefined && col !== null) {
        //                 const td = rowElem.querySelector(`td:nth-child(${col + 2})`);
        //                 if (td) {
        //                     td.classList.add('bg-red-500');
        //                 }
        //             } else {
        //                 const tds = rowElem.querySelectorAll('td');
        //                 for (const td of tds) {
        //                     td.classList.add('bg-red-500');
        //                 }
        //             }
        //         }
        //     }
        // } else if (col !== undefined && col !== null) {
        //     const th = tableElem.querySelector(`thead th:nth-child(${col + 2})`);
        //     if (th) {
        //         th.classList.add('bg-red-500');
        //     }
        // }
    }, [table]);

    const copy = useCallback(() => {
        const baseUrlWithoutPath = window.location.protocol + "//" + window.location.host;
        const url = (`${baseUrlWithoutPath}${process.env.BASE_PATH}#/view_table?${encodeURIComponent(getQueryString({
            type: type!,
            selAndModifiers: selection,
            columns: columns,
            sort: sortState
        }))}`);
        navigator.clipboard.writeText(url).then(() => {
            showDialog("URL copied to clipboard", url, true);
        }).catch((err) => {
            showDialog("Failed to copy URL to clipboard", err + "", true);
        });
    }, [type, selection, columns, sortState, showDialog]);
   
    const showErrors = useCallback(() => {
        const title = errors.length > 0 ? "Errors updating table" : "No errors";
        const body = errors.length > 0 ? <>
            Errors updating the table may prevent some data from being displayed.
            Click the buttons below to highlight the errors in the table.
            {errors.map((error, index) => (
                <Button key={index} variant="destructive" className="my-1 h-auto break-words w-full justify-start size-sm whitespace-normal" onClick={() => highlightRowOrColumn(error.col, error.row)}>
                    [col:{(error.col || 0) + 1}{error.row ? `row:${error.row + 1}` : ""}] {error.msg}
                </Button>
            ))}
        </> : "No errors";
        showDialog(title, body);
    }, [errors, showDialog, highlightRowOrColumn]);

    const tableLoaderComponent = useMemo(() => {
        return load ? (
            <LoadTable
                getTableProps={getTablePropsFinal}
                updateTable={updateTable}
                table={table}
            />
        ) : (
            <DeferTable
                getTableProps={getTablePropsFinal}
                updateTable={updateTable}
                table={table}
            />
        );
    }, [load, getTablePropsFinal, updateTable, table]);
    
    const exportsComponent = useMemo(() => {
        if (!type || !selection || !columns) return null;
        return (
            <TableWithExports 
                table={table as React.RefObject<DataGridHandle>} 
                type={type} 
                selection={selection} 
                columns={columns} 
            />
        );
    }, [type, selection, columns, table]);
    
    const shareButton = useMemo(() => {
        return (
            <Button
                variant="outline"
                size="sm"
                onClick={copy}>
                Share
            </Button>
        );
    }, [copy]);
    
    const errorsButton = useMemo(() => {
        return (
            <Button 
                variant="outline" 
                size="sm" 
                className={`ms-1 bg-destructive ${errors.length == 0 ? "hidden" : ""}`}
                onClick={showErrors}>
                View {errors.length} Errors
            </Button>
        );
    }, [errors.length, showErrors]);
    
    return (
        <>
            {tableLoaderComponent}
            {exportsComponent}
            {shareButton}
            {errorsButton}
            <DataTable
                // key={rerender}
                table={table as React.RefObject<DataGridHandle>}
                data={data}
                columnsInfo={columnsInfo}
                sort={sortState}
                searchSet={searchSet}
                visibleColumns={visibleColumns}
            />
        </>
    );
}


function LoadTable(
    { getTableProps, updateTable, table }:
    {
        getTableProps: () => TableProps,
        updateTable: (data: TableInfo) => void,
        table: React.RefObject<DataGridHandle | null>,
    }
) {
    const { showDialog } = useDialog();

    const props = useMemo(() => getTableProps(), [getTableProps]);

    const {type, selection, columns, sort} = props;
    const url = useMemo(() => {
        const baseUrlWithoutPath = window.location.protocol + "//" + window.location.host;
        return `${baseUrlWithoutPath}${process.env.BASE_PATH}#/view_table?${encodeURIComponent(getQueryString({
            type: type,
            selAndModifiers: selection,
            columns: columns,
            sort: sort
        }))}`;
    }, [type, selection, columns, sort]);

    return <EndpointWrapper endpoint={TABLE} args={{
        type: type,
        selection_str: toSelAndModifierString(selection),
        columns: Array.from(columns.keys()),
    }}>{({ data: newData }) => {
        try {
            const info: TableInfo = setTableVars(newData, sort, columns);
            updateTable(info);
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
            asChild><Link to={url}>Edit Table</Link></Button>
    }}
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
    { getTableProps, updateTable, table }:
    {
        getTableProps: () => TableProps,
        updateTable: (data: TableInfo) => void,
        table: React.RefObject<DataGridHandle | null>,
    }
) {
    const { showDialog } = useDialog();
    const queryClient = useQueryClient();

    const onErrorOrNull = useCallback((e: string | Error) => {
        console.error(e);
        const errorMessage = e instanceof Error ? <>
            {e.message}
            <CopoToClipboardTextArea text={e.stack + ""} />
        </> : e + "";
        showDialog("Failed to update table", errorMessage, true);
    }, []);

    const onSuccess = useCallback((data: WebTable, sort: OrderIdx | OrderIdx[], columns: Map<string, string | null>) => {
        try {
            const info: TableInfo = setTableVars(data, sort, columns);
            updateTable(info);
        } catch (e) {
            onErrorOrNull(e as (string | Error));
        }
    }, [table, updateTable, onErrorOrNull]);

    const submit = useCallback(() => {
        const { type, selection, columns, sort } = getTableProps();

        const params = {
            type: type,
            selection_str: toSelAndModifierString(selection),
            columns: Array.from(columns.keys()),
        } as {type?: string, selection_str?: string, columns?: string[] | string};

        console.log("Params", params);
        
        // Call tanstack query refetch with params
        // Fetch directly with the queryClient using the new params
        queryClient.fetchQuery(singleQueryOptions(TABLE.endpoint, params)).then(({data}) => {
            if (data) {
                console.log("Data received from server", data);
                onSuccess(data, sort, columns);
            }
            else onErrorOrNull("No data returned from server");
        }).catch((error) => {
            onErrorOrNull(error);
        });
    }, [getTableProps, onSuccess, queryClient, onErrorOrNull]);

    return <Button variant="destructive" size="sm" className="me-1" onClick={submit}>Generate Table</Button>
}