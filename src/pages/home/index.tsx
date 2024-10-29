import SessionInfo, { LoginPicker } from "@/components/api/session";
import { DataProvider } from "@/components/cmd/DataContext";
import { hasToken } from "@/utils/Auth";

export default function Home() {
    if (!hasToken()) {
        return <LoginPicker />;
    }
    return (
        <DataProvider endpoint="query">
            <SessionInfo />
        </DataProvider>
    );

}