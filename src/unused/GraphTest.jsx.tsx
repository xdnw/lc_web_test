import React, {Component, createRef, useRef} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler, ChartEvent, ActiveElement, Chart
} from 'chart.js';
import { Bar, Line, Scatter } from 'react-chartjs-2';
import { WebGraph, GrahpType } from '../components/api/apitypes';
import chroma from 'chroma-js';
import distinctColors from 'distinct-colors'
import {
    formatNumber,
    formatTime,
} from "../utils/StringUtil";
import {TRADEPRICEBYDAYJSON} from "../components/api/endpoints";
import {useTheme} from "../components/ui/theme-provider";

export function GraphTest() {
    return TRADEPRICEBYDAYJSON.useDisplay({
        args: {
            resources: "*",
            days: "300"
        },
        render: (graph: WebGraph) => {
            return <div className="bg-white dark:bg-black p-2">
                <ChartComponent graph={graph} type='LINE' />;
            </div>;
        }
    })

}

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface ChartProps {
    graph: WebGraph;
    type: GrahpType;
    theme: 'light' | 'dark';
}

interface ChartState {
    previousActiveElements: ActiveElement[];
}

class ChartComponent extends Component<ChartProps, ChartState> {
    chartRef = createRef<Chart>();

    constructor(props: ChartProps) {
        super(props);
        this.state = {
            previousActiveElements: []
        };
    }

    shouldComponentUpdate(nextProps: ChartProps) {
        return nextProps.graph !== this.props.graph || nextProps.type !== this.props.type || nextProps.theme !== this.props.theme;
    }

    componentWillUnmount() {
        if (this.chartRef.current) {
            this.chartRef.current.destroy();
        }
    }

    onHover = (evt: ChartEvent, activeElements: ActiveElement[], chart: Chart) => {
        const { previousActiveElements } = this.state;
        if (activeElements.length !== previousActiveElements.length ||
            activeElements.some((el, index) => el.datasetIndex !== previousActiveElements[index].datasetIndex || el.index !== previousActiveElements[index].index)) {
            chart.data.datasets.forEach((dataset) => {
                const currentColor = dataset.backgroundColor as string;
                console.log('Current color:', currentColor);
                dataset.backgroundColor = currentColor.replace(/[\d.]+\)$/g, '0.5)');
                dataset.pointRadius = 1;
            });

            if (activeElements && activeElements.length) {
                const datasetIndex = activeElements[0].datasetIndex;
                const activeDataset = chart.data.datasets[datasetIndex];
                const activeColor = activeDataset.backgroundColor as string;
                console.log('Active color:', activeColor);
                activeDataset.backgroundColor = activeColor.replace(/[\d.]+\)$/g, '1)');
                activeDataset.pointRadius = 2;
            }

            this.setState({ previousActiveElements: activeElements });
            chart.update();
        }
    };

    generateColors(n: number, background: 'white' | 'black' = 'white'): chroma.Color[] {
        const options = {
            count: n,
            lightMin: background === 'white' ? 30 : 15,
            lightMax: background === 'white' ? 85 : 85
        };
        return distinctColors(options);
    }

    render() {
        console.log("rendering chart 2312");
        const { graph, type } = this.props;
        const origin = graph.origin ?? 0;
        const timeFormat = graph.time_format ?? "SI_UNIT";
        const numberFormat = graph.number_format ?? "SI_UNIT";

        const bg = this.props.theme === 'dark' ? 'black' : 'white';
        const colors: chroma.Color[] = this.generateColors(graph.labels.length, bg);

        let chartData;
        if (type === 'SCATTER') {
            chartData = {
                datasets: graph.data.slice(1).map((dataSet, index) => ({
                    label: graph.labels[index],
                    data: dataSet.map((yValue, i) => ({
                        x: graph.data[0][i] as number + origin,
                        y: yValue
                    })),
                    backgroundColor: colors[index],
                    borderColor: colors[index],
                    borderWidth: 1,
                    pointRadius: 1,
                    pointHoverRadius: 5,
                    hitRadius: 100
                }))
            };
        } else {
            chartData = {
                labels: graph.data[0].map((xValue: number | string) => formatTime(xValue as number + origin, timeFormat)),
                datasets: graph.data.slice(1).map((dataSet, index) => ({
                    label: graph.labels[index],
                    data: dataSet,
                    backgroundColor: `rgba(${colors[index].rgb()[0]}, ${colors[index].rgb()[1]}, ${colors[index].rgb()[2]}, 0.5)`,
                    borderColor: `rgba(${colors[index].rgb()[0]}, ${colors[index].rgb()[1]}, ${colors[index].rgb()[2]}, 1)`,
                    borderWidth: 1,
                    pointRadius: 1,
                    fill: type === 'STACKED_LINE' || type === "FILLED_LINE" ? '-1' : undefined,
                    pointHoverRadius: 5,
                    hitRadius: 100,
                    hoverBorderWidth: 3,
                }))
            };
        }

        const chartOptions = {
            // maintainAspectRatio: false,
            animation: false,
            responsive: true,
            interaction: {
                mode: 'nearest',
            },
            onHover: this.onHover,
            scales: {
                x: {
                    beginAtZero: origin === 0,
                    stacked: type === 'STACKED_BAR' || type === 'STACKED_LINE',
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 50
                    }
                },
                y: {
                    beginAtZero: true,
                    stacked: type === 'STACKED_BAR' || type === 'STACKED_LINE',
                    ticks: {
                        callback: (tickValue: number | string) => {
                            return formatNumber(tickValue as number, numberFormat)
                        },
                        autoSkip: true,
                        maxTicksLimit: 50
                    }
                }
            }
        };

        const canvasStyle = {
            display: 'block'
        };

        switch (type) {
            case 'STACKED_BAR':
            case 'SIDE_BY_SIDE_BAR':
                return <Bar ref={this.chartRef} data={chartData} options={chartOptions} style={canvasStyle} />;
            case 'HORIZONTAL_BAR':
                return <Bar ref={this.chartRef} data={chartData} options={{ ...chartOptions, indexAxis: 'y' }} style={canvasStyle} />;
            case 'STACKED_LINE':
            case 'FILLED_LINE':
            case 'LINE':
                return <Line ref={this.chartRef} data={chartData} options={chartOptions} style={canvasStyle} />;
            case 'SCATTER':
                return <Scatter ref={this.chartRef} data={chartData} options={chartOptions} style={canvasStyle} />;
            default:
                return null;
        }
    }
}

export default ChartComponent;