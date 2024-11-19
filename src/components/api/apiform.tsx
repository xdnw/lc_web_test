import React, {ReactNode, useEffect, useRef, useState} from "react";
import {CommandStoreType, createCommandStore, createCommandStoreWithDef} from "@/utils/StateUtil.ts";
import {hasToken} from "@/utils/Auth.ts";
import {Link} from "react-router-dom";
import DOMPurify from "dompurify";
import SimpleDialog from "@/components/ui/simple-dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import Loading from "@/components/ui/loading.tsx";
import msgpack from 'msgpack-lite';

interface FormInputsProps {
    setOutputValue: (name: string, value: string) => void;
}

export default function ApiForm<T, A extends { [key: string]: string }>({requireLogin = false, message, endpoint, label = "submit", required = [], default_values, form_inputs: FormInputs, handle_response, handle_submit, handle_loading, handle_error, classes}:
{
    requireLogin?: boolean,
    message: ReactNode,
    endpoint: string,
    label?: ReactNode,
    required?: string[],
    default_values?: {[key: string]: string},
    form_inputs: React.ComponentType<FormInputsProps>
    handle_response?: (data: T, setMessage: (message: ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
    handle_submit?: (data: A, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
    handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
    handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
    classes?: string,
}) {
    const commandStore = useRef(default_values && Object.keys(default_values).length ? createCommandStoreWithDef(default_values) : createCommandStore());

    if (requireLogin && !hasToken()) {
        return <>
            Please login first
            <br />
            <Button variant="outline" size="sm" className='border-red-800/70' asChild><Link to={`${import.meta.env.BASE_URL}home`}>Login</Link></Button>
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

export function ApiFormHandler<T, A extends {[key: string]: string}>({store, endpoint, label, required, handle_response, handle_submit, handle_loading, handle_error, classes}: {
    store: CommandStoreType,
    endpoint: string,
    label: ReactNode,
    required?: string[],
    handle_response?: (data: T, setMessage: (message: ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void
    handle_submit?: (data: A, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
    handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
    handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
    classes?: string,
}) {
    const output = store((state) => state.output);
    const [message, setMessage] = useState<ReactNode | null>(output["message"] || null);
    const [submit, setSubmit] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [title, setTitle] = useState("Failed to submit form");
    const missing = required ? required.filter(field => !output[field]) : [];

    useEffect(() => {
        if (submit && missing.length === 0) {
            if (handle_submit) {
                if (!handle_submit(output as A, setMessage, setShowDialog, setTitle)) {
                    return;
                }
            }
            if (handle_loading) {
                handle_loading(setMessage, setShowDialog, setTitle);
            }
            const formBody = new URLSearchParams(output).toString();
            const url = `${process.env.API_URL}${endpoint}`;
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: formBody,
            })
            .then(async response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const serializedData = await response.arrayBuffer();
                const data = new Uint8Array(serializedData);
                const result = msgpack.decode(data);
                return result ?? {};
            })
            .then(data => {
                if (data.success || data.success !== false) {
                    console.log("SUCCESS DATA", data);
                    if (data?.url) {
                        console.log("URL", data.url);
                        if (!data.url.startsWith("https://politicsandwar.com/") && !data.url.startsWith(`${process.env.EXTERNAL_URL}`)) {
                            setTitle("Invalid URL");
                            setMessage(`Invalid URL returned: <kbd>${DOMPurify.sanitize(data.url)}</kbd>`);
                            setShowDialog(true);
                        } else {
                            window.location.href = data.url;
                        }
                    }
                    if (handle_response) {
                        console.log("HANDLING RESPONSE", data);
                        if (data != null) {
                            handle_response(data, setMessage, setShowDialog, setTitle);
                        } else if (handle_error) {
                            handle_error("No response data", setMessage, setShowDialog, setTitle);
                        } else {
                            setTitle("Success");
                            setMessage("Success (no response)");
                            setShowDialog(true);
                        }
                    } else {
                        setTitle("Success");
                        setMessage("Success (no response)");
                        setShowDialog(true);
                    }
                } else if (handle_error) {
                    handle_error(data.message || "An error occurred", setMessage, setShowDialog, setTitle);
                } else {
                    setTitle(data.title ?? "Failed to handle form submission");
                    setMessage(data.message || "An error occurred");
                    setShowDialog(true);
                }
            })
            .catch(error => {
                if (handle_error) {
                    handle_error(error.message, setMessage, setShowDialog, setTitle);
                } else {
                    setTitle("Failed to submit form");
                    setMessage(`Fetch error: ${error.message}`);
                    setShowDialog(true);
                }
            })
            .finally(() => setSubmit(false));
        }
    }, [submit]);

    if (missing.length) {
        return <>
            <SimpleDialog showDialog={showDialog} setShowDialog={setShowDialog}
                          title={title}
                          message={message ?? ""} />
            <p>Please provide a value for <kbd>{missing.join(", ")}</kbd></p>
        </>
    }

    return (
        <>
            <SimpleDialog showDialog={showDialog} setShowDialog={setShowDialog}
                          title={title}
                          message={message ?? ""} />
            <Button variant="outline" size="sm" className={`border-red-800/70 me-1 ${submit && "disabled cursor-wait"} ${classes ? classes : ""}`} onClick={() => setSubmit(true)}>{label}</Button>
        </>
    );
}