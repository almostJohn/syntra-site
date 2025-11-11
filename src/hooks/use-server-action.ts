import { MessageType, ActionState } from "@/types";
import { Route } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useActionState } from "react";
import { toast } from "sonner";

type UseServerActionProps<T, R extends ActionState = ActionState> = {
	action: (_: R, args: T) => Promise<R>;
	initialState?: R;
	options?: { redirectTo?: Route };
};

export function useServerAction<T, R extends ActionState = ActionState>({
	action,
	initialState,
	options,
}: UseServerActionProps<T>) {
	const router = useRouter();
	const [state, formAction, isPending] = useActionState(
		action,
		initialState ?? ({} as R),
	);
	const didRedirect = useRef(false);

	useEffect(() => {
		switch (state.type) {
			case MessageType.Error: {
				toast.error(state.message);
				break;
			}

			case MessageType.Success: {
				toast.success(state.message);

				if (options?.redirectTo) {
					didRedirect.current = true;
					router.push(options.redirectTo);
				}

				break;
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

	return { state, formAction, isPending };
}
