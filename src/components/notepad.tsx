"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { transformText } from "~/util/transformText";

export function Notepad() {
	const [text, setText] = React.useState("");
	const [interacted, setInteracted] = React.useState(false);

	function copyToClipboard() {
		navigator.clipboard.writeText(text).then(() => {
			setInteracted(true);

			setTimeout(() => {
				setInteracted(false);
			}, 2_000);
		});
	}

	function clearText() {
		setText("");
	}

	return (
		<div className="block p-4 rounded-md border bg-background shadow-lg">
			<div className="flex flex-col space-y-4">
				<div className="flex items-center justify-between w-full">
					<div className="flex flex-col space-y-1">
						<h2 className="font-medium tracking-tight">Notepad</h2>
						<span className="italic text-xs font-light text-muted-foreground">
							Tip: Use **bold**, *italic*, __underline__, or `inline code` for
							text formatting.
						</span>
					</div>
					<div className="flex items-center justify-end">
						<Button
							variant="ghost"
							size="sm"
							onClick={clearText}
							className="hover:bg-transparent hover:underline"
						>
							Clear
						</Button>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="w-full">
						<Textarea
							value={text}
							onChange={(e) => setText(e.target.value)}
							className="h-80 resize-none font-mono p-3"
							placeholder="Type here..."
						/>
					</div>
					<div className="w-full">
						<div className="relative block p-3 border bg-background rounded-md h-80 overflow-y-auto">
							<Button
								variant="outline"
								size="icon"
								className="absolute z-50 top-3 right-3"
								onClick={copyToClipboard}
							>
								{interacted ? (
									<Check className="size-5 shrink-0" />
								) : (
									<Copy className="size-5 shrink-0" />
								)}
							</Button>
							<div
								className="overflow-auto text-sm mr-24"
								dangerouslySetInnerHTML={{ __html: transformText(text) }}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
