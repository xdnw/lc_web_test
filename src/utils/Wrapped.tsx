import React, { ComponentType, useEffect, useState, FC } from "react";
import {JSX} from "react/jsx-runtime";
import IntrinsicAttributes = JSX.IntrinsicAttributes;

type TransformFunction<T, P> = (data: T) => P;

/**
 * This function is a higher order component that wraps a component with an async data fetcher.
 * Use it when you need to fetch data from an API and pass it to a component.
 * @param WrappedComponent  
 * @param asyncFunction 
 * @param transformFunction 
 * @returns 
 */
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