import React, {ReactNode, useEffect, useRef, useState} from "react";
import {CommandStoreType, createCommandStore} from "@/utils/StateUtil.ts";
import {hasToken} from "@/utils/Auth.ts";
import {Link} from "react-router-dom";
import {DataProvider} from "@/components/cmd/DataContext.tsx";
import DOMPurify from "dompurify";
import SimpleDialog from "@/components/ui/simple-dialog.tsx";
import {Button} from "@/components/ui/button.tsx";

interface FormInputsProps {
    setOutputValue: (name: string, value: string) => void;
}

export default function ApiForm<T>({requireLogin = false, message, endpoint, label = "submit", required = [], form_inputs: FormInputs, handle_response, handle_submit}:
{
    requireLogin?: boolean,
    message: ReactNode,
    endpoint: string,
    label?: string,
    required?: string[],
    form_inputs: React.ComponentType<FormInputsProps>
    handle_response?: (data: T, setMessage: (message: ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
    handle_submit?: (data: {[key: string]: string}, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
}) {
    const commandStore = useRef(createCommandStore());

    if (requireLogin && !hasToken()) {
        return <>
            Please login first
            <br />
            <Button variant="outline" size="sm" className='border-red-800/70' asChild><Link to={`${import.meta.env.BASE_URL}home`}>Login</Link></Button>
        </>
    }

    return <>
        {message}
        <hr className="my-2"/>
        <DataProvider endpoint="query">
            <FormInputs setOutputValue={commandStore.current((state) => state.setOutput)} />
        </DataProvider>
        <hr className="my-2"/>
        <ApiFormHandler endpoint={endpoint} store={commandStore.current} label={label} required={required} handle_response={handle_response} handle_submit={handle_submit}/>
    </>
}

export function ApiFormHandler<T>({store, endpoint, label, required, handle_response, handle_submit}: {
    store: CommandStoreType,
    endpoint: string,
    label: string,
    required?: string[],
    handle_response?: (data: T, setMessage: (message: ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void
    handle_submit?: (data: {[key: string]: string}, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void
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
                handle_submit(output, setMessage, setShowDialog, setTitle);
                return;
            } else {
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
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
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
                                const value = data?.value ?? null
                                if (value != null) {
                                    handle_response(value, setMessage, setShowDialog, setTitle);
                                }
                            } else {
                                setTitle("Success");
                                setMessage("Success (no response)");
                                setShowDialog(true);
                            }
                        } else {
                            setTitle(data.title ?? "Failed to handle form submission");
                            setMessage(data.message || "An error occurred");
                            setShowDialog(true);
                        }
                    })
                    .catch(error => {
                        setTitle("Failed to submit form");
                        setMessage(`Fetch error: ${error.message}`);
                        setShowDialog(true);
                    })
                    .finally(() => setSubmit(false));
            }
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
            <Button variant="outline" size="sm" className='border-red-800/70' onClick={() => setSubmit(true)}>{label}</Button>
        </>
    );
}