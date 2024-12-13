import {Link} from "react-router-dom";
import {
    ANNOUNCEMENT_TITLES,
    READ_ANNOUNCEMENT,
    UNREAD_ANNOUNCEMENT,
} from "@/components/api/endpoints.tsx";
import {PaginatedList} from "@/components/ui/pagination.tsx";
import {useRef, useState} from "react";
import {ChevronLeft} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useDialog} from "../../components/layout/DialogContext";
import {WebAnnouncement} from "../../components/api/apitypes";

export default function Announcements() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const entries = useRef<WebAnnouncement[] | null>(null);
    const [rerender, setRerender] = useState(false);

    return (
        <>
            <Button variant="outline" size="sm" asChild><Link to={`${process.env.BASE_PATH}guild_member`}><ChevronLeft className="h-4 w-4" />Back</Link></Button>
            {ANNOUNCEMENT_TITLES.useDisplay({
                args: {read: "true"},
                render: (announcements) => {
                    if (entries.current === null) {
                        entries.current = announcements.values;
                    }
                    if (entries.current.length === 0) return (<div>No announcements</div>);
                    return (
                        <PaginatedList items={entries.current ?? []} render={(announcement) =>
                            <tr>
                                <td className={`h-6 relative px-1 break-normal text-sm text-gray-900 dark:text-gray-200 ${announcement.active ? "font-bold" : "text-black"}`}>
                                    <Link className="underline-offset-4 hover:underline active:text-primary/80" to={`${process.env.BASE_PATH}announcement/${announcement.id}`}>
                                    {announcement.title}
                                    </Link>
                                    {announcement.active ?
                                        <Read announcement={announcement} rerender={() => setRerender(!rerender)} /> :
                                        <Unread announcement={announcement} rerender={() => setRerender(!rerender)} />}
                                </td>
                            </tr>
                        }
                        parent={({children}) => <table className="min-w-full divide-y">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="px-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Title</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-solid dark:bg-gray-900">
                            {children}
                            </tbody>
                        </table>}
                        perPage={4} currentPage={currentPage} onPageChange={setCurrentPage}/>
                    )
                }
            })}
        </>
    )
}

export function Read({announcement, rerender}: {announcement: WebAnnouncement, rerender: () => void}) {
    const { showDialog } = useDialog();
    return READ_ANNOUNCEMENT.useForm({
        default_values: {ann_id: announcement.id + ""},
        label: "Mark Read",
        handle_response: (data) => {
            showDialog("Marked as read", <>Marked {announcement.title} as read</>);
            announcement.active = false;
            rerender();
        },
        classes: "absolute top-0 right-0 h-5 mt-0.5 border-0"
    });
}

export function Unread({announcement, rerender}: {announcement: WebAnnouncement, rerender: () => void}) {
    const { showDialog } = useDialog();
    return UNREAD_ANNOUNCEMENT.useForm({
        default_values: {ann_id: announcement.id + ""},
        label: "Unread",
        handle_response: (data) => {
            showDialog("Marked as unread", <>Marked {announcement.title} as unread</>);
            announcement.active = true;
            rerender();
        },
        classes: "absolute top-0 right-0 h-5 mt-0.5 border-0"
    });
}