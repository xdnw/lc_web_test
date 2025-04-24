import { ApiFormInputs } from "@/components/api/apiform";
import { WebUrl } from "@/lib/apitypes";
import { LOGIN_MAIL } from "@/lib/endpoints";
import { useCallback } from "react";

export default function NationPicker() {
    const setLocation = useCallback(({data}: {data: WebUrl}) => {
        window.location.href = data.url;
    }, []);
    return (
        <div className="p-4">
            <ApiFormInputs
                endpoint={LOGIN_MAIL}
                label="Send Code"
                handle_response={setLocation}
                message={<>
                    <h2 className="text-lg font-extrabold">Nation Select:</h2>
                    <p>
                        Select your nation using the dropdown below, then press the <kbd>Send Code</kbd> button to
                        receive a login
                        link via in-game mail<br />
                    </p>
                </>}
            />
        </div>
    )
}