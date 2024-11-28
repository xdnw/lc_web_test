import SessionInfo from "@/components/api/session.tsx";
import React from "react";
import {Link} from "react-router-dom";
import {clearStorage, getDiscordAuthUrl} from "@/utils/Auth.ts";
import {Button} from "@/components/ui/button.tsx";
import CopyToClipboard from "@/components/ui/copytoclipboard.tsx";
import {SESSION, UNREGISTER} from "@/components/api/endpoints.tsx";
import {useDialog} from "../../components/layout/DialogContext";
import {WebSession} from "../../components/api/apitypes";

export default function Unregister() {
    return (
        <>
            <div className="themeDiv bg-opacity-10 p-2 relative rounded mb-4">
            {SESSION.useDisplay({
                args: {},
                render: (session) => (<UnregisterComponent session={session} />
            )})}
            </div>
            <SessionInfo />
    </>);
}

export function UnregisterComponent({session}: {session: WebSession}) {
    if (session.nation && session.user) {
        if (session.registered) {
            if (session.registered_nation ?? 0 === session.nation) {
                return <UnregisterValid />
            } else {
                return <UnregisterInvalid session={session} />
            }
        } else {
            return <RegisterComponent />
        }
    } else {
        return <div>
            <h1 className="text-2xl font-bold">You are not registered</h1>
            <Button variant="outline" size="sm" className="border-slate-600" asChild>
                <Link
                    to={(session.nation ? getDiscordAuthUrl() : import.meta.env.BASE_URL + "nation_picker")}>
                    {session.nation ? "Add Discord" : "Add Nation"}
                </Link>
            </Button>
        </div>
    }
}

export function RegisterComponent() {
    const { showDialog } = useDialog();
    return <div>
        {UNREGISTER.useForm({
            label: "Link Accounts",
            message: <>
                <h1 className="text-2xl font-bold">Link Accounts?</h1>
                <p>
                    Your discord and nation accounts are not linked. Would you like to register them?
                </p>
            </>,
            handle_response: (data) => {
                clearStorage('lc_session');
                showDialog("Registered", "Successfully registered your discord and nation.", false);
            },
        })}
    </div>
}

export function UnregisterValid() {
    const { showDialog } = useDialog();
    return <div>
        {UNREGISTER.useForm({
            label: "Unlink Accounts",
            message: <>
                <h1 className="text-2xl font-bold">Already Registered</h1>
                You may unlink your nation from your discord user. It is recommended to logout and log back in to
                register a
                new user or nation.
            </>,
            handle_response: (data) => {
                clearStorage('lc_session');
                showDialog("Unregistered", "Successfully unlinked your discord and nation. It is recommended to logout and log back in to register a new user or nation.", false);
            },
        })}
    </div>
}

export function UnregisterInvalid({session}: {session: WebSession}) {
    const { showDialog } = useDialog();
    return <div>
        {UNREGISTER.useForm({
            label: "Unlink Accounts",
            message: <>
                <h1 className="text-2xl font-bold">Invalid Registration</h1>
                <p>
                    Your discord is registered to the nation <CopyToClipboard text={`${session.registered_nation}`}/>
                    but you are logged in as <CopyToClipboard text={`${session.nation_name}/${session.nation}`}/>
                </p>
                <p>
                    It is recommended to either unlink your current accounts, or sign out and log back in with the
                    correct accounts.
                </p>
            </>,
            handle_response: (data) => {
                clearStorage('lc_session');
                showDialog("Unregistered", "Successfully unlinked your discord and nation. It is recommended to logout and log back in to register a new user or nation.", false);
            },
        })}
        <Button variant="outline" size="sm" className='border-slate-600' asChild>
            <Link to={`${import.meta.env.BASE_URL}logout`}>Logout</Link></Button>
    </div>
}