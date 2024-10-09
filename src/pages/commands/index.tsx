import { withCommands } from '@/utils/StateUtil.ts';
import CmdList from "@/components/cmd/CmdList.tsx";
import {CommandMap} from "@/utils/Command.ts";
import {withAsyncData} from "@/utils/Wrapped.tsx";

const CmdListWithAsyncData = withAsyncData(CmdList, withCommands, (data: CommandMap) => ({
    map: data,
    commands: Object.values(data.getCommands()),
    prefix: "/"
}));

export default function CommandsPage() {
    return (
        <CmdListWithAsyncData />
    );
}