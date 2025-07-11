"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";
import type { ActionResponse } from "@/lib/server-action";
import { useToast } from "@/components/toast-provider";

export function useServerAction<T>(
	action: (prevState: ActionResponse, args: T) => Promise<ActionResponse>,
	initialState: ActionResponse,
	options?: { redirectTo?: string },
) {
	const router = useRouter();
	const [state, formAction, isPending] = useActionState(action, initialState);
	const { addToast } = useToast();
	const didRedirect = useRef(false);

	useEffect(() => {
		if (state.successMessage && !didRedirect.current) {
			addToast({ type: "success", description: state.successMessage });

			if (options?.redirectTo) {
				didRedirect.current = true;
				router.push(options.redirectTo);
			}

			router.refresh();
		} else if (state.errorMessage) {
			addToast({ type: "error", description: state.errorMessage });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.successMessage, state.errorMessage]);

	return { state, formAction, isPending };
}

export function toAction<T extends unknown[]>(
	fn: (...args: T) => Promise<ActionResponse>,
) {
	return async function (
		_prevState: ActionResponse,
		args: T,
	): Promise<ActionResponse> {
		return fn(...args);
	};
}
