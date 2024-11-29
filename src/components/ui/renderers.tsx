import React, {ReactNode} from "react";
import {COMMANDS} from "../../lib/commands";
import {ObjectColumnRender} from "datatables.net";
import {commafy} from "../../utils/StringUtil";
import ReactDOMServer from 'react-dom/server';

const colors: string[] = COMMANDS.options["NationColor"]?.options ?? [];

export const RENDERERS: {[key: string]: ObjectColumnRender} = {
    money: {display: money},
    comma: {display: commafy},
    color: {display: color},
    time: {display: time},
    // TODO other renderers
    // url
    // graph
    // time
}

export function time(t: number): string {
    return new Date(t * 1000).toLocaleString();
}

export function money(f: number): string {
    return "$" + commafy(f);
}

export function color(colorId: number): string {
    return ReactDOMServer.renderToString(<Color colorId={colorId as number} />);
}

export function Color({colorId, beigeTurns}: {colorId: number, beigeTurns?: number}) {
    const color = Number.isInteger(colorId) ? colors[colorId] : colorId + "";
    return (
        <div
            className="w-5 h-5 border border-2 border-black flex items-center justify-center"
            style={{backgroundColor: `${color.replace("BEIGE", "TAN")}`}}
            title={`${color}`}
        >
            {beigeTurns && beigeTurns > 0 && (
                <span className="text-xs text-black">{beigeTurns}</span>
            )}
        </div>
    );
}