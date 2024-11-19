import React, {useState, useCallback, memo, useRef, useContext} from "react";
import Cookies from 'js-cookie';
import { clearStorage } from "@/utils/Auth.ts";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import {SESSION, SET_GUILD, SetGuild} from "@/components/api/endpoints.tsx";
import {ChevronLeft} from "lucide-react";
import {useData} from "@/components/cmd/DataContext.tsx";


const GuildPicker = () => {
    const [hasGuild, setHasGuild] = useState<boolean>(Cookies.get('lc_guild') != null);
    const [guildData, setGuildData] = useState<{ id: string, name: string, icon: string } | null>(null);
    const { refetch } = useData();

    const handleResponse = useCallback((data: SetGuild, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => {
        clearStorage('lc_session');
        Cookies.set('lc_guild', data.id);
        setTitle("Guild Set");
        setMessage(
            <div className="flex items-center">
                <img src={data.icon} alt="Guild Icon" className="w-8 h-8 mr-2" />
                <span>Selected guild with id {data.id} and name {data.name}</span>
            </div>
        );
        setShowDialog(true);

        refetch();

        setGuildData(data);
        setHasGuild(true);
    }, []);

    return (
        <>
        <Button variant="outline" size="sm" asChild>
            <Link to={`${import.meta.env.BASE_URL}home`}>
                <ChevronLeft className="h-4 w-4" />Home
            </Link>
        </Button>
        <div className="p-4 m-0">
            {hasGuild && <MemoizedGuildInfo hasGuild={hasGuild} guildData={guildData} setHasGuild={setHasGuild} />}
            <GuildForm handleResponse={handleResponse} />
            <hr className="my-2" />
            <div className="bg-accent p-2">
                <h1 className="text-lg font-bold">Don't see your server here? </h1>
                <Link className="text-blue-600 hover:text-blue-800 underline" to={`${process.env.BOT_INVITE}`}>Invite {process.env.APPLICATION}</Link> to your server,
                then see the <Link className="text-blue-600 hover:text-blue-800 underline" to={`${process.env.WIKI_URL}/initial_setup`}>Wiki</Link> for installation instructions.
            </div>
        </div>
        </>
    );
};

const GuildInfo = ({ hasGuild, guildData, setHasGuild }: { hasGuild: boolean, guildData: { id: string, name: string, icon: string } | null, setHasGuild: (value: boolean) => void }) => {
    const hasRenderedFetchGuildCard = useRef(false);

    return (
        <>
            {hasGuild && guildData ?
                <SelectedGuildInfo guildData={guildData} setHasGuild={setHasGuild} />
                : (!hasRenderedFetchGuildCard.current && <FetchGuildCard setHasGuild={setHasGuild} />)
            }
        </>
    );
};

const MemoizedGuildInfo = memo(GuildInfo);

const GuildForm = memo(({ handleResponse }: { handleResponse: (data: SetGuild, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void }) => {
    return SET_GUILD.useForm({
        message: <>
            <h2 className="text-lg font-extrabold">Guild Select:</h2>
            <p>
                Select your guild using the dropdown below, then press the <kbd>Submit</kbd> button<br />
            </p>
        </>,
        handle_response: handleResponse
    });
});

const SelectedGuildInfo = memo(({ guildData, setHasGuild }: { guildData: { id: string, name: string, icon: string } | null, setHasGuild: (value: boolean) => void }) => {
    if (!guildData) {
        return null;
    }
    return <GuildCard id={guildData.id} name={guildData.name} icon={guildData.icon} setHasGuild={setHasGuild} />;
});

const FetchGuildCard = memo(({ setHasGuild }: { setHasGuild: (value: boolean) => void }) => {
    const hasRenderedFetchGuildCard = useRef(false);

    if (hasRenderedFetchGuildCard.current) {
        return <>No guild</>;
    }

    hasRenderedFetchGuildCard.current = true;

    return <FetchGuildCardContent setHasGuild={setHasGuild} />;
});

const FetchGuildCardContent = memo(({ setHasGuild }: { setHasGuild: (value: boolean) => void }) => {
    return SESSION.useDisplay({
        args: {},
        render: (session) => (
            <>
                {session.guild && <GuildCard id={session.guild} name={session.guild_name} icon={session.guild_icon} setHasGuild={setHasGuild} />}
            </>
        )
    });
});

const GuildCard = memo(({ id, name, icon, setHasGuild }: { id: string | null, name: string | undefined, icon: string | undefined, setHasGuild: (value: boolean) => void }) => {
    const { refetch } = useData();

    return (
        <>
            {id && (
                <div className="bg-accent p-2 relative">
                    <h1 className="text-lg font-bold">Currently Selected</h1>
                    <p className="pb-1">
                        {icon && <img src={icon} alt={name} className="w-4 h-4 inline-block mr-1" />}
                        {name ? name + " | " : ""}
                        {id ? id : "N/A"}
                    </p>
                    <Button onClick={() => {
                        clearStorage('lc_guild');
                        clearStorage('lc_session');
                        refetch();
                        setHasGuild(false);
                    }} variant="outline" size="sm" className="border-slate-600 absolute top-2 right-2">
                        Remove
                    </Button>
                </div>
            )}
            <hr className="my-2" />
        </>
    );
});

export default GuildPicker;