import SessionInfo, { LoginPicker } from "@/components/api/session";
import { hasToken } from "@/utils/Auth";

export default function LoginPickerPage() {
    if (!hasToken()) {
        return <LoginPicker />;
    }
    return (
        <SessionInfo />
    );

}