import { useState, useCallback } from "react";

export function useShowPassword(initial: boolean = false) {
	const [show, setShow] = useState(initial);

	const toggle = useCallback(() => setShow((s) => !s), []);

	return { show, toggle };
}
