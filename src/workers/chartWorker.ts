// // chartWorker.ts
// import { Chart, ChartConfiguration } from 'chart.js';
//
// self.onmessage = (event: MessageEvent) => {
//     const { type, options, canvas } = event.data as { type: string, options: ChartConfiguration, canvas: OffscreenCanvas };
//
//     if (type === 'createChart') {
//         const config: ChartConfiguration = options;
//         const chart = new Chart(canvas, config);
//         self.postMessage({ type: 'chartCreated', chart });
//     }
// };