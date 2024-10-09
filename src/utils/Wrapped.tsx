import { ComponentType, useEffect, useState, FC } from "react";
import {JSX} from "react/jsx-runtime";
import IntrinsicAttributes = JSX.IntrinsicAttributes;

type TransformFunction<T, P> = (data: T) => P;

export function withAsyncData<T, P>(WrappedComponent: ComponentType<P>, asyncFunction: () => Promise<T>, transformFunction: TransformFunction<T, P>): FC {
    return function WithAsyncDataComponent() {
        const [data, setData] = useState<T | null>(null);
        useEffect(() => {
            asyncFunction().then(fetchedData => {
                setData(fetchedData);
            });
        }, []);
        const transformedProps = (data ? transformFunction(data) : ({} as P)) as P & IntrinsicAttributes;
        return (
            data && <WrappedComponent {...transformedProps} />
        );
    };
}