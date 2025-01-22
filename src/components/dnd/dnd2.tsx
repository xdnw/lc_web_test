import {UniqueIdentifier} from "@dnd-kit/core";
import {useState} from "react";

// Parsing string to ContainerHandler[]

export function parseContainers(type: string, containers: string): ContainerHandler[] {
    const containerHandlers: ContainerHandler[] = [];
}

function toFlat(containers: ContainerHandler[]): ContainerHandler[] {
    const flat: ContainerHandler[] = [];
    function flatten(container: ContainerHandler) {
        flat.push(container);
        for (const key in container.values) {
            const value = container.values[key];
            if (value instanceof ContainerHandler) {
                flatten(value);
            }
        }
    }

    containers.forEach(flatten);
    return flat;
}

export abstract class ContainerHandler {
    id: UniqueIdentifier;
    values: { [key: string]: string | ContainerHandler } = {};

    // abstract accepts: (container: ContainerHandler) => boolean;

    // abstract toString: (errors: (string) => void) => string;
}

export default function Root() {
    const input = "AA:Singularity,#cities>3"

    const [containersTree, setContainersTree] = useState<ContainerHandler[]>(parseContainers(input));
    const [containersFlat, setContainersFlat] = useState<ContainerHandler[]>(toFlat(containersTree));
}