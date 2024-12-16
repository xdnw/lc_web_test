import LoginPickerPage from "@/pages/login_picker";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import versusImage from '@/assets/versus.jpg';
import sheetImage from '@/assets/sheet.jpg';
import graphImage from '@/assets/graph.png';
import chestImage from '@/assets/chest.png';
import mediaImage from '@/assets/media2.png';
import {useDialog} from "../../components/layout/DialogContext";
import React from "react";

const _cardTemplates: {
    [key: string]: {
        ad: boolean;
        img: string;
        desc: string;
        subtitle: string;
        invite: string;
        label: string;
        bg: string;
    };
} = {
    "wars": {
        img: versusImage,
        ad: false,
        desc: "Browse a variety of tables and graphs for our featured set of ongoing and historical alliance conflicts. Data is available to download in CSV format.",
        subtitle: "Alliance Conflicts",
        invite: "https://wars.locutus.link/conflicts",
        label: "View Conflicts",
        bg: "#BB66CC",
    },
    "tables": {
        img: sheetImage,
        ad: false,
        desc: "Browse templates or create your custom table from a variety of game data. Share or export options available.",
        subtitle: "Table Builder",
        invite: "/custom_table",
        label: "Open Editor",
        bg: "#FFC929",
    },
    "charts": {
        img: graphImage,
        ad: false,
        desc: "Browse templates or create your custom chart from a variety of game data. Share or export options available.",
        subtitle: "Chart Viewer",
        invite: "/edit_graph",
        label: "View Charts",
        bg: "#FFC929",
    },
    "raid": {
        img: chestImage,
        ad: false,
        desc: "Find raidable nations in your score range",
        subtitle: "Raid Finder",
        invite: "/raid",
        label: "Raid Finder",
        bg: "#FFC929",
    },
    "1244684694956675113": {
        img: mediaImage,
        ad: true,
        desc: "Get breaking news about ongoing conflicts and share in their discussions. Available on the Media discord server.",
        subtitle: "Updates & Discussions",
        invite: "https://discord.gg/aNg9DnzqWG",
        label: "Join Now!",
        bg: "#111",
    },
    // // loading image
    // "0": {
    //     img: "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif",
    //     ad: false,
    //     desc: "Loading...",
    //     subtitle: "Loading...",
    //     invite: "#",
    //     bg: "#EEE",
    // },
};

export default function Home() {
    const { showDialog } = useDialog();

    return <>
        <LoginPickerPage/>
        <div className="themeDiv bg-opacity-10 rounded p-2 mt-4">
            <h1 className="text-2xl font-bold">Featured Content</h1>
            <div className="flex flex-wrap">
                {Object.keys(_cardTemplates).map((key) => {
                    const template = _cardTemplates[key];
                    return (
                        <div key={key} className="flex items-center me-1 mb-1">
                            <Card className="mx-auto relative rounded-lg" style={{width: '18rem'}}>
                                <CardHeader className="card-header">
                                    <div className="relative">
                                    <img
                                        src={template.img}
                                        style={{background: template.bg}}
                                        className="h-36 w-72 object-fill block mx-auto rounded"
                                        alt="..."
                                    />
                                    {template.ad && <kbd className="bg-blue-400/50 text-sm rounded-lg px-2 py-0.5 absolute top-1 right-1">Ad</kbd>}
                                    </div>
                                    <CardTitle className="card-title p-2">
                                        {template.subtitle}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="card-body" style={{height: '6.5rem'}}>
                                    <CardDescription className="card-text">{template.desc}</CardDescription>
                                </CardContent>
                                <CardFooter className="card-footer">
                                    <Button variant="outline" size="sm" className='border-slate-800/70' asChild><Link to={template.invite}>{template.label}</Link></Button>

                                </CardFooter>
                            </Card>
                        </div>
                    );
                })}
            </div>
        </div>
    </>
}