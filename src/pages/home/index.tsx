import LoginPickerPage from "@/pages/login_picker";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
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
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqidXxyUAKKGxZfnYC2q1FUVKXWUaLSVCWRArWqHPsKQ&s",
        ad: false,
        desc: "Browse a variety of tables and graphs for our featured set of ongoing and historical alliance conflicts. Data is available to download in CSV format.",
        subtitle: "Featured Conflicts",
        invite: "https://wars.locutus.link/conflicts",
        label: "View Conflicts",
        bg: "#FFC929",
    },
    // // RON
    // "446601982564892672": {
    //     img: "https://static.wikia.nocookie.net/politicsandwar/images/b/be/Royal_Orbis_News.png",
    //     desc: "Get breaking news about ongoing conflicts and share in their discussions. Available on the Royal Orbis News discord server.",
    //     subtitle: "Updates & Discussions",
    //     invite: "https://discord.gg/royal-orbis-news",
    //     bg: "#235D90",
    // },
    // media
    "1244684694956675113": {
        img: "https://wars.locutus.link/media.png",
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
    return <>
        <LoginPickerPage/>
        <hr className="my-2"/>
        <h1 className="text-2xl font-bold">External Content</h1>
        <div className="flex flex-wrap">
            {Object.keys(_cardTemplates).map((key) => {
                const template = _cardTemplates[key];
                return (
                    <div key={key} className="flex items-center p-1">
                        <Card className="mx-auto" style={{width: '18rem'}}>
                            <CardHeader className="card-header">
                                <div className="relative">
                                <img
                                    src={template.img}
                                    style={{background: template.bg}}
                                    className="h-36 w-72 object-contain block mx-auto"
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
    </>
}