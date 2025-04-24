ApiFormInputs: TODO update to accept an endpoit with types like EndpointWrapper
- Input: Endpoint.displayProps
- Output: Input components, button, and data (children)

useDeepMemo(variable) - memoize const via deep compare

export default function EndpointWrapper(
    readonly endpoint: CommonEndpoint<T, A, B>;
    readonly args: A;
    readonly handle_error?: (error: Error) => void;
    readonly batch_wait_ms?: number;
    readonly isPostOverride?: boolean;
    readonly children: (data: QueryResult<T>) => ReactNode;