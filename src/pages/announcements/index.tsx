import { Link } from "react-router-dom";
import {
    ANNOUNCEMENT_TITLES,
    READ_ANNOUNCEMENT,
    UNREAD_ANNOUNCEMENT,
} from "@/lib/endpoints";
import { PaginatedList } from "@/components/ui/pagination.tsx";
import { useRef, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { useDialog } from "../../components/layout/DialogContext";
import { WebAnnouncement } from "../../lib/apitypes";
import EndpointWrapper from "@/components/api/bulkwrapper";
import { ApiFormInputs } from "@/components/api/apiform";
import { QueryResult } from "@/lib/BulkQuery";
import { useQueryClient } from "@tanstack/react-query";

export default function Announcements() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const entries = useRef<WebAnnouncement[] | null>(null);

    return (
        <>
            <Button variant="outline" size="sm" asChild><Link to={`${process.env.BASE_PATH}guild_member`}><ChevronLeft className="h-4 w-4" />Back</Link></Button>
            <EndpointWrapper endpoint={ANNOUNCEMENT_TITLES} args={{ read: "true" }}>
                {({ data }) => {
                    if (entries.current === null) {
                        entries.current = data.values;
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
                                        <Read announcementId={announcement.id} title={announcement.title} /> :
                                        <Unread announcementId={announcement.id} title={announcement.title} />}
                                </td>
                            </tr>
                        }
                            parent={({ children }) => <table className="min-w-full divide-y">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">Title</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-solid dark:bg-gray-900">
                                    {children}
                                </tbody>
                            </table>}
                            perPage={4} currentPage={currentPage} onPageChange={setCurrentPage} />
                    )
                }
                }
            </EndpointWrapper>
        </>
    )
}

export function Read({ announcementId, title }: { announcementId: number, title: string }) {
    const { showDialog } = useDialog();
    const queryClient = useQueryClient();

    return (
        <ApiFormInputs
            endpoint={READ_ANNOUNCEMENT}
            default_values={{ ann_id: announcementId + "" }}
            label="Mark Read"
            classes="absolute top-0 right-0 h-5 mt-0.5 border-0"
            handle_response={(data) => {
                showDialog("Marked as read", <>Marked {title} as read</>);

                // Update cache instead of mutating props
                queryClient.setQueryData(
                    [ANNOUNCEMENT_TITLES.endpoint.name, { read: "true" }],
                    (oldData: QueryResult<WebAnnouncement[]>) => {
                        const newData = oldData.clone();
                        if (newData.data) {
                            newData.data = newData.data.map((item: WebAnnouncement) =>
                                item.id === announcementId
                                    ? { ...item, active: false }
                                    : item
                            );
                        }
                        return newData;
                    }
                );
            }} />
    );
}

export function Unread({ announcementId, title }: { announcementId: number, title: string }) {
    const { showDialog } = useDialog();
    const queryClient = useQueryClient();

    return (
        <ApiFormInputs
            endpoint={UNREAD_ANNOUNCEMENT}
            default_values={{ ann_id: announcementId + "" }}
            label="Mark Unread"
            classes="absolute top-0 right-0 h-5 mt-0.5 border-0"
            handle_response={({ data }) => {
                showDialog("Marked as unread", <>Marked {title} as unread</>);

                // Update cache instead of mutating props
                queryClient.setQueryData(
                    [ANNOUNCEMENT_TITLES.endpoint.name, { read: "true" }],
                    (oldData: QueryResult<WebAnnouncement[]>) => {
                        const newData = oldData.clone();
                        if (newData.data) {
                            newData.data = newData.data.map((item: WebAnnouncement) =>
                                item.id === announcementId
                                    ? { ...item, active: true }
                                    : item
                            );
                        }
                        return newData;
                    }
                );
            }}
        />
    );
}