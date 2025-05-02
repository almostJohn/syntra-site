"use client";

import { useState, useEffect } from "react";
import { LOCAL_STORAGE_KEY } from "~/lib/constants";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import words from "an-array-of-english-words";
import { cn } from "~/lib/utils";

type Note = {
	content: string;
	createdDate: string;
};

export function Notes() {
	const [notes, setNotes] = useState<Note[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [newNote, setNewNote] = useState("");
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [activeNoteIndex, setActiveNoteIndex] = useState<number | null>(null);

	useEffect(() => {
		const savedNotes = localStorage.getItem(LOCAL_STORAGE_KEY);

		if (savedNotes) {
			try {
				const parsedNotes = JSON.parse(savedNotes);
				setNotes(parsedNotes);
			} catch (error_) {
				const error = error_ as Error;
				console.log("There was an error fetching notes: ", error);
			}
		}
	}, []);

	useEffect(() => {
		if (notes.length > 0) {
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
		}
	}, [notes]);

	const filteredNotes = notes.filter((note) =>
		note.content.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	function addNewNote() {
		if (newNote.trim() === "") return;

		const newEntry: Note = {
			content: newNote.trim(),
			createdDate: new Date().toISOString(),
		};

		setNotes([newEntry, ...notes]);
		setNewNote("");
		setSuggestions([]);
	}

	function deleteNote(indexToDelete: number) {
		const confirmed = window.confirm(
			"Are you sure you want to delete this note?",
		);
		if (!confirmed) return;

		setNotes(notes.filter((_, index) => index !== indexToDelete));
		window.alert("Note deleted.");
	}

	return (
		<div className="block p-4 bg-neutral-200/50">
			<div className="flex flex-col-reverse md:flex-row md:space-x-4">
				<div className="flex flex-col w-full md:w-96 space-y-4 pt-4 md:pt-0">
					<input
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="p-2 h-9 w-full bg-transparent border border-neutral-300 text-sm font-medium placeholder:text-neutral-500 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-blue-700 hover:border-blue-700 transition-colors"
						placeholder="search something..."
					/>
					{filteredNotes.length === 0 ? (
						<p className="text-sm text-center text-neutral-500">
							no notes found...
						</p>
					) : (
						<div className="h-72 overflow-y-auto">
							<div className="flex flex-col gap-2">
								{filteredNotes.map((item, index) => (
									<div
										key={index}
										className={cn(
											"h-full w-full flex flex-col cursor-pointer p-2 transition-colors",
											index === activeNoteIndex
												? "bg-neutral-300/60 hover:bg-neutral-300/80"
												: "bg-transparent hover:bg-neutral-300/60",
										)}
										onClick={() => {
											setNewNote(item.content);
											setActiveNoteIndex(
												notes.findIndex(
													(n) => n.createdDate === item.createdDate,
												),
											);
										}}
									>
										<p className="whitespace-pre-wrap text-sm">
											{item.content}
										</p>
										<div className="mt-auto pt-4 flex items-center justify-between">
											<p className="text-left text-xs">
												{new Date(item.createdDate).toLocaleString()}
											</p>
											<Button
												size="icon"
												className="h-7 p-0 bg-transparent hover:bg-transparent text-black group-hover:text-white"
												onClick={() => deleteNote(index)}
											>
												<Trash className="h-4 w-4" />
											</Button>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
				<div className="flex w-full flex-col space-y-2">
					<textarea
						name="note"
						placeholder="write your note..."
						value={newNote}
						onChange={(e) => {
							const value = e.target.value;
							setNewNote(value);

							const lastWord = value.split(/\s+/).pop() || "";
							if (lastWord.length >= 2) {
								const matches = words
									.filter((word) => word.startsWith(lastWord.toLowerCase()))
									.slice(0, 2);

								setSuggestions(matches);
							} else {
								setSuggestions([]);
							}
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter" && !e.shiftKey) {
								e.preventDefault();

								if (activeNoteIndex !== null) {
									if (newNote.trim() === "") return;

									const updatedNotes = [...notes];
									updatedNotes[activeNoteIndex] = {
										...updatedNotes[activeNoteIndex],
										content: newNote.trim(),
									};
									setNotes(updatedNotes);
									setNewNote("");
									setActiveNoteIndex(null);
									setSuggestions([]);
								} else {
									addNewNote();
								}
							}
						}}
						className="p-2 bg-transparent h-72 w-full text-sm font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-0 border border-neutral-300 transition-colors hover:border-blue-700 focus-visible:border-blue-700"
					/>
					{suggestions && suggestions.length > 0 && (
						<div className="border border-neutral-300 text-xs p-1 mt-1 max-h-40 overflow-y-auto">
							{suggestions.map((word) => (
								<Button
									key={word}
									size="xs"
									className="w-full px-1 py-0.5 rounded-none text-xs text-black bg-transparent hover:bg-neutral-300"
									onClick={() => {
										const wordsArray = newNote.trim().split(/\s+/);
										wordsArray.pop();
										const newText = [...wordsArray, word].join(" ") + " ";
										setNewNote(newText);
										setSuggestions([]);
									}}
								>
									{word}
								</Button>
							))}
						</div>
					)}
					<p className="text-xs text-neutral-500 mt-1">
						press{" "}
						<kbd className="px-1 border border-neutral-300 text-xs">enter</kbd>{" "}
						to add note,{" "}
						<kbd className="px-1 border border-neutral-300 text-xs">shift</kbd>{" "}
						+{" "}
						<kbd className="px-1 border border-neutral-300 text-xs">enter</kbd>{" "}
						for new line.
					</p>
					{activeNoteIndex !== null ? (
						<div className="flex flex-col gap-2">
							<Button
								className="rounded-none w-full"
								onClick={() => {
									if (newNote.trim() === "") return;

									const updatedNotes = [...notes];
									updatedNotes[activeNoteIndex] = {
										...updatedNotes[activeNoteIndex],
										content: newNote.trim(),
									};
									setNotes(updatedNotes);
									setNewNote("");
									setActiveNoteIndex(null);
									setSuggestions([]);
								}}
							>
								save changes
							</Button>
							<Button
								variant="outline"
								className="rounded-none w-full"
								onClick={() => {
									setActiveNoteIndex(null);
									setNewNote("");
									setSuggestions([]);
								}}
							>
								cancel
							</Button>
						</div>
					) : (
						<Button className="rounded-none w-full" onClick={addNewNote}>
							add note
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
