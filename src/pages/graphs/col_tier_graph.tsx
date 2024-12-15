import {GLOBALSTATS, GLOBALTIERSTATS} from "../../components/api/endpoints";
import {CoalitionGraphs} from "../../components/api/apitypes";
import React from "react";
import {CoalitionGraphComponent} from "./SimpleChart.js";

export function ColTierGraph() {
    return <>
        {/*tailwind display large*/}
        <h1 className="text-4xl text-center font-bold">Coalition Tiering</h1>
        {GLOBALTIERSTATS.useDisplay({
            // metrics?: string, topX?: string, groupBy?: string, total?: string
            args: {
                metrics: "getNations",
                topX: "50",
                groupBy: "getCities",
                total: "true"
            },
            render: (graphs: CoalitionGraphs) => {
                return (
                    <div className="container">
                        {graphs.spheres.map((graph, index) => (
                            <CoalitionGraphComponent key={index} graph={graph} type="SIDE_BY_SIDE_BAR"/>
                        ))}
                    </div>
                );
            }
        })}
    </>
}