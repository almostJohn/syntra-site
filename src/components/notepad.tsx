"use client";

import * as React from "react";
import Link from "next/link";
import { Copy, CopyCheck } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { transformText } from "~/util/transformText";

export function Notepad() {
	const [text, setText] = React.useState("");
	const [interacted, setInteracted] = React.useState(false);

	function clearText() {
		setText("");
	}

	function copyToClipboad() {
		navigator.clipboard.writeText(text).then(() => {
			setInteracted(true);

			setTimeout(() => {
				setInteracted(false);
			}, 3_000);
		});
	}

	return (
		<div className="block p-4 border border-border rounded-md shadow-sm">
			<div className="flex flex-col space-y-6">
				<div className="flex items-center justify-between w-full">
					<div className="flex flex-col space-y-1">
						<div className="flex items-center space-x-2">
							<h3 className="font-medium tracking-tight">Notepad</h3>
							<Link
								href="https://www.markdownguide.org/"
								className="inline-flex items-center justify-center px-3 py-0.5 rounded-full text-xs font-bold border bg-muted cursor-pointer"
							>
								Markdown Support
							</Link>
						</div>
						<p className="font-light text-xs text-muted-foreground italic">
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
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="w-full">
						<Textarea
							value={text}
							onChange={(e) => {
								setText(e.target.value);
							}}
							placeholder="Start typing here..."
							className="h-80 text-sm"
						/>
					</div>
					<div className="w-full">
						<div className="relative h-80 p-3 text-sm rounded-md overflow-y-auto border bg-background">
							<Button
								variant="outline"
								size="sm"
								className="absolute z-50 top-3 right-3"
								onClick={copyToClipboad}
							>
								{interacted ? (
									<>
										<CopyCheck className="text-teal-500 size-5 shrink-0" />{" "}
									</>
								) : (
									<>
										<Copy className="size-5 shrink-0" />
									</>
								)}
							</Button>
							<div
								className="overflow-auto mr-24"
								dangerouslySetInnerHTML={{ __html: transformText(text) }}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
