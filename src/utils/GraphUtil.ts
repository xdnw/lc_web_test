import {WebGraph} from "../components/api/apitypes";
import {ENDPOINTS} from "../components/api/endpoints";
import {CommonEndpoint} from "../components/api/endpoint";

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