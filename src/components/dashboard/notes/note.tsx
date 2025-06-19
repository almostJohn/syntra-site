"use client";

import { useParams } from "next/navigation";

export function Note() {
	const { id } = useParams();

	return (
		<div>
			<h4>Note ID: {id}</h4>
		</div>
	);
}
