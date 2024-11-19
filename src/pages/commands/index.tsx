import CmdList from "@/components/cmd/CmdList.tsx";
import {COMMAND_MAP, CommandMap} from "@/utils/Command.ts";
import {withAsyncData} from "@/utils/Wrapped.tsx";

const CmdListWithAsyncData = withAsyncData(CmdList, async() => COMMAND_MAP, (data: CommandMap) => ({
    map: data,
    commands: Object.values(data.getCommands()),
    prefix: "/"
}));

export default function CommandsPage() {
    return (
        <CmdListWithAsyncData />
    );
}