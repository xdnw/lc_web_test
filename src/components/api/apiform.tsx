import React, {ReactNode, useEffect, useRef, useState} from "react";
import {CommandStoreType, createCommandStore, createCommandStoreWithDef} from "@/utils/StateUtil.ts";
import {hasToken} from "@/utils/Auth.ts";
import {Link} from "react-router-dom";
import DOMPurify from "dompurify";
import {Button} from "@/components/ui/button.tsx";
import {UNPACKR} from "@/lib/utils.ts";
import {useDialog} from "../layout/DialogContext";

interface FormInputsProps {
    setOutputValue: (name: string, value: string) => void;
}

interface ApiFormProps<T, A extends { [key: string]: string }> {
    requireLogin?: boolean;
    message: ReactNode;
    endpoint: string;
    label?: ReactNode;
    required?: string[];
    default_values?: { [key: string]: string | string[] };
    form_inputs: React.ComponentType<FormInputsProps>;
    handle_response?: (data: T) => void;
    handle_submit?: (data: A) => boolean;
    handle_loading?: () => void;
    handle_error?: (error: string) => void;
    classes?: string;
}

function ApiForm<T, A extends { [key: string]: string }>({
     requireLogin = false,
     message,
     endpoint,
     label = "submit",
     required = [],
     default_values,
     form_inputs: FormInputs,
     handle_response,
     handle_submit,
     handle_loading,
     handle_error,
     classes
 }: ApiFormProps<T, A>) {
    const commandStore = useRef(default_values && Object.keys(default_values).length ? createCommandStoreWithDef(default_values) : createCommandStore());

    if (requireLogin && !hasToken()) {
        return <>
            Please login first
            <br />
            <Button variant="outline" size="sm" className='border-red-800/70' asChild><Link to={`${process.env.BASE_PATH}home`}>Login</Link></Button>
        </>
    }

    return <>
        {message}
        {message && required && required.length > 0 && <hr className="my-2"/> }
        {required && required.length > 0 && <>
            <FormInputs setOutputValue={commandStore.current((state) => state.setOutput)} />
            <hr className="my-2"/>
        </>}
        <ApiFormHandler endpoint={endpoint}
                        store={commandStore.current}
                        label={label}
                        required={required}
                        handle_response={handle_response}
                        handle_submit={handle_submit}
                        handle_loading={handle_loading}
                        handle_error={handle_error}
                        classes={classes}/>
    </>
}

const areEqual = <T, A extends { [key: string]: string }>(prevProps: ApiFormProps<T, A>, nextProps: ApiFormProps<T, A>) => {
    const keys = Object.keys(prevProps) as (keyof ApiFormProps<T, A>)[];
    for (const key of keys) {
        if (prevProps[key] !== nextProps[key]) {
            console.log(`Prop '${key}' changed:`, prevProps[key], nextProps[key]);
            return false;
        }
    }
    return true;
};

export default React.memo(ApiForm, areEqual) as typeof ApiForm;

export function ApiFormHandler<T, A extends {[key: string]: string}>({store, endpoint, label, required, handle_response, handle_submit, handle_loading, handle_error, classes}: {
    store: CommandStoreType,
    endpoint: string,
    label: ReactNode,
    required?: string[],
    handle_response?: (data: T) => void
    handle_submit?: (data: A) => boolean,
    handle_loading?: () => void,
    handle_error?: (error: string) => void,
    classes?: string,
}) {
    const output = store((state) => state.output);
    const [submit, setSubmit] = useState(false);
    const { showDialog } = useDialog();
    const missing = required ? required.filter(field => !output[field]) : [];

    useEffect(() => {
        if (submit && missing.length === 0) {
            if (handle_submit) {
                if (!handle_submit(output as A)) {
                    setSubmit(false);
                    return;
                }
            }
            if (handle_loading) {
                handle_loading();
            }
            const formBody = new URLSearchParams();
            Object.entries(output).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach(val => formBody.append(key, val as string));
                } else {
                    formBody.append(key, value);
                }
            });
            const url = `${process.env.API_URL}${endpoint}`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/msgpack',
                },
                credentials: 'include',
                body: formBody.toString(),
            })
            .then(async response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const serializedData = await response.arrayBuffer();
                const data = new Uint8Array(serializedData);
                const result = UNPACKR.unpack(data);
                return result ?? {};
            })
            .then(data => {
                if (data.success || data.success !== false) {
                    console.log("SUCCESS DATA", data);
                    if (data?.url) {
                        console.log("URL", data.url);
                        if (!data.url.startsWith("https://politicsandwar.com/") && !data.url.startsWith(`${process.env.EXTERNAL_URL}`)) {
                            showDialog("Invalid URL returned", `${DOMPurify.sanitize(data.url)}`, true);
                        } else {
                            window.location.href = data.url;
                        }
                    }
                    if (handle_response) {
                        console.log("HANDLING RESPONSE", data);
                        if (data != null) {
                            handle_response(data);
                        } else if (handle_error) {
                            handle_error("No response data");
                        } else {
                            showDialog("Success", "Success (no response)", false);
                        }
                    } else {
                        showDialog("Success", "Success (no response)", false);
                    }
                } else if (handle_error) {
                    handle_error(data.message || "An error occurred");
                } else {
                    showDialog(data.title ?? "Failed to handle form submission", data.message || "An error occurred", true);
                }
            })
            .catch(error => {
                if (handle_error) {
                    handle_error(error.message);
                } else {
                    showDialog("Failed to submit form: Fetch error", `${error.message}`, true);
                }
            })
            .finally(() => setSubmit(false));
        }
    }, [submit]);

    if (missing.length) {
        return <>
            <p>Please provide a value for <kbd>{missing.join(", ")}</kbd></p>
        </>
    }

    return (
        <>
            <Button variant="outline" size="sm" className={`border-red-800/70 me-1 ${submit && "disabled cursor-wait"} ${classes ? classes : ""}`} onClick={() => setSubmit(true)}>{label}</Button>
        </>
    );
}