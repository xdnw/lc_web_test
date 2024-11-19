import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Settings} from "lucide-react";
import React from "react";
import {Link} from "react-router-dom";
import {SESSION, WebSession} from "@/components/api/endpoints.tsx";

export default function LoggedInDropdown() {
    return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="m-0.5 h-7 w-7 rounded-[6px] [&_svg]:size-3.5">
                <Settings className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all" />
                <span className="sr-only">Profile Menu</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            {SESSION.useDisplay({
            args: {},
            render: (session) => (<>
                <DropdownMenuItem>
                    <Link className="w-full" to={`${import.meta.env.BASE_URL}guild_select`}>{session.guild ?
                        <SwitchGuild session={session}/> : "Select Guild"}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link to={"/logout"} className="w-full">
                        Logout</Link>
                </DropdownMenuItem>
            </>)})}
        </DropdownMenuContent>
    </DropdownMenu>);
}
export function SwitchGuild({session}: {session: WebSession}) {
    return <>
        {session.guild_icon && <img src={session.guild_icon} alt={session.guild_name} className="w-4 h-4 inline-block mr-1"/>}
        {session.guild_name ? session.guild_name : "guild:" + session.guild}
    </>
}