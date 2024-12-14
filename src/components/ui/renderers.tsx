import {COMMANDS} from "../../lib/commands";
import {ObjectColumnRender} from "datatables.net";
import {commafy, formatSi} from "../../utils/StringUtil";
import ReactDOMServer from 'react-dom/server';
import {IOptionData} from "../../utils/Command";
import React, {ReactNode} from "react";
import ChartComponent from "../../unused/GraphTest.jsx";
import {WebGraph} from "../api/apitypes";

//
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
//

const colors: string[] = (COMMANDS.options["NationColor"] as IOptionData).options ?? [];

export const RENDERERS: {[key: string]: ObjectColumnRender | undefined} = {
    money: {display: money},
    comma: {display: formatSi},
    color: {display: color},
    time: {display: time},
    normal: {},
    text: undefined,
    json: {display: json},
    graph: {display: Object.assign(graph, {isHtml: true})},
    // TODO other renderers
}

export function isHtmlRenderer(type: ObjectColumnRender): boolean {
    return (type?.display as unknown as { isHtml?: boolean })?.isHtml ?? false;
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const generateDummyData = () => {
    const labels = Array.from({ length: 10 }, (_, i) => `Label ${i + 1}`);
    const data = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    return { labels, data };
};

const { labels, data } = generateDummyData();

const chartData = {
    labels,
    datasets: [
        {
            label: 'Dummy Data',
            data,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
        },
    ],
};

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Simple Line Chart with Dummy Data',
        },
    },
};

export function graph(value: WebGraph): ReactNode {
    return <ChartComponent graph={value} type={"LINE"} theme="light" aspectRatio={10} />
    // return <Line data={chartData} options={chartOptions} />;
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
        return {
            display: (value: number) => options[value],
        };
    } else {
        return RENDERERS[type] ?? RENDERERS.text;
    }
}

export function time(t: number): string {
    return new Date(t * 1000).toLocaleString();
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