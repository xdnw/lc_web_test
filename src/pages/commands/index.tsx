import CmdList from "@/components/cmd/CmdList.tsx";
import {CM, CommandMap} from "@/utils/Command.ts";
import {withAsyncData} from "@/components/api/Wrapped";

const CmdListWithAsyncData = withAsyncData(CmdList, async() => CM, (data: CommandMap) => ({
    map: data,
    commands: Object.values(data.getCommands()),
    prefix: "/"
}));

export default function CommandsPage() {
    return (
        <CmdListWithAsyncData />
    );
}