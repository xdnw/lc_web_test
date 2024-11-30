import {
    AtSign,
    BookOpenText, Bug,
    CircleUserRound, EyeOff,
    Github,
    GitPullRequest,
    Infinity,
    Joystick, ListChecks, ListX,
    MessageSquareText
} from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-top border-card mt-0 pt-3 bg-secondary">
            <div className="container mx-auto">
                <div className="flex flex-wrap mx-4">
                    <div className="w-full md:w-1/3 px-4">
                        <img
                            src="https://cdn.discordapp.com/avatars/672237266940198960/0d78b819d401a8f983ab16242de195da.webp"
                            className="absolute" alt="Logo" width="18" height="18"/>
                        <h5 className="font-medium ml-4">{process.env.APPLICATION}</h5>
                        <hr className="my-2"/>
                        <ul className="list-none">
                            <li className="mb-2"><a href={process.env.REPOSITORY_URL}
                                                    className="text-blue-600 hover:text-blue-800 underline flex"><GitPullRequest
                                size={22}/>Source Code</a></li>
                            <li className="mb-2"><a href={process.env.WIKI_URL}
                                                    className="text-blue-600 hover:text-blue-800 underline flex"><BookOpenText
                                size={22}/>Wiki</a></li>
                            <li className="mb-2"><a href="https://locutus.link:8443/job/locutus/"
                                                    className="text-blue-600 hover:text-blue-800 underline flex"><Infinity
                                size={22}/>Jenkins</a></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 px-4">
                        <h5 className="font-medium m-0">Get in Touch</h5>
                        <hr className="my-2"/>
                        <ul className="list-none">
                            <li className="mb-2"><a href={process.env.REPOSITORY_URL + "/issues"}
                                                    className="text-blue-600 hover:text-blue-800 underline flex"><Github
                                size={22}/>Issue Tracker</a></li>
                            <li className="mb-2"><a href={"https://discord.gg/" + process.env.DISCORD_INVITE}
                                                    className="text-blue-600 hover:text-blue-800 underline flex"><MessageSquareText
                                size={22}/>Discord Server</a></li>
                            <li className="mb-2"><a href={"discord://discord.com/users/" + process.env.ADMIN_ID}
                                                    className="text-blue-600 hover:text-blue-800 underline flex"><CircleUserRound
                                size={22}/>Discord User</a></li>
                            <li className="mb-2"><a href={"https://politicsandwar.com/nation/id=" + process.env.ADMIN_NATION}
                                                    className="text-blue-600 hover:text-blue-800 underline flex"><Joystick
                                size={22}/>In-Game</a></li>
                            <li className="mb-2"><a href={"mailto:" + process.env.EMAIL}
                                                    className="text-blue-600 hover:text-blue-800 underline flex"><AtSign
                                size={22}/>Email</a></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 px-4">
                        <h5 className="font-medium m-0">Legal</h5>
                        <hr className="my-2"/>
                        <ul className="list-none">
                            <li className="mb-2"><a
                                href="https://github.com/xdnw/locutus/blob/master/LICENSE"
                                className="text-blue-600 hover:text-blue-800 underline flex"><ListX
                                size={22}/>License</a></li>
                            <li className="mb-2"><a
                                href="https://github.com/xdnw/locutus/blob/master/ToS.MD"
                                className="text-blue-600 hover:text-blue-800 underline flex"><ListChecks size={22}/>Terms
                                Of Service</a></li>
                            <li className="mb-2"><a
                                href="https://github.com/xdnw/locutus/blob/master/PRIVACY.MD"
                                className="text-blue-600 hover:text-blue-800 underline flex"><EyeOff size={22}/>Privacy
                                Policy</a></li>
                            <li className="mb-2"><a
                                href="https://github.com/xdnw/locutus/blob/master/SECURITY.md"
                                className="text-blue-600 hover:text-blue-800 underline flex"><Bug size={22}/>Vulnerability
                                Disclosure</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}