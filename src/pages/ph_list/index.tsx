import {COMMAND_MAP, CommandMap} from "@/utils/Command.ts";
import {useEffect, useState} from "react";
import CmdList from "@/components/cmd/CmdList.tsx";
import {useParams} from "react-router-dom";

export default function PlaceholdersList() {
    const { placeholder } = useParams<{ placeholder: string }>();
    console.log("Placeholder: ", placeholder);

    return (
        <CmdList map={COMMAND_MAP} commands={Object.values(COMMAND_MAP.getPlaceholderCommands(placeholder as string) || {})} prefix={"#"} />
    );
}