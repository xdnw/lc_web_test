// Extends #nationlist
// basic stats / link etc.
// dropdown for more stats
// wars
// bank records
// tier graph
// link to members
// link to brackets
// link to manage etc
// link to register to Locutus / invite Locutus - if not setup
//
//
//
// Hover shows ranking/graph

import {useDialog} from "../../../components/layout/DialogContext";
import {useRef} from "react";
import {TABLE} from "../../../components/api/endpoints";
import {getUrl} from "../../custom_table";
import { useParams } from "react-router-dom";
import { COMMANDS } from "@/lib/commands";
import {CM, PlaceholderArrayBuilder} from "../../../utils/Command";

export default function Alliance() {
    // return (
    //     <div>
    //         Hello World<br />
    //         <LazyTooltip content={ExampleContent} delay={500} lockTime={1000} unlockTime={500}>
    //             <span>This is a tooltip</span>
    //         </LazyTooltip>
    //     </div>
    // );
    const type = "Alliance";
    const { alliance } = useParams<{ alliance: string }>();

    // "{name}",
    //  "{id}",
    //  "{acronym}",
    //  "{flag}",
    //  "{forum_link}",
    //  "{discord_link}",
    //  "{wiki_link}",
    //  "{dateCreated}",
    //  "{color}",
    //  "{score}",
    //  "{EstimatedStockpileValue}",
    //  "{lootValue(1)}",
    //  "{revenueConverted}"
    const columns = CM.placeholders('DBAlliance')
        .array().add({cmd: 'getname'})
        .add({cmd: 'getid'})
        .add({cmd: 'getacronym'})
        .add({cmd: 'getflag'})
        .add({cmd: 'getforum_link'})
        .add({cmd: 'getdiscord_link'})
        .add({cmd: 'getwiki_link'})
        .add({cmd: 'getdatecreated'})
        .add({cmd: 'getcolor'})
        .add({cmd: 'getscore'})
        .add({cmd: 'getestimatedstockpilevalue'})
        .add({cmd: 'getlootvalue', args: {'score': '1'}})
        .add({cmd: 'getrevenueconverted'})
        .build();
        // show by resource

        // Some metrics (which link to the ranking/by turn data)
        // Some attributes which link to attribute ranking
        // Activity (this turn)
        // - Links to activity commands
        // Members: {members}/Taxable
        // Link to members list
        // Total Value
        // Projects
        // Cities
        // Infra
        // Land
        // Average MMR
        // - MMR by tier
        // - MMR sheet
        // - Ranking
        // - MMR by time
        // Average spies

        // Spies: Spy tier graph
        // Wars
        // Def slots free
        // Warcost
        // Projects

    const { showDialog } = useDialog();
    const url = useRef(getUrl(type, alliance as string, columns));
    return <>
        {TABLE.useDisplay({
            args: {
                type: type,
                selection_str: alliance,
                columns: columns,
            },
            render: (newData) => {
                return <>
                    {JSON.stringify(newData)}
                    <table>

                    </table>
                </>
            }
        })}
    </>
}

export function ExampleContent() {
    console.log("Rendering lazy content");
    return (
        <div>
            This is the text in the tooltip, that is rendered lazily
        </div>
    );
}