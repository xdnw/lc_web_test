import React from 'react';
import { useData, useRegisterQuery } from "../cmd/DataContext";
import LoadingWrapper, {CacheType} from "./loadingwrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import CopyToClipboard from '../ui/copytoclipboard';
import { getDiscordAuthUrl } from '@/utils/Auth';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Mail, ExternalLink, KeyRound } from 'lucide-react';

interface SessionData {
    user: string | null;
    user_name?: string;
    user_icon?: string;
    user_valid: boolean | null;
    nation: string | null;
    nation_name?: string;
    alliance?: number | null;
    alliance_name?: string;
    nation_valid: boolean | null;
    expires: string | null;
    guild: string | null;
    guild_name?: string;
    guild_icon?: string;
}

export function LoginPicker() {
    return (
        <div className="p-4">
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
                        <Button variant="outline" size="sm" className='border-red-800/70' asChild><Link to={getDiscordAuthUrl()}><KeyRound size={16} />&nbsp;Login via Discord OAuth</Link></Button>
                        <hr className="my-2" />
                        <b><u>What is discord?</u></b>
                        <p>Discord is a voice, video, and text chat app that's used to communicate and hang out with communities and friends.</p>
                        <p>Discord can be opened in browser or installed on your computer and mobile device.</p>
                        <Button variant="outline" size="sm" className='border-red-800/70' asChild><Link className='' to="https://discord.com/download"><ExternalLink size={16}/>&nbsp;Download Discord</Link></Button>
                    </div>
                </TabsContent>
                <TabsContent value="mail">
                    <div>
                        <Button variant="outline" size="sm" className='border-red-800/70' asChild><Link className='' to={`${import.meta.env.BASE_URL}nation_picker`}><Mail size={16}/>&nbsp;Send In-Game Mail</Link></Button>
                        <hr className="my-2" />
                        <h2 className='text-lg font-extrabold'>Here's what you need to do:</h2>
                        <ol className="list-decimal list-inside bg-secondary p-3 rounded">
                            <li>Click login and select your nation</li>
                            <li>You will be redirected to your in-game mail</li>
                            <li>Click the authentication link you were sent</li>
                        </ol>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

export default function SessionInfo() {
    const queryId = useRegisterQuery("session", {});
    const { data, loading, error } = useData<SessionData>();
    return (
        <LoadingWrapper
            cache={{ cache_type: CacheType.Cookie, cookie_id: "lc_session", duration: 2592000 }}
            index={queryId}
            loading={loading}
            error={error}
            data={data}
            render={(session) => (
                <div className="p-2">
                <table className="table-auto w-full">
                    <tbody>
                    <tr className='bg-card'>
                        <td className="px-1 py-1 border-2 border-blue-500 border-opacity-75 md:border-opacity-50 bg-secondary">User</td>
                        <td className="px-1 py-1 border-2 border-blue-500 border-opacity-75 md:border-opacity-50 bg-secondary">
                            {session.user_icon && <img src={session.user_icon} alt={session.user_name}
                                                       className="w-4 h-4 inline-block mr-1"/>}
                            {session.user_name ? session.user_name + " | " : ""}
                            {session.user ? session.user : "N/A"}
                        </td>
                    </tr>
                    <tr className='bg-card'>
                        <td className="px-1 py-1 border-2 border-blue-500 border-opacity-75 md:border-opacity-50 bg-secondary">Nation</td>
                        <td className="px-1 py-1 border-2 border-blue-500 border-opacity-75 md:border-opacity-50 bg-secondary">
                            {session.nation ? <Link className="text-blue-600 hover:text-blue-800 underline" to={`https://politicsandwar.com/nation/id=${session.nation}`}>
                                {session.nation_name ? session.nation_name : session.nation}
                            </Link> : "N/A"}
                            {session.alliance && " | "}
                            {session.alliance ? <Link className="text-blue-600 hover:text-blue-800 underline" to={`https://politicsandwar.com/alliance/id=${session.alliance}`}>
                                {session.alliance_name ? session.alliance_name : session.alliance}
                            </Link> : ""}
                        </td>
                    </tr>
                    <tr className='bg-card'>
                        <td className="px-1 py-1 border-2 border-blue-500 border-opacity-75 md:border-opacity-50 bg-secondary">Expires</td>
                        <td className="px-1 py-1 border-2 border-blue-500 border-opacity-75 md:border-opacity-50 bg-secondary">{session.expires}</td>
                    </tr>
                    <tr className='bg-card'>
                        <td className="px-1 py-1 border-2 border-blue-500 border-opacity-75 md:border-opacity-50 bg-secondary">Guild</td>
                        <td className="px-1 py-1 border-2 border-blue-500 border-opacity-75 md:border-opacity-50 bg-secondary">
                            {session.guild_icon && <img src={session.guild_icon} alt={session.guild_name}
                                                        className="w-4 h-4 inline-block mr-1"/>}
                            {session.guild_name ? session.guild_name + " | " : ""}
                            {session.guild ? session.guild : "N/A"}
                            &nbsp;
                            <Button variant="outline" size="sm" className='border-red-800/70' asChild><Link
                                to={`${import.meta.env.BASE_URL}guild_select`}>{session.guild ? "Switch" : "Select"}</Link></Button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                    <hr className="my-2" />
                    <Button variant="outline" size="sm" className='border-red-800/70' asChild><Link
                        to={`${import.meta.env.BASE_URL}logout`}>Logout</Link></Button>
                </div>
                )}
            renderError={(error) => <>
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error:&nbsp;</strong>
                <span className="block sm:inline">Could not fetch login data. {error}</span>
                </div>
                <LoginPicker /> 
            </>
        }
        />
    );
}