"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { TextEditor } from "~/components/text-editor";

export default function Page() {
	const params = useParams();
	const noteId = params.id as string;

	return (
		<div className="container py-12">
			<TextEditor noteId={noteId} />
		</div>
	);
}
