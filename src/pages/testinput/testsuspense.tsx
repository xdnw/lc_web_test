import EndpointWrapper, { BulkQueryWrapper } from "@/components/api/bulkwrapper";
import { TABLE } from "@/lib/endpoints";
import { Suspense, useEffect, useState } from "react";
import { FallbackProps, ErrorBoundary } from "react-error-boundary";
export default function TestSuspense() {
    const [endpoint] = useState(TABLE);
    const [rawQuery] = useState<{
        type?: string;
        selection_str?: string;
        columns?: string[] | string;
    }>({
        type: "DBNation",
        selection_str: "Borg",
        columns: ["{markdownUrl}", "{cities}"]
    });
    return (
        <>
            <div>
                Hello World
            </div>
            <EndpointWrapper endpoint={endpoint} args={rawQuery}>
                {({data}) => JSON.stringify(data)}
            </EndpointWrapper>
        </>
    );
}