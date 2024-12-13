import {Link, useParams} from "react-router-dom";


import Cookies from 'js-cookie';
import {clearStorage} from "@/utils/Auth.ts";
import {Button} from "@/components/ui/button.tsx";
import {SET_TOKEN} from "@/components/api/endpoints.tsx";
import {CopoToClipboardTextArea} from "../../components/ui/copytoclipboard";
import { useDialog } from "@/components/layout/DialogContext";
import {useSession} from "../../components/api/SessionContext";

export function LoginComponent() {
    const { token } = useParams<{ token: string }>();
    const { showDialog } = useDialog();
    const { refetchSession } = useSession();

    return SET_TOKEN.useDisplay({
        args: {"token": token ?? ""},
        render: (login) => {
            Cookies.set('lc_token_exists', Math.random().toString(36).substring(2));
            clearStorage('lc_session');
            refetchSession();
            return <>Logged in Successfully!<br/>
                <Button variant="outline" size="sm" className='border-slate-600' asChild>
                    <Link to={`${process.env.BASE_PATH}home`}>Return Home</Link></Button></>
        },
        renderError: (error) => {
            showDialog("Login Failed", <>
                Failed to set login token. Please try again, try a different login method, or contact support.
                <div className="relative overflow-auto">
                    <CopoToClipboardTextArea text={error}/>
                </div>
            </>, false);
            return (<>
                Login failed!
            </>);
        }
    });
}

export default function LoginPage() {
    return (
        <LoginComponent />
    );
}