import {LOGIN_MAIL} from "@/lib/endpoints";

export default function NationPicker() {
    return (
        <div className="p-4">
            {LOGIN_MAIL.useForm({
                label: "Send Code",
                message: <><h2 className="text-lg font-extrabold">Mail Login:</h2>
                    <p>
                        Select your nation using the dropdown below, then press the <kbd>Send Code</kbd> button to
                        receive a login
                        link via in-game mail<br/>
                    </p></>
            })}
        </div>
    )
}