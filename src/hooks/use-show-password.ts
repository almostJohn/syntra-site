import { useState } from "react";

export function useShowPassword(initial: boolean = false) {
	const [show, setShow] = useState(initial);

	function toggle() {
		setShow((prev) => !prev);
	}

	return { show, toggle };
}
