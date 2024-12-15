import {GLOBALSTATS, GLOBALTIERSTATS, TRADEPRICEBYDAYJSON} from "../../components/api/endpoints";
import {CoalitionGraphs, WebGraph} from "../../components/api/apitypes";
import React from "react";
import SimpleChart, {CoalitionGraphComponent, ThemedChart} from "./SimpleChart.js";

export function TradePriceByDay() {
    return <>
        <h1 className="text-4xl text-center font-bold">Coalition Tiering</h1>
        {TRADEPRICEBYDAYJSON.useDisplay({
              args: {
              resources: "*",
              days: "300"
          },
              render: (graph: WebGraph) => {
              return <div className="">
                <ThemedChart graph={graph} type='LINE' />
                </div>
            }
        })}
    </>
}