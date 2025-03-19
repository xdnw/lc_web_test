import {
    getColumnsFromUrl,
    getSelectionFromUrl,
    getSortFromUrl,
    getTypeFromUrl,
    StaticTable
} from "../custom_table";
import {getQueryParams} from "../../lib/utils";
import {useMemo, useRef} from "react";
import {OrderIdx} from "datatables.net";
import {Link} from "react-router-dom";
import {Button} from "../../components/ui/button";

function adaptColumns(columns: Map<string, string | null> | undefined): (string | [string, string])[] | undefined {
    if (!columns) return undefined;
    return Array.from(columns.entries()).map(([key, value]) => {
        return value === null ? key : [key, value];
    });
}


export default function ViewTable() {
    const params = useMemo(() => getQueryParams(), []);
    const type = useMemo(() => getTypeFromUrl(params), [params]);
    const selection = useMemo(() => getSelectionFromUrl(params, type), [params, type]);
    const columns = useMemo(() => adaptColumns(getColumnsFromUrl(params)), [params]);
    const sort = useMemo<OrderIdx | OrderIdx[]>(() => getSortFromUrl(params) ?? {idx: 0, dir: "asc"}, [params]);

    if (!type || !selection || !columns) {
        return <div className="container bg-light/10 border border-light/10 p-2">
            No table data selected. Visit the table editor to create one.<br />
            <Button variant="outline" size="sm" className='border-red-800/70' asChild><Link className='' to={`${process.env.BASE_PATH}custom_table`}>Table Editor</Link></Button>
        </div>;
    }
    return (<>
        <StaticTable type={type} selection={selection} columns={columns} sort={sort} />
    </>);
}