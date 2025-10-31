import {
	useState,
	useTransition,
	ChangeEvent,
	FormEvent,
	MouseEvent,
} from "react";

type UseControlledFormProps<T extends Record<string, unknown>> = {
	initialValues: T;
	onSubmit?: (values: T) => Promise<void> | void;
};

export function useControlledForm<T extends Record<string, unknown>>({
	initialValues,
	onSubmit,
}: UseControlledFormProps<T>) {
	const [values, setValues] = useState<T>(initialValues);
	const [isPending, startTransition] = useTransition();

	function handleChange<
		K extends keyof T,
		E extends ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	>(e: E) {
		const { name, value } = e.target;
		if (name in values) {
			setValues((prev) => ({
				...prev,
				[name]: value as T[K],
			}));
		}
	}

	async function handleSubmit(
		e?: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>,
	) {
		e?.preventDefault();
		if (!onSubmit) return;
		startTransition(() => {
			Promise.resolve(onSubmit(values));
		});
	}

	function setValue<K extends keyof T>(key: K, value: T[K]) {
		setValues((prev) => ({ ...prev, [key]: value }));
	}

	function reset() {
		setValues(initialValues);
	}

	return {
		values,
		handleChange,
		handleSubmit,
		setValue,
		reset,
		isPending,
	};
}
