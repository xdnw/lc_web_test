import EndpointWrapper from "@/components/api/bulkwrapper";
import { TABLE } from "@/lib/endpoints";
import { useState } from "react";
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