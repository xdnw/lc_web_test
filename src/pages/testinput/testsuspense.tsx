import EndpointWrapper, { BulkQueryWrapper } from "@/components/api/bulkwrapper";
import { Suspense, useEffect, useState } from "react";
import { FallbackProps, ErrorBoundary } from "react-error-boundary";
export default function TestSuspense() {
    const [endpoint] = useState("table");
    const [rawQuery] = useState({
        type: "DBNation",
        selection_str: "Borg",
        columns: ["{markdownUrl}", "{cities}"]
    });
    return (
        <>
            <div>
                Hello World
            </div>
            <EndpointWrapper endpoint={endpoint} query={rawQuery} cache={{ cache: "Cookie", duration: 5000 }}>
                {data => JSON.stringify(data)}
            </EndpointWrapper>
        </>
    );
}