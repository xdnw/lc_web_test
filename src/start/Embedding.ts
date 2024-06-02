import { FeatureExtractionPipeline, Tensor, pipeline } from '@xenova/transformers';
import CryptoJS from 'crypto-js';

let extractorPromise: Promise<FeatureExtractionPipeline> | null = null;


async function load() {
    if (extractorPromise === null) {
        console.log("Loading model TaylorAI/bge-micro-v2...");
        extractorPromise = pipeline('feature-extraction', 'TaylorAI/bge-micro-v2');
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
        result.push(tensor.data[i]);
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