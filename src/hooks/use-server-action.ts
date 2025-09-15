import { Route } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useActionState } from "react";
import type { ActionResponse } from "@/lib/action";
import { useToast } from "@/context/toast-provider";

export function useServerAction<T>(
	action: (prevState: ActionResponse, args: T) => Promise<ActionResponse>,
	initialState: ActionResponse,
	options?: { redirectTo?: Route },
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

export function toAction<T extends unknown[], R extends ActionResponse>(
	fn: (...args: T) => Promise<R>,
) {
	return async (_prevState: R, args: T): Promise<R> => fn(...args);
}
