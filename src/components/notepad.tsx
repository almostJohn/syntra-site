"use client";

import * as React from "react";
import Link from "next/link";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { transformText } from "~/util/transformText";

export function Notepad() {
	const [text, setText] = React.useState("");

	function clearText() {
		setText("");
	}

	return (
		<div className="block p-5 border border-neutral-300 rounded-md shadow-sm">
			<div className="flex flex-col space-y-4">
				<div className="flex items-center justify-between w-full">
					<div className="flex flex-col space-y-1">
						<div className="flex items-center space-x-2">
							<h3 className="font-medium tracking-tight">Notepad</h3>
							<Link
								href="https://www.markdownguide.org/"
								className="inline-flex items-center justify-center px-3 py-0.5 rounded-full text-xs font-bold border border-neutral-300 bg-neutral-200 cursor-pointer"
							>
								Markdown Support
							</Link>
						</div>
						<p className="font-light text-xs text-neutral-500 italic">
							Tip: Use **bold**, *italic*, __underline__, or `inline code` for
							text formatting.
						</p>
					</div>
					<div className="flex items-center justify-end">
						<Button
							variant="link"
							className="underline-offset-1"
							onClick={clearText}
						>
							Clear
						</Button>
					</div>
				</div>
				<Textarea
					value={text}
					onChange={(e) => {
						setText(e.target.value);
					}}
					placeholder="Start typing here..."
					className="h-72 text-sm"
				/>
				<div
					className="h-72 p-3 text-sm rounded-md overflow-auto border border-neutral-300 bg-neutral-200"
					dangerouslySetInnerHTML={{ __html: transformText(text) }}
				/>
			</div>
		</div>
	);
}
