import { GLOBALSTATS } from "../../lib/endpoints.js";
import { CoalitionGraphs } from "../../lib/apitypes.js";
import React from "react";
import { CoalitionGraphComponent } from "./SimpleChart.js";
import EndpointWrapper from "@/components/api/bulkwrapper.js";

export default function ColMilGraph() {
    return <>
        {/*tailwind display large*/}
        <h1 className="text-4xl text-center font-bold">Coalition Militarization</h1>
        <EndpointWrapper endpoint={GLOBALSTATS} args={{
            metrics: "SOLDIER_PCT,TANK_PCT,AIRCRAFT_PCT,SHIP_PCT",
            start: "300d",
            end: "0d",
            topX: "50"
        }}>
            {({ data: graphs }) => {
                return (
                    <div className="container">
                        {graphs.spheres.map((graph) => (
                            <CoalitionGraphComponent key={graph.name} graph={graph} type="LINE" />
                        ))}
                    </div>
                );
            }
            }
        </EndpointWrapper>
    </>
}