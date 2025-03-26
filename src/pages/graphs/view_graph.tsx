import {CommonEndpoint} from "../../components/api/endpoint";
import {WebGraph} from "../../lib/apitypes";
import React, {RefObject, useMemo, useRef} from "react";
import {Link, useParams} from "react-router-dom";
import {PickAnEndpoint} from "./edit_graph";
import {getQueryParams, queryParamsToObject} from "../../lib/utils";
import {ChartWithButtons} from "./SimpleChart";
import {getGraphEndpoints} from "../../utils/GraphUtil";
import {Button} from "../../components/ui/button";
import EndpointWrapper from "@/components/api/bulkwrapper";

export function ParamViewGraph() {
    const {type} = useParams<{ type: string }>();
    const selected = type ? getGraphEndpoints()[type.toLowerCase()] : undefined;
    const args = useRef(queryParamsToObject(getQueryParams()));
    if (!selected) {
        return <PickAnEndpoint/>
    }
    return <>
        <ViewGraph endpoint={selected} args={args}/>
    </>
}

export type GraphEndpoint = CommonEndpoint<WebGraph, { [key: string]: string | string[] | undefined }, { [key: string]: string | string[] | undefined }>;

type GraphViewUtilProps<U extends { [key: string]: string | string[] | undefined },
    V extends { [key: string]: string | string[] | undefined }> = {
    endpoint: CommonEndpoint<WebGraph, U, V>;
    args: U;
};

export function StaticViewGraph
<U extends { [key: string]: string | string[] | undefined },
    V extends { [key: string]: string | string[] | undefined }>(
    { endpoint, args }: GraphViewUtilProps<U, V>
): React.ReactNode {
    // Cast the endpoint to a GraphEndpoint.
    const graphEndpoint = endpoint as GraphEndpoint;
    // Wrap the args in a mutable ref to match ViewGraph prop requirements.
    const argsRef: React.RefObject<U> = useRef(args);
    return <ViewGraph endpoint={graphEndpoint} args={argsRef} />;
}

export default function ViewGraph<U extends { [key: string]: string | string[] | undefined }, V extends { [key: string]: string | string[] | undefined }>(
    { endpoint, args }: {
        endpoint: CommonEndpoint<WebGraph, U, V>,
        args: React.RefObject<{ [key: string]: string | string[] | undefined }>
    }) {
    return <EndpointWrapper<WebGraph, U, V> endpoint={endpoint} args={Object.fromEntries(Object.entries(args.current).filter(([key]) => key in endpoint.endpoint.argsLower)) as U}>
        {({data}) => {
                return <>
                    <Button variant="outline" size="sm" className="me-1 no-underline" asChild>
                        <Link to={`${process.env.BASE_PATH}edit_graph/${endpoint.endpoint.name}`}>Edit</Link>
                    </Button>
                    <ChartWithButtons graph={data} endpointName={endpoint.endpoint.name} usedArgs={args}/>
                </>
            }
        }
    </EndpointWrapper>;
}