import { Link, useParams } from "react-router-dom";
import { VIEW_ANNOUNCEMENT } from "@/lib/endpoints";
import MarkupRenderer from "@/components/ui/MarkupRenderer.tsx";
import { Button } from "@/components/ui/button.tsx";
import EndpointWrapper from "@/components/api/bulkwrapper";
import LazyIcon from "@/components/ui/LazyIcon";

export default function Announcement() {
    const { id } = useParams();

    return <EndpointWrapper endpoint={VIEW_ANNOUNCEMENT} args={{ ann_id: id ?? "" }}>
        {({ data }) => {
            return (
                <>
                    <Button variant="outline" size="sm" asChild><Link to={`${process.env.BASE_PATH}announcements`}><LazyIcon name="ChevronLeft" className="h-4 w-4" />Back</Link></Button>
                    <div className="bg-accent/50 p-1">
                        <h1 className={"text-2xl font-bold"}>{data.title}</h1>
                        <hr className="my-2" />
                        <MarkupRenderer content={data.content} />
                    </div>
                </>
            )
        }}
    </EndpointWrapper>
}