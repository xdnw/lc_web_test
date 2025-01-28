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
import {getQueryString} from "../custom_table";

export default function Alliance() {
    // return (
    //     <div>
    //         Hello World<br />
    //         <LazyTooltip content={ExampleContent} delay={500} lockTime={1000} unlockTime={500}>
    //             <span>This is a tooltip</span>
    //         </LazyTooltip>
    //     </div>
    // );
    const { showDialog } = useDialog();
    const url = useRef(`${process.env.BASE_PATH}custom_table?${getQueryString({
        type: "Alliance",
        sel: "AA:Singularity",
        columns: ["{name}", "{id}", "{score}"],
        sort: sort.current
    })}`);
    return <>
        {TABLE.useDisplay({
            args: {
                type: type.current,
                selection_str: selection.current,
                columns: Array.from(columns.current.keys()),
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