import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Settings} from "lucide-react";
import {Link} from "react-router-dom";
import React from "react";

export default function LoggedOutDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="m-0.5 h-7 w-7 rounded-[6px] [&_svg]:size-3.5">
                    <Settings className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all" />
                    <span className="sr-only">Profile menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>
                    <Link to={"/login"} className="w-full">Login</Link>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    );
}