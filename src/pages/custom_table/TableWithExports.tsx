import CopyToClipboard from "@/components/ui/copytoclipboard";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { downloadTable } from "./table_util";
import { ExportTypes } from "@/utils/StringUtil";
import { Api } from 'datatables.net';
import { DataTableRef } from "datatables.net-react";
import { Button } from "@/components/ui/button";
import { toPlaceholderName } from "@/utils/Command";
import { useDialog } from "@/components/layout/DialogContext";
import LazyIcon from "@/components/ui/LazyIcon";

export function TableWithExports({ table, type, selection, columns }: {
    table: React.RefObject<DataTableRef | null>,
    type?: string,
    selection?: { [key: string]: string },
    columns?: Map<string, string | null>,
}) {
    const { showDialog } = useDialog();

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="me-1">Export</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer" onClick={() => showDialog(...downloadTable(table.current!.dt() as Api, false, ExportTypes.CSV))}>
                <kbd className="bg-accent rounded flex items-center space-x-1"><LazyIcon name="Download" className="h-4 w-4" /> <span>,</span></kbd>&nbsp;Download CSV
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => showDialog(...downloadTable(table.current!.dt() as Api, true, ExportTypes.CSV))}>
                <kbd className="bg-accent rounded flex items-center space-x-1"><LazyIcon name="ClipboardIcon" className="h-4 w-4" /> <span>,</span></kbd>&nbsp;Copy CSV
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => showDialog(...downloadTable(table.current!.dt() as Api, false, ExportTypes.TSV))}>
                <kbd className="bg-accent rounded flex items-center space-x-1"><LazyIcon name="Download" className="h-4 w-3" /><LazyIcon name="ArrowRightToLine" className="h-4 w-3" /></kbd>&nbsp;Download TSV
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => showDialog(...downloadTable(table.current!.dt() as Api, true, ExportTypes.TSV))}>
                <kbd className="bg-accent rounded flex items-center space-x-1"><LazyIcon name="ClipboardIcon" className="h-4 w-3" /><LazyIcon name="ArrowRightToLine" className="h-4 w-3" /></kbd>&nbsp;Copy TSV
            </DropdownMenuItem>
            {type && selection && columns && <DropdownMenuItem className="cursor-pointer" onClick={() => {
                const body = <>
                    <ul className="list-decimal list-inside">
                        <li className="bg-accent/20 mb-1 p-1 border-primary/5 border-2 rounded">
                            Set the google sheet tab name as the selection:<br />
                            <CopyToClipboard
                                text={`${toPlaceholderName(type)}:${selection}`} />
                        </li>
                        <li className="bg-accent/20 mb-1 p-1 border-primary/5 border-2 rounded">
                            Set the columns as the first row of cells in the sheet tab:<br />
                            <CopyToClipboard
                                text={`${Array.from(columns.keys()).join("\t")}`} />
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
                <kbd className="bg-accent rounded flex items-center space-x-1"><LazyIcon name="Sheet" className="h-4 w-6" /></kbd>
                &nbsp;Google Sheets
            </DropdownMenuItem>}
        </DropdownMenuContent>
    </DropdownMenu>
}