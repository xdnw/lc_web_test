import QueryComponent from "@/components/cmd/QueryComponent.tsx";
import React from "react";
import ApiForm from "@/components/api/apiform.tsx";

export default function NationPicker() {
    return (
        <div className="p-4">
        <ApiForm
            message={
            <><h2 className="text-lg font-extrabold">Mail Login:</h2>
                <p>
                Select your nation using the dropdown below, then press the <kbd>Send Code</kbd> button to receive a login
                link via in-game mail<br/>
                </p></>}
            endpoint={"login_mail"}
            label={"Send Code"}
            required={["nation"]}
            form_inputs={(props) =>
                <QueryComponent element={"DBNation"}
                                multi={false}
                                argName={"nation"}
                                initialValue={""}
                                setOutputValue={props.setOutputValue}/>}/>
        </div>
    )
}