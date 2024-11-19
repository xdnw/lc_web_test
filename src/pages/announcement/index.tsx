import {Link, useParams} from "react-router-dom";
import {VIEW_ANNOUNCEMENT} from "@/components/api/endpoints.tsx";
import MarkupRenderer from "@/components/ui/MarkupRenderer.tsx";
import {Button} from "@/components/ui/button.tsx";
import React from "react";
import {ChevronLeft} from "lucide-react";

export function Announcement() {
    const { id } = useParams();

    return VIEW_ANNOUNCEMENT.useDisplay({
        args: {ann_id: id ?? ""},
        render: (data) => {
            return (
                <>
                <Button variant="outline" size="sm" asChild><Link to={`${import.meta.env.BASE_URL}announcements`}><ChevronLeft className="h-4 w-4" />Back</Link></Button>
                <div className="bg-accent/50 p-1">
                    <h1 className={"text-2xl font-bold"}>{data.title}</h1>
                    <hr className="my-2"/>
                    <MarkupRenderer content={data.content}  highlight={false}/>
                </div>
                </>
            )
        },
    })
}