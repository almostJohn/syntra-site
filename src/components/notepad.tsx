"use client";

import * as React from "react";
import { Textarea } from "./ui/textarea";

export function Notepad() {
	const [text, setText] = React.useState("");

	return (
		<div className="block p-6 border border-neutral-300 rounded-md shadow-sm">
			<div className="flex flex-col space-y-4">
				<div className="flex flex-col space-y-0.5">
					<h3 className="font-medium tracking-tight">Notepad</h3>
					<p className="font-light text-sm text-neutral-500 italic">
						Tip: Refreshing the site will clear the notepad.
					</p>
				</div>
				<Textarea
					value={text}
					onChange={(e) => {
						setText(e.target.value);
					}}
					placeholder="Start typing here..."
					className="h-72"
				/>
			</div>
		</div>
	);
}
