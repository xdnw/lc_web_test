import {CommonEndpoint} from "../../components/api/endpoint";
import {WebGraph} from "../../components/api/apitypes";
import {useRef, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {ChartWithButtons} from "./SimpleChart";
import {getGraphEndpoints} from "../../utils/GraphUtil";


export function ParamEditGraph() {
    const {type} = useParams<{ type: string }>();
    const selected = type ? getGraphEndpoints()[type.toLowerCase()] : undefined;
    if (!selected) {
        return <PickAnEndpoint/>
    }
    return <>
        <h1 className="text-4xl text-center font-bold">
            {selected.endpoint.url.split(/(?=[A-Z])/)
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
        </h1>
        <EditGraph endpoint={selected}/>
    </>
}

export function PickAnEndpoint() {
    return <div className="container themeDiv bg-opacity-10 p-2 rounded mt-2">
        <h1 className="text-xl font-bold mb-2">Pick a Graph Option</h1>
        <p className="mb-2">Please select one of the options below</p>
        <ul className="list-disc pl-5">
            {Object.values(getGraphEndpoints()).map(endpoint => (
                <li key={endpoint.endpoint.name} className="mb-1">
                    <Link className="text-blue-600 hover:text-blue-800 underline"
                          to={`${process.env.BASE_PATH}edit_graph/${endpoint.endpoint.name}`}>
                        {endpoint.endpoint.url.split(/(?=[A-Z])/)
                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                            .join(' ')}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
}

export default function EditGraph<U extends { [key: string]: string | string[] | undefined }, V extends { [key: string]: string | string[] | undefined }>(
    { endpoint, args }: {
    endpoint: CommonEndpoint<WebGraph, U, V>,
    args?: U
}) {
    const [graph, setGraph] = useState<WebGraph | null>(null);
    const usedArgs = useRef<{ [key: string]: string | string[] | undefined }>(args || {});
    return <div className="container themeDiv bg-opacity-10 p-2 mt-2">
        <pre className="whitespace-pre-wrap">{endpoint.endpoint.desc}</pre>
        {endpoint.endpoint.desc && <hr className="my-2"/>}
        {endpoint.useForm({
            showArguments: Object.keys(endpoint.endpoint.args),
            classes: "bg-destructive",
            label: "Generate Graph",
            handle_submit: (args) => {
                usedArgs.current = args;
                return true;
            },
            handle_response: (graph) => {
                setGraph(graph);
                console.log("Setting graph", graph);
            }
        })}
        {graph != null && <ChartWithButtons graph={graph} endpointName={endpoint.endpoint.name} usedArgs={usedArgs}/>}
    </div>
}