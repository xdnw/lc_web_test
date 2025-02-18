import {CM} from "@/utils/Command.ts";
import CmdList from "@/components/cmd/CmdList.tsx";
import {useParams} from "react-router-dom";

export default function PlaceholdersList() {
    const { placeholder } = useParams<{ placeholder: string }>();

    return (
        <CmdList commands={Object.values(CM.getPlaceholderCommands(placeholder as string) || {})} prefix={"#"} />
    );
}