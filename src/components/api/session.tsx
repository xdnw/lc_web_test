import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import CopyToClipboard from '../ui/copytoclipboard';
import { getDiscordAuthUrl } from '@/utils/Auth';
import { Button } from '../ui/button.tsx';
import { Link } from 'react-router-dom';
import { bulkQueryOptions } from '@/lib/queries.ts';
import { SESSION } from '@/lib/endpoints.ts';
import { QueryResult } from '@/lib/BulkQuery.ts';
import { WebSession } from '@/lib/apitypes.js';
import { useQuery } from '@tanstack/react-query';
import LazyIcon from '../ui/LazyIcon.tsx';

export function LoginPicker() {
    return (
        <div className="themeDiv p-2 ">
            <Tabs defaultValue="discord">
                <TabsList className='w-full'>
                    <TabsTrigger value="discord" className='w-full'>
                        <i className="bi bi-discord"></i> Discord OAuth
                    </TabsTrigger>
                    <TabsTrigger value="mail" className="w-full">
                        <i className="bi bi-envelope-fill"></i> Politics & War Mail
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="discord">
                    <div>
                        <p>On discord, use the Locutus command <CopyToClipboard text="/web" /></p>
                        <hr className="my-2" />
                        <Button variant="outline" size="sm" className='border-red-800/70' asChild><Link to={getDiscordAuthUrl()}><LazyIcon name="KeyRound" size={16} />&nbsp;Login via Discord OAuth</Link></Button>
                        <hr className="my-2" />
                        <b><u>What is discord?</u></b>
                        <p>Discord is a voice, video, and text chat app that's used to communicate and hang out with communities and friends.</p>
                        <p>Discord can be opened in browser or installed on your computer and mobile device.</p>
                        <Button variant="outline" size="sm" className='border-red-800/70' asChild><Link to="https://discord.com/download"><LazyIcon name="ExternalLink" size={16} />&nbsp;Download Discord</Link></Button>
                    </div>
                </TabsContent>
                <TabsContent value="mail">
                    <div>
                        <Button variant="outline" size="sm" className='border-red-800/70' asChild><Link className='' to={`${process.env.BASE_PATH}nation_picker`}>
                            <LazyIcon name="Mail" size={16} />
                            &nbsp;Send In-Game Mail</Link></Button>
                        <hr className="my-2" />
                        <h2 className='text-lg font-extrabold'>Here's what you need to do:</h2>
                        <ul className="list-decimal list-inside bg-secondary p-3 rounded">
                            <li>Click login and select your nation</li>
                            <li>You will be redirected to your in-game mail</li>
                            <li>Click the authentication link you were sent</li>
                        </ul>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default function SessionInfo() {
    const { data, error } = useQuery<QueryResult<WebSession>>(bulkQueryOptions(SESSION.endpoint, {}, true));

    if (!data?.data || data.error) {
        return <>
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error:&nbsp;</strong>
                <span className="block sm:inline">Could not fetch login data. {error?.message ?? data?.error ?? "Unknown Error"}</span>
            </div>
            <LoginPicker />
        </>
    }
    const session = data.data;
    return <div className="bg-light/10 border border-light/10 p-2 rounded relative">
        <table className="table-auto w-full border-separate border-spacing-y-1">
            <tbody>
                <tr className="bg-secondary">
                    <td className="px-1 py-1 bg-secondary">User</td>
                    <td className="px-1 py-1 bg-secondary">
                        {session.user_icon && <img src={session.user_icon} alt={session.user_name}
                            className="w-4 h-4 inline-block mr-1" />}
                        {session.user_name ? session.user_name + " | " : ""}
                        {session.user ? session.user : "N/A"}
                    </td>
                </tr>
                <tr className="bg-secondary">
                    <td className="p-1">Nation</td>
                    <td className="p-1">
                        <div className="relative">
                            {session.nation ? <Link className="text-blue-600 hover:text-blue-800 underline"
                                to={`https://politicsandwar.com/nation/id=${session.nation}`}>
                                {session.nation_name ? session.nation_name : session.nation}
                            </Link> : "N/A"}
                            {session.alliance && " | "}
                            {session.alliance ? <Link className="text-blue-600 hover:text-blue-800 underline"
                                to={`https://politicsandwar.com/alliance/id=${session.alliance}`}>
                                {session.alliance_name ? session.alliance_name : session.alliance}
                            </Link> : ""}
                            {(session.nation && session.user) &&
                                <Button variant="outline" size="sm"
                                    className='border-slate-600 absolute top-0 right-0'
                                    asChild>
                                    <Link to={`${process.env.BASE_PATH}unregister`}>
                                        {session.registered ? session.registered_nation == session.nation ? "Unlink" : "!! Fix Invalid Registration !!" : "Link to Discord"}
                                    </Link>
                                </Button>
                            }
                        </div>
                    </td>
                </tr>
                <tr className="bg-secondary">
                    <td className="p-1">Expires</td>
                    <td className="p-1">
                        <div className="relative">
                            {session.expires}
                            <Button variant="outline" size="sm" className='border-slate-600 absolute top-0 right-0'
                                asChild>
                                <Link to={`${process.env.BASE_PATH}logout`}>Logout</Link></Button>
                        </div>
                    </td>
                </tr>
                <tr className="bg-secondary">
                    <td className="p-1">Guild</td>
                    <td className="p-1">
                        <div className="relative">
                            {session.guild_icon && <img src={session.guild_icon} alt={session.guild_name}
                                className="w-4 h-4 inline-block mr-1" />}
                            {session.guild_name ? session.guild_name + " | " : ""}
                            {session.guild ? session.guild : "N/A"}
                            <Button variant="outline" size="sm" className='border-slate-600 absolute top-0 right-0'
                                asChild>
                                <Link
                                    to={`${process.env.BASE_PATH}guild_select`}>{session.guild ? "Switch" : "Select"}</Link></Button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        {session.guild && true &&
            <Button variant="link" className='hover:text-blue-500 underline text-lg'
                asChild>
                <Link
                    to={`${process.env.BASE_PATH}guild_member`}>View Guild Member
                    Homepage<LazyIcon name="ChevronRight" /></Link></Button>
        }
    </div>
}