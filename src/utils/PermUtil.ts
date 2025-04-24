import { COMMANDS } from "@/lib/commands";
import { CM, CommandPath } from "./Command";
import { useDialog } from "@/components/layout/DialogContext";
import { WebPermission } from "@/lib/apitypes";
import { PERMISSION } from "@/lib/endpoints";
import { bulkQueryOptions } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useEffect } from "react";

export function usePermission<P extends CommandPath<typeof COMMANDS.commands>>(path: P): { permission?: WebPermission, isFetching: boolean } {
    const { showDialog } = useDialog();
    const { data, isFetching, error } = useQuery({
        ...bulkQueryOptions(PERMISSION.endpoint, {
            command: CM.get(path).fullPath(),
        }),
        retry: false, // Optional: prevent retries if you want
    });

    const errorFinal = useMemo(() => {
        return error ?? (data?.error ? new Error(data.error) : null);
    }, [error, data?.error]);

    useEffect(() => {
        if (errorFinal) {
            showDialog('Permission Error', `Failed to fetch permission: ${(errorFinal).message}`);
        }
    }, [errorFinal, showDialog]);

    return { permission: data?.data ?? undefined, isFetching };
}