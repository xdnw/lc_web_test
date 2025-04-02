import { useCallback, useEffect, useRef, useState } from "react";
import { OrderIdx } from './DataTable';
import { COMMANDS } from "../../lib/commands";
import { getQueryParams } from "../../lib/utils";
import { DEFAULT_TABS } from "../../lib/layouts";
import { getSortFromUrl } from "./table_util";
import { PlaceholderTabs, PlaceholderTabsHandle } from "@/pages/custom_table/PlaceholderTabs";
import { getColumnsFromUrl, getSelectionFromUrl, getTypeFromUrl } from "./table_util";
import { AbstractTableWithButtons, TableProps } from "@/pages/custom_table/AbstractTable";
import { useDeepState, useSyncedState } from "@/utils/StateUtil";


export default function CustomTable() {
    const [params, setParams] = useDeepState(getQueryParams());

    const [type, setType] = useDeepState<keyof typeof COMMANDS.placeholders>(
        getTypeFromUrl(params) ?? "DBNation"
    );
    const [selection, setSelection] = useDeepState<{ [key: string]: string }>(
        getSelectionFromUrl(params, type)
    );
    const [columns, setColumns] = useDeepState<Map<string, string | null>>(function () {
        return getColumnsFromUrl(params) ?? new Map(
            (DEFAULT_TABS[type]?.columns[Object.keys(DEFAULT_TABS[type]?.columns ?? {})[0]]?.value ?? ["{id}"]).map(col => {
                if (Array.isArray(col)) {
                    return [col[0], col[1]];
                } else {
                    return [col, null];
                }
            })
        );
    }());
    const [sort, setSort] = useDeepState<OrderIdx | OrderIdx[]>(
        getSortFromUrl(params) ?? (DEFAULT_TABS[type]?.columns[Object.keys(DEFAULT_TABS[type]?.columns ?? {})[0]]?.sort || { idx: 0, dir: 'asc' })
    );
    console.log("Params ", selection);

    // PlaceholderTabsHandle
    const tabsRef = useRef<PlaceholderTabsHandle>(null);

    const getTableProps = useCallback(() => {
        const data: TableProps = {
            type: tabsRef.current!.getType(),
            selection: tabsRef.current!.getSelection(),
            columns: tabsRef.current!.getColumns(),
            sort: tabsRef.current!.getSort(),
        };
        return data;
    }, [tabsRef]);

    return (
        <>
            <div>
                <PlaceholderTabs 
                    ref={tabsRef}
                    defType={type}
                    defSelection={selection}
                    defColumns={columns}
                    defSort={sort}
                />
            </div>
            <div className="bg-light/10 border border-light/10 p-2 rounded mt-2">
                <AbstractTableWithButtons 
                    getTableProps={getTableProps}
                    load={false} 
                />
            </div>
        </>
    );
}