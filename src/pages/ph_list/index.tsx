import {CommandMap} from "@/utils/Command.ts";
import {useEffect, useState} from "react";
import {withCommands} from "@/utils/StateUtil.ts";
import CmdList from "@/components/cmd/CmdList.tsx";
import {useParams} from "react-router-dom";

export default function PlaceholdersList() {
    const { placeholder } = useParams<{ placeholder: string }>();
    console.log("Placeholder: ", placeholder);
    const [data, setData] = useState<CommandMap | null>(null);

    useEffect(() => {
        withCommands().then(f => {
            setData(f);
        });
    }, []);

    return (
        data && <CmdList map={data} commands={Object.values(data.getPlaceholderCommands(placeholder as string) || {})} prefix={"#"} />
    );
}