import * as React from "react";
import { Button } from "./ui/button";
import { Save, FileDown, Copy, Trash, Lightbulb, Sun } from "lucide-react";
import { Icons } from "./icons";
import { geistMono } from "~/util/fonts";

export function NotepadIllustration() {
	return (
		<div className="w-full">
			<div className="flex flex-col h-[400px] bg-background border rounded-xl shadow-lg">
				<div className="flex items-center w-full bg-muted px-3 py-1 rounded-t-lg">
					<div className="flex items-center space-x-2">
						<Icons.logo className="size-4" />
						<span className="text-sm">Untitled</span>
					</div>
				</div>
				<div className="flex items-center gap-2 w-full bg-muted/20 border-b p-2">
					<Button
						variant="outline"
						size="icon"
						className="size-8 rounded-xl"
						title="Save"
						aria-label="Save"
						disabled
					>
						<Save className="size-4 shrink-0" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="size-8 rounded-xl"
						title="Export"
						aria-label="Export"
						disabled
					>
						<FileDown className="size-4 shrink-0" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="size-8 rounded-xl"
						title="Copy to Clipboard"
						aria-label="Copy to Clipboard"
						disabled
					>
						<Copy className="size-4 shrink-0" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="size-8 rounded-xl"
						title="Clear Text"
						aria-label="Clear Text"
						disabled
					>
						<Trash className="size-4 shrink-0" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="size-8 rounded-xl"
						title="Knowledge Base"
						aria-label="Knowledge Base"
						disabled
					>
						<Lightbulb className="size-4 shrink-0" />
					</Button>
					<Button
						variant="outline"
						size="icon"
						className="size-8 rounded-xl"
						title="Knowledge Base"
						aria-label="Knowledge Base"
						disabled
					>
						<Sun className="size-4 shrink-0" />
					</Button>
				</div>
				<div
					className={`${geistMono.className} flex-1 resize-none p-3 h-96 w-full rounded-none transition focus:ring-0 focus:outline-none text-left`}
				>
					The document you&apos;re working on will be automatically restored
					when you return, even if you close and reopen your browser. SimplyNote
					uses the Web Storage API to save your notes automatically and also
					supports autocomplete for text completion.
				</div>
				<div className="flex items-center justify-between w-full px-3 py-1 bg-muted shadow rounded-b-lg">
					<div className="flex items-center gap-3">
						<span className="text-sm">col 2</span>
						<span className="text-sm">row 3</span>
					</div>
					<div className="flex items-center justify-end gap-3">
						<span className="text-sm">117 characters</span>
						<span className="text-sm">EN-US</span>
						<span className="text-sm">UTF-8</span>
					</div>
				</div>
			</div>
		</div>
	);
}
