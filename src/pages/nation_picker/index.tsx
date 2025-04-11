import { ApiFormInputs } from "@/components/api/apiform";
import { LOGIN_MAIL } from "@/lib/endpoints";

export default function NationPicker() {
    return (
        <div className="p-4">
            <ApiFormInputs
                endpoint={LOGIN_MAIL}
                label="Send Code"
                handle_response={({data}) => {
                    window.location.href = data.url;
                }}
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