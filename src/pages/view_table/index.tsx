import {
    getColumnsFromUrl,
    getSelectionFromUrl,
    getSortFromUrl,
    getTypeFromUrl,
    StaticTable
} from "../custom_table";
import {getQueryParams} from "../../lib/utils";
import {useRef} from "react";
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
    const params = useRef(getQueryParams());
    const typeRef = useRef(getTypeFromUrl(params.current));
    const selRef = useRef(getSelectionFromUrl(params.current, typeRef.current));
    const colRef = useRef<(string | [string, string])[] | undefined>(adaptColumns(getColumnsFromUrl(params.current)));
    const sortRef = useRef<OrderIdx | OrderIdx[]>(getSortFromUrl(params.current) ?? {idx: 0, dir: "asc"});

    if (!typeRef.current || !selRef.current || !colRef.current) {
        return <div className="container bg-light/10 border border-light/10 p-2">
            No table data selected. Visit the table editor to create one.<br />
            <Button variant="outline" size="sm" className='border-red-800/70' asChild><Link className='' to={`${process.env.BASE_PATH}custom_table`}>Table Editor</Link></Button>
        </div>;
    }
    return (<>
        <StaticTable type={typeRef.current} selection={selRef.current} columns={colRef.current} sort={sortRef.current} />
    </>);
}