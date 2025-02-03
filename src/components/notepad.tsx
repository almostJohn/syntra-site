"use client";

import * as React from "react";
import { Copy, Check, NotepadText } from "lucide-react";
import { Button } from "./ui/button";
import { transformText } from "~/util/transformText";

export function Notepad() {
	const [text, setText] = React.useState("");
	const [interacted, setInteracted] = React.useState(false);
	const [lineCount, setLineCount] = React.useState(1);
	const [colCount, setColCount] = React.useState(1);
	const [charCount, setCharCount] = React.useState(0);

	React.useEffect(() => {
		const savedText = localStorage.getItem("notepadText");
		if (savedText) {
			setText(savedText);
		}
	}, []);

	React.useEffect(() => {
		localStorage.setItem("notepadText", text);
	}, [text]);

	function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		e.preventDefault();

		const newText = e.target.value;
		setText(newText);
		setCharCount(newText.length);

		const lines = newText.split("\n");
		setLineCount(lines.length);

		const position = e.target.selectionStart;
		let currentLine = 1;
		let currentCol = 1;

		for (let i = 0; i < position; i++) {
			if (newText[i] === "\n") {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				currentLine++;
				currentCol = 1;
			} else {
				currentCol++;
			}
		}

		setColCount(currentCol);
	}

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
		localStorage.removeItem("notepadText");
	}

	return (
		<div className="block p-4 rounded-none bg-background">
			<div className="flex flex-col space-y-4">
				<div className="grid grid-cols-1 gap-4">
					<div className="w-full">
						<div className="flex flex-col h-[550px] bg-background border rounded-md shadow-lg">
							<div className="flex items-center justify-between w-full bg-muted border-b px-3 py-0.5">
								<div className="flex items-center space-x-2">
									<NotepadText className="size-5" />
									<span className="text-sm">Untitled</span>
								</div>
								<div className="flex items-center justify-end">
									<Button
										variant="ghost"
										size="sm"
										onClick={clearText}
										className="p-0 hover:bg-transparent hover:underline"
									>
										Clear text
									</Button>
								</div>
							</div>
							<textarea
								value={text}
								onChange={handleTextChange}
								className="flex-1 resize-none font-mono p-3 w-full rounded-none transition focus:ring-0 focus:outline-none"
								spellCheck={false}
							/>
							<div className="flex items-center justify-between w-full px-2 py-1 text-xs bg-muted border-t">
								<div className="flex items-center">
									<span>{`Ln ${lineCount}, Col ${colCount}`}</span>
								</div>
								<div className="flex items-center justify-end gap-4">
									<span>{`${charCount} characters`}</span>
									<span>UTF-8</span>
								</div>
							</div>
						</div>
					</div>
					<div className="w-full">
						<div className="relative block p-3 h-72 border bg-background rounded-md overflow-y-auto">
							<Button
								variant="outline"
								size="icon"
								className="absolute top-3 right-3"
								onClick={copyToClipboard}
							>
								{interacted ? (
									<Check className="size-5 shrink-0" />
								) : (
									<Copy className="size-5 shrink-0" />
								)}
							</Button>
							<div
								className="overflow-auto text-sm mr-16"
								dangerouslySetInnerHTML={{ __html: transformText(text) }}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
