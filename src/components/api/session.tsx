import React, { useState } from 'react';
import { useData, useRegisterQuery } from "../cmd/DataContext";
import LoadingWrapper from "./loadingwrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import CopyToClipboard from '../ui/copytoclipboard';
import { getDiscordAuthUrl, hasToken } from '@/utils/Auth';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Mail, ExternalLink, KeyRound } from 'lucide-react';

interface SessionData {
    user: string | null;
    user_valid: boolean | null;
    nation: string | null;
    nation_valid: boolean | null;
    expires: string | null;
    guild: string | null;
    success?: boolean;
    message?: string;
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
                        <Button variant="outline" size="sm" className='border-red-800/70' asChild><Link className='' to="YOUR_MAIL_LOGIN_LINK"><Mail size={16}/>&nbsp;Send In-Game Mail</Link></Button>
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
    useRegisterQuery("session", {});
    const { data, loading, error } = useData<{ session: SessionData }>();

    return (
        <LoadingWrapper
            loading={loading}
            error={data?.session?.message ?? data?.message ?? error}
            data={data?.session?.expires ? data?.session ?? null : null}
            render={(session) => (
                <table>
                    <tbody>
                        <tr>
                            <td>User</td>
                            <td>{session.user ? session.user : "N/A"}</td>
                        </tr>
                        <tr>
                            <td>User Valid</td>
                            <td>{session.user_valid ? session.user_valid.toString() : "N/A"}</td>
                        </tr>
                        <tr>
                            <td>Nation</td>
                            <td>{session.nation ? session.nation : "N/A"}</td>
                        </tr>
                        <tr>
                            <td>Nation Valid</td>
                            <td>{session.nation_valid ? session.nation_valid.toString() : "N/A"}</td>
                        </tr>
                        <tr>
                            <td>Expires</td>
                            <td>{session.expires}</td>
                        </tr>
                        <tr>
                            <td>Guild</td>
                            <td>{session.guild ? session.guild : "N/A"}</td>
                        </tr>
                    </tbody>
                </table>
            )}
            renderError={(error) =>  <>
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <strong class="font-bold">Error:&nbsp;</strong>
                    <span class="block sm:inline">Could not fetch login data. {error}</span>
                </div>
                <LoginPicker /> 
            </>
        }
        />
    );
}