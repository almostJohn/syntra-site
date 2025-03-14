import * as React from "react";
import { Notes } from "~/components/notes";

export default function NotesPage() {
	return (
		<div className="container flex flex-col max-w-7xl py-12">
			<Notes />
		</div>
	);
}
