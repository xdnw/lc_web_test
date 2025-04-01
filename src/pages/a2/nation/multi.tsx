import {Link, useParams} from "react-router-dom";
import {MULTI_BUSTER} from "../../../lib/endpoints";
import {getQueryParams} from "../../../lib/utils";
import Timestamp from "../../../components/ui/timestamp";
import React from "react";
import { Button } from "@/components/ui/button";
import EndpointWrapper from "@/components/api/bulkwrapper";
import { TableWith2DData } from "@/pages/custom_table/TableWith2dData";

export function renderLink(id: number, name: string | number, type: 'nation' | 'alliance', banned: string | undefined, path?: string) {
    if (id == 0) return "None";
    if (id == -1) return "N/A";
    if (!name) name = type + ":" + id;
    if (type == 'nation') {
        if (banned) {
            name = "&#x3C;&#x3C;BANNED&#x3E;&#x3E; " + name;
        }
    }
    return path === undefined ? `[${name}](https://politicsandwar.com/${type}/id=${id})` : `[${name}](${process.env.BASE_PATH}#/${path}/${id})`;
}

export default function MultiBuster() {
    const { nation } = useParams<{ nation: string }>();

    return <EndpointWrapper endpoint={MULTI_BUSTER} args={{nation: nation, forceUpdate: getQueryParams().get("update") ?? 'false'}}>
            {({data}) => {
                const networkColumns = ["ID", "Last Access From Shared IP", "Number Of Shared IPs", "Last Active Ms", "Alliance ID", "Date Created"];
                const networkRenderers = ["normal", 'time_ms', 'comma', 'time_ms', "normal", 'time_ms'];
                const networkData = Object.values(data.network).map((row) => [
                    renderLink(row.id, data.nationNames[row.id] ?? row.id, 'nation', data.bans[row.id], "multi"),
                    row.lastAccessFromSharedIP,
                    row.numberOfSharedIPs,
                    row.lastActiveMs,
                    renderLink(row.allianceId, data.allianceNames[row.allianceId] ?? row.allianceId, 'alliance', undefined, undefined),
                    row.dateCreated
                ]);

                const tradeColumns = ["Selling Nation", "Buying Nation", "Date Offered", "Resource", "Amount", "PPU"];
                const tradeRenderers = ["normal", "normal", 'time_ms', /* resource */ undefined, 'comma', 'comma'];
                const tradeData = data.trade.map((trade) => [
                    renderLink(trade.sellingNation, data.nationNames[trade.sellingNation] ?? trade.sellingNation, 'nation', data.bans[trade.sellingNation]),
                    renderLink(trade.buyingNation, data.nationNames[trade.buyingNation] ?? trade.buyingNation, 'nation', data.bans[trade.buyingNation]),
                    trade.dateOffered,
                    trade.resource,
                    trade.amount,
                    trade.ppu
                ]);

                return (
                    <>
                        <div className='themeDiv bg-opacity-10 p-2'>
                            Multi Buster info for: <a href={`https://politicsandwar.com/nation/id=${data.nationId}`}>{data.nationNames[data.nationId] ?? data.nationId}</a>
                            <br/>
                            Last updated: <Timestamp millis={data.dateFetched}/>
                            <hr className="my-1"/>
                            {data.dateFetched < Date.now() - 1000 * 60 * 60 * 24 && <Button variant="outline" size="sm" className='border-red-800/70' asChild><Link to={`?update=true`}>Update</Link></Button>}
                        </div>
                        <hr className="my-2"/>
                        <div className="themeDiv bg-opacity-10 rounded-t">
                            <h2 className="text-2xl w-full border-b border-secondary px-2 bg-primary/10">Shared Networks (Unique IDs)</h2>
                            <div className="p-2">
                                <TableWith2DData columns={networkColumns} data={networkData} renderers={networkRenderers} sort={{idx: 3, dir: "desc"}}/>
                            </div>
                        </div>
                        <div className="themeDiv bg-opacity-10 mt-2 rounded-t">
                            <h2 className="text-2xl w-full border-b border-secondary px-2 bg-primary/10">Same Network Trades</h2>
                            <div className="p-2">
                            <TableWith2DData columns={tradeColumns} data={tradeData} renderers={tradeRenderers} />
                            </div>
                        </div>
                    </>
                );
            }}
        </EndpointWrapper>
}