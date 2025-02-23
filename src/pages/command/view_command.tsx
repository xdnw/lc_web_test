import {COMMAND} from "../../components/api/endpoints";
import {useDialog} from "../../components/layout/DialogContext";
import React, {memo, useEffect, useMemo, useRef, useState} from "react";
import {handleResponse, RenderResponse} from "./index";
import {WebViewCommand} from "../../components/api/apitypes";
import {Link, useParams, useSearchParams} from "react-router-dom";
import {Button} from "../../components/ui/button";
import CopyToClipboard from "../../components/ui/copytoclipboard";

function toMap(searchParams: URLSearchParams): {[key: string]: string} {
    const map: {[key: string]: string} = {};
    searchParams.forEach((value, key) => {
        map[key] = value;
    });
    return map;
}

export default function ViewCommandPage() {
    const {command} = useParams<{ command: string }>();
    // useSearchParams();
    const [searchParams] = useSearchParams();
    // search params to object {[key: string]: string}
    return <ViewCommand command={command as string} args={toMap(searchParams)} />;
}

export function ViewCommand({ command, args }: { command: string, args: { [key: string]: string } }) {
    const { showDialog } = useDialog();

    // becomes `/command arg1: value1 arg2: value2`
    return <>
        <Button variant="outline" size="sm" asChild>
            <Link to={`${process.env.BASE_PATH}command/${command}?${new URLSearchParams(args).toString()}`}>Edit</Link>
        </Button>
        <Button variant="outline" size="sm" asChild className="ms-1">
            <CopyToClipboard text="Copy Command" copy={`/${command} ${Object.entries(args).map(([key, value]) => `${key}:${value}`).join(" ")}`}
                         className="no-underline" />
        </Button>
        {COMMAND.useDisplay({
        args: {
            data: { "": command, ...args } as unknown as string, // hacky way to pass in the raw data
        },
        render: (newData) => {
            return <MemoizedRenderResponse data={newData} showDialog={showDialog} />;
        }
    })}
    </>;
}

export function MemoizedRenderResponse({ data, showDialog }: { data: WebViewCommand, showDialog: (title: string, message: React.ReactNode, quote?: (boolean | undefined)) => void }) {
    return useMemo(() => {
        return <RenderResponse jsonArr={data.data as { [key: string]: string | object | object[] | number | number[] | string[] }[]} showDialog={showDialog} />;
    }, [data.uid]);
}