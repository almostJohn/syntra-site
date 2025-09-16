import { useCallback, useState } from "react";

export function useCheckbox(initial: boolean = false) {
	const [checked, setChecked] = useState(initial);

	const onChange = useCallback((value: boolean | "indeterminate") => {
		setChecked(!!value);
	}, []);

	return {
		checked,
		setChecked,
		onChange,
	};
}
