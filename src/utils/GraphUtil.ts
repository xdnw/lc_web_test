import { CommonEndpoint } from "@/lib/BulkQuery";
import {WebGraph} from "../lib/apitypes";
import {ENDPOINTS} from "../lib/endpoints";

type EndpointArgs = { [key: string]: string | string[] | undefined };
type GraphEndpoint = CommonEndpoint<WebGraph, EndpointArgs, EndpointArgs>;

let graphEndpointsCache: { [key: string]: GraphEndpoint } | null = null;

export function getGraphEndpoints(): { [key: string]: GraphEndpoint } {
    if (!graphEndpointsCache) {
        graphEndpointsCache = ENDPOINTS
            .sort((a, b) => a.endpoint.name.localeCompare(b.endpoint.name))
            .filter(f => f.endpoint.typeName === "WebGraph")
            .reduce((acc, endpoint) => {
                acc[endpoint.endpoint.name.toLowerCase()] = endpoint as GraphEndpoint;
                return acc;
            }, {} as { [key: string]: GraphEndpoint });
    }
    return graphEndpointsCache;
}