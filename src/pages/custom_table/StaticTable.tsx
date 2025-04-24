import { useCallback, useMemo } from "react";
import { OrderIdx } from './DataTable';
import { AbstractTableWithButtons, TableProps } from "./AbstractTable";

export function StaticTable({ type, selection, columns, sort }: { type: string, selection: { [key: string]: string }, columns: (string | [string, string])[], sort?: OrderIdx | OrderIdx[] | undefined }) {
    const getTableProps = useCallback((): TableProps => {
        return {
            type: type,
            selection: selection,
            columns: new Map(columns.map(col => {
                return Array.isArray(col)
                    ? [col[0], col[1]]
                    : [col, null];
            })),
            sort: sort,
        };
    }, [type, selection, columns, sort]);

    return useMemo(() => (
        <AbstractTableWithButtons getTableProps={getTableProps} load={true} />
    ), [getTableProps]);
}