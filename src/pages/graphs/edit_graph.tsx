import {CommonEndpoint} from "../../components/api/endpoint";
import {GraphType, WebGraph} from "../../components/api/apitypes";
import React, {useState} from "react";
import {ThemedChart} from "./SimpleChart";
import {ENDPOINTS, TRADEPRICEBYDAY} from "../../components/api/endpoints";
import {Button} from "../../components/ui/button";
import {Link, useParams} from "react-router-dom";


type EndpointArgs = { [key: string]: string | string[] | undefined };
type GraphEndpoint = CommonEndpoint<WebGraph, EndpointArgs, EndpointArgs>;
const GRAPH_ENDPOINTS = ENDPOINTS.filter(f => f.endpoint.typeName === "WebGraph")
    .reduce((acc, endpoint) => {
        acc[endpoint.endpoint.name.toLowerCase()] = endpoint as GraphEndpoint;
        return acc;
    }, {} as { [key: string]: GraphEndpoint });

export function ParamEditGraph() {
    const {type} = useParams<{ type: string }>();
    const selected = type ? GRAPH_ENDPOINTS[type.toLowerCase()] : undefined;
    if (!selected) {
        return <div className="container themeDiv bg-opacity-10 p-2 rounded mt-2">
            <h1 className="text-xl font-bold mb-2">Invalid Graph Option <kbd
                className="bg-background p-1 rounded">{type ? type : "undefined"}</kbd></h1>
            <p className="mb-2">Please select one of the options below</p>
            <ul className="list-disc pl-5">
                {Object.values(GRAPH_ENDPOINTS).map(endpoint => (
                    <li key={endpoint.endpoint.name} className="mb-1">
                        <Link className="text-blue-600 hover:text-blue-800 underline"
                              to={`${process.env.BASE_PATH}edit_graph/${endpoint.endpoint.name}`}>{endpoint.endpoint.url}</Link>
                    </li>
                ))}
            </ul>
        </div>
    }
    return <>
        <EditGraph endpoint={selected}/>
    </>
}

export default function EditGraph<U extends { [key: string]: string | string[] | undefined }, V extends { [key: string]: string | string[] | undefined }>(
    { endpoint, args }: {
    endpoint: CommonEndpoint<WebGraph, U, V>,
    args?: U
}) {
    const [graph, setGraph] = useState<WebGraph | null>(null);

    // Graph button, export button, share button
    return <div className="container themeDiv bg-opacity-10 p-2 rounded mt-2">
        <div className="mb-1">
        {endpoint.useForm({
            // default_values: {
            // },
            classes: "bg-destructive",
            label: "Generate Graph",
            handle_response: (graph) => {
                setGraph(graph);
                console.log("Setting graph", graph);
            }
        })}
            <Button variant="outline" size="sm" className="me-1">Export</Button>
            <Button variant="outline" size="sm" className="me-1">Share</Button>

        </div>
        <div className="w-full pt">
            {graph != null && <ThemedChart graph={graph}/>}
        </div>
    </div>
}