import {GLOBALSTATS} from "../../lib/endpoints.js";
import {CoalitionGraphs} from "../../lib/apitypes.js";
import React from "react";
import {CoalitionGraphComponent} from "./SimpleChart.js";

export function ColMilGraph() {
    return <>
        {/*tailwind display large*/}
        <h1 className="text-4xl text-center font-bold">Coalition Militarization</h1>
        {GLOBALSTATS.useDisplay({
            // {metrics: string, start: string, end: string, topX: string}
            args: {
                metrics: "SOLDIER_PCT,TANK_PCT,AIRCRAFT_PCT,SHIP_PCT",
                start: "300d",
                end: "0d",
                topX: "50"
            },
            render: (graphs: CoalitionGraphs) => {
                // graphs.spheres is CoalitionGraph[]
                // CoalitionGraph is
                //     name: string;
                //     alliances: { [index: string]: number };
                //     overall?: WebGraph;
                //     by_alliance: { [index: string]: WebGraph };
                // generate section for each, with title, then graphs
                // main graph at top, dropdown (hidden class toggle) for each alliance
                return (
                    <div className="container">
                        {graphs.spheres.map((graph, index) => (
                            <CoalitionGraphComponent key={index} graph={graph} type="LINE"/>
                        ))}
                    </div>
                );
            }
        })}
    </>
}