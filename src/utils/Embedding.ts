import { FeatureExtractionPipeline, Tensor, pipeline } from '@xenova/transformers';
import CryptoJS from 'crypto-js';
let extractorPromise: Promise<FeatureExtractionPipeline> | null = null;


async function load() {
    if (extractorPromise === null) {
        console.log("Loading model...");
        extractorPromise = pipeline('feature-extraction', 'Snowflake/snowflake-arctic-embed-xs');
        console.log("Model loaded.");
    }
    return extractorPromise;
}

export function hashWithMD5(data: string) {
    return CryptoJS.MD5(data).toString();
}

export type Sentence = {
    text: string;
    vector: number[];
}

export function cosineSimilarity(vecA: number[], vecB: number[]): number {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (normA * normB);
}

function toNumber(tensor: Tensor): number[] {
    const result: number[] = [];
    for (let i = 0; i < tensor.data.length; i++) {
        result.push(tensor.data[i] as number);
    }
    return result;
}

export async function toVector(text: string): Promise<number[]> {
    const extractor = await load();
    const output = await extractor(text, { pooling: 'mean', normalize: true });
    return toNumber(output);
}

export async function compareSentences(sentences: Sentence[], compareTo: string): Promise<number[]> {
    const result: number[] = [];
    const output = await toVector(compareTo);
    sentences.forEach(sentence => {
        result.push(cosineSimilarity(sentence.vector, output));
    });
    return result;
}

export type Weight = {
    vector: number[];
    hash: string;
}

export type WeightMap = {
    [key: string]: Weight;
}

export type CommandWeights = {
    commands: WeightMap
    placeholders: { [key: string]: WeightMap }
}

export async function loadWeights(): Promise<CommandWeights> {
    const url = `${import.meta.env.BASE_URL}assets/weights.json`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    let weights = await response.json() as CommandWeights;
    if (!weights.commands) {
        const parent = weights;
        weights = {
            commands: parent as unknown as WeightMap,
            placeholders: {}
        }
    }
    return weights;
}