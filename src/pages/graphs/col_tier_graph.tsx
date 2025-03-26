import {GLOBALSTATS, GLOBALTIERSTATS} from "../../lib/endpoints.js";
import {CoalitionGraphs} from "../../lib/apitypes.js";
import React from "react";
import {CoalitionGraphComponent} from "./SimpleChart.js";
import EndpointWrapper from "@/components/api/bulkwrapper.js";

export function ColTierGraph() {
    return <>
        {/*tailwind display large*/}
        <h1 className="text-4xl text-center font-bold">Coalition Tiering</h1>
        <EndpointWrapper endpoint={GLOBALTIERSTATS} args={{
                metrics: "getNations",
                topX: "50",
                groupBy: "getCities",
                total: "true"
            }}>
            {({data: graphs}) => (
                <div className="container">
                    {graphs.spheres.map((graph) => (
                        <CoalitionGraphComponent key={graph.name} graph={graph} type="LINE"/>
                    ))}
                </div>
            )}
        </EndpointWrapper>
    </>
}