import {COMMANDS} from "../../lib/commands";
import {ObjectColumnRender} from "datatables.net";
import {commafy, formatSi} from "../../utils/StringUtil";
import ReactDOMServer from 'react-dom/server';
import {IOptionData} from "../../utils/Command";
import React, {ReactNode} from "react";
import SimpleChart from "../../pages/graphs/SimpleChart.js";
import {WebGraph} from "../api/apitypes";

const colors: string[] = (COMMANDS.options["NationColor"] as IOptionData).options ?? [];

export const RENDERERS: {[key: string]: ObjectColumnRender | undefined} = {
    money: {display: money},
    comma: {display: formatSi},
    color: {display: color},
    time: {display: time},
    time_ms: {display: time_ms},
    normal: {display: autoMarkdown},
    text: undefined,
    json: {display: json},
    graph: {display: Object.assign(graph, {isHtml: true})},
    html: {display: html}
}

export function html(value: string) {
    return value;
}

export function isHtmlRenderer(type: ObjectColumnRender): boolean {
    return (type?.display as unknown as { isHtml?: boolean })?.isHtml ?? false;
}

export function graph(value: WebGraph): ReactNode {
    return <SimpleChart graph={value} type={"LINE"} theme="light"
                        hideLegend={true}
                        hideDots={true}
                        minHeight="40px"
                        maxHeight="50px"
    />
}

export function autoMarkdown(value: string): string {
    if (value === undefined) return value;
    const openBracketIndex = value.indexOf("[");
    if (openBracketIndex !== 0) return value;

    const closeBracketIndex = value.indexOf("]", openBracketIndex);
    if (closeBracketIndex <= openBracketIndex) return value;

    const openParenIndex = value.indexOf("(", closeBracketIndex);
    if (openParenIndex !== closeBracketIndex + 1) return value;

    const closeParenIndex = value.indexOf(")", openParenIndex);
    if (closeParenIndex !== value.length - 1) return value;

    let url = value.slice(openParenIndex + 1, closeParenIndex);
    if (url.startsWith("<") && url.endsWith(">")) {
        url = url.slice(1, -1);
    }
    return '<a href="' + url + '">' + value.slice(openBracketIndex + 1, closeBracketIndex) + '</a>';
}

export function json(value: {[key: string]: (string | number)} | (string | number)[]): string {
    const roundedValue = Array.isArray(value)
        ? value.map(v => Number.isFinite(v) ? Math.round(v as number * 100) / 100 : v)
        : Object.fromEntries(
            Object.entries(value).map(([k, v]) => [k, Number.isFinite(v) ? Math.round(v as number * 100) / 100 : v])
        );
    return JSON.stringify(roundedValue);
}

export function getRenderer(type: string): ObjectColumnRender | undefined {
    if (!type) return undefined;
    if (type.startsWith("enum:")) {
        const enumType = type.split(":")[1];
        const options = (COMMANDS.options[enumType] as IOptionData)?.options ?? [];
        return Object.assign({
            display: (value: number) => options[value],
        }, {isEnum: true, options: options});
    } else {
        return RENDERERS[type] ?? RENDERERS.text;
    }
}

export function time(t: number): string {
    const date = new Date(t * 1000);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
}

export function time_ms(t: number): string {
    const date = new Date(t);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
}

export function money(f: number): string {
    return "$" + commafy(f);
}

export function color(colorId: number): string {
    return ReactDOMServer.renderToString(<Color colorId={colorId} />);
}

export function Color({colorId, beigeTurns}: {colorId: number, beigeTurns?: number}) {
    const color = Number.isInteger(colorId) ? colors[colorId] : colorId + "";
    return (
        <div
            className="w-5 h-5 border border-2 border-black flex items-center justify-center"
            style={{backgroundColor: `${color.replace("BEIGE", "TAN")}`}}
            title={`${color}`}
        >
            {beigeTurns !== undefined && beigeTurns > 0 && (
                <span className="text-xs text-black">{beigeTurns}</span>
            )}
        </div>
    );
}