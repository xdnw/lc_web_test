

import {useCallback} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {LOGOUT} from "@/lib/endpoints";
import {CopoToClipboardTextArea} from "../../components/ui/copytoclipboard";
import {useDialog} from "../../components/layout/DialogContext";
import EndpointWrapper from "@/components/api/bulkwrapper";

export function LogoutComponent() {
    const { showDialog } = useDialog();

    const logoutCallback = useCallback(() => {
        console.log("Logging out");
        // Clear localStorage
        window.localStorage.clear();

        // Clear cookies
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
    }, []);

    return <EndpointWrapper endpoint={LOGOUT} args={{}}
    handle_error={(error) => {
        console.log("Logout failed");
        logoutCallback();
        showDialog("Logout Failed", <>
            Failed to logout. Please try again, try a different login method, or contact support.
            <div className="relative overflow-auto">
                <CopoToClipboardTextArea text={error.message}/>
            </div>
        </>, false);
    }}>
        {({data}) => {
            console.log("Logout successful");
            logoutCallback();
            return <>Logged out Successfully!<br/>
                <Button variant="outline" size="sm" className='border-slate-600' asChild>
                    <Link to={`${process.env.BASE_PATH}home`}>Return Home</Link></Button></>
        }}
    </EndpointWrapper>
}

export default function LogoutPage() {
    return (
        <LogoutComponent />
    );
}