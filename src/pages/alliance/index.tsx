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

import {useDialog} from "../../components/layout/DialogContext";
import {useRef} from "react";
import {TABLE} from "../../components/api/endpoints";
import {getQueryString, getUrl} from "../custom_table";
import { useParams } from "react-router-dom";

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
    const columns: string[] = ["{name}", "{id}", "{score}"];

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
                return JSON.stringify(newData);
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