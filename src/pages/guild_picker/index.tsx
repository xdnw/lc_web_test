import QueryComponent from "@/components/cmd/QueryComponent.tsx";
import React from "react";
import ApiForm from "@/components/api/apiform.tsx";
import Cookies from 'js-cookie';

/*

 */

export default function GuildPicker() {
    return (
        <div className="p-4">
            <ApiForm<{id: string, name: string, icon: string}>
                message={
                    <><h2 className="text-lg font-extrabold">Guild Select:</h2>
                        <p>
                            Select your guild using the dropdown below, then press the <kbd>Submit</kbd> button
                        </p></>}
                endpoint={"set_guild"}
                label={"Submit"}
                required={["guild"]}
                form_inputs={(props) =>
                    <QueryComponent element={"GuildDB"}
                                    multi={false}
                                    argName={"guild"}
                                    initialValue={""}
                                    setOutputValue={props.setOutputValue}/>}
                handle_response={(data, setMessage, setShowDialog, setTitle) => {
                    Cookies.set('lc_guild', data.id);
                    Cookies.remove('lc_session');
                    setTitle("Guild Set");
                    setMessage(
                        <div className="flex items-center">
                            <img src={data.icon} alt="Guild Icon" className="w-8 h-8 mr-2" />
                            <span>Selected guild with id {data.id} and name {data.name}</span>
                        </div>
                    );
                    setShowDialog(true);
                }}
            />
        </div>
    )
}
