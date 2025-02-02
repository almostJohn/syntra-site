"use client";

import * as React from "react";
import { Copy, Check, X } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { transformText } from "~/util/transformText";

type Note = {
	id: number;
	text: string;
};

export function Notepad() {
	const [newText, setNewText] = React.useState("");
	const [notes, setNotes] = React.useState<Note[]>([]);
	const [interacted, setInteracted] = React.useState(false);
	const [copiedNoteId, setCopiedNoteId] = React.useState<number | null>(null);
	const [error, setError] = React.useState<string | null>(null);

	function addNote(e: React.FormEvent) {
		e.preventDefault();

		if (!newText.trim()) {
			setError("Please provide atleast a text.");
			return;
		}

		setNotes([...notes, { id: Date.now(), text: newText }]);
		setError(null);
	}

	function removeNote(id: number) {
		setNotes(notes.filter((note) => note.id !== id));
	}

	function copyToClipboard(id: number, text: string) {
		navigator.clipboard.writeText(text).then(() => {
			setCopiedNoteId(id);

			setTimeout(() => {
				setCopiedNoteId(null);
			}, 2_000);
		});
	}

	function copyAllToClipboard() {
		navigator.clipboard.writeText(newText).then(() => {
			setInteracted(true);

			setTimeout(() => {
				setInteracted(false);
			}, 2_000);
		});
	}

	function clearText() {
		setNewText("");
	}

	return (
		<div className="block p-4 border border-border rounded-md shadow-sm">
			<div className="flex flex-col space-y-6">
				<div className="flex justify-between w-full">
					<div className="flex flex-col space-y-1">
						<h3 className="font-medium tracking-tight">Notepad</h3>
						<p className="text-xs font-light italic text-muted-foreground">
							Tip: Use **bold**, *italic*, __underline__, or `inline code` for
							text formatting.
						</p>
						<p className="text-xs font-light italic text-orange-500">
							Warning: Refreshing the site or changing tabs will cause your data
							to be lost.
						</p>
					</div>
					<Button
						onClick={clearText}
						variant="ghost"
						className="hover:bg-transparent hover:underline"
					>
						Clear
					</Button>
				</div>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div className="w-full">
						<form onSubmit={addNote} className="flex flex-col space-y-4">
							<Textarea
								value={newText}
								onChange={(e) => setNewText(e.target.value)}
								placeholder="Start typing here..."
								className="h-80 text-sm"
							/>
							<div className="flex items-center justify-start">
								<Button type="submit" size="sm">
									Add Note
								</Button>
							</div>
						</form>
					</div>
					<div className="w-full">
						<div className="relative h-80 p-3 text-sm rounded-md border bg-background overflow-y-auto">
							<Button
								variant="outline"
								size="sm"
								className="absolute z-50 top-3 right-3"
								onClick={copyAllToClipboard}
							>
								{interacted ? (
									<Check className="size-5 shrink-0 text-teal-500" />
								) : (
									<Copy className="size-5 shrink-0" />
								)}
							</Button>
							<div
								className="overflow-auto mr-24"
								dangerouslySetInnerHTML={{ __html: transformText(newText) }}
							/>
						</div>
					</div>
				</div>
				{notes.length > 0 && (
					<ul className="space-y-2">
						{notes.map((note) => (
							<li
								key={note.id}
								className="block p-4 rounded-md border bg-background"
							>
								<div className="flex justify-between w-full">
									<div className="flex items-center justify-start mr-6">
										<p className="text-sm">{note.text}</p>
									</div>
									<div className="flex justify-end space-x-2">
										<Button
											variant="outline"
											size="icon"
											onClick={() => copyToClipboard(note.id, note.text)}
										>
											{copiedNoteId === note.id ? (
												<Check className="size-5 shrink-0 text-teal-500" />
											) : (
												<Copy className="size-5 shrink-0" />
											)}
										</Button>
										<Button
											variant="outline"
											size="icon"
											onClick={() => removeNote(note.id)}
										>
											<X className="size-5 shrink-0" />
										</Button>
									</div>
								</div>
							</li>
						))}
					</ul>
				)}
				{error && <p className="text-sm text-red-600">{error}</p>}
			</div>
		</div>
	);
}
