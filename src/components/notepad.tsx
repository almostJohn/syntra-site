"use client";

import * as React from "react";
import { Button } from "./ui/button";
import {
	NotebookIcon,
	FileDown,
	Save,
	Trash,
	Copy,
	Check,
	X,
} from "lucide-react";
import { geistMono } from "~/util/fonts";
import { transformText } from "~/util/transformText";
import { KnowledgeBase } from "./knowledge-base";

export function Notepad() {
	const [text, setText] = React.useState("");
	const [noteTitle, setNoteTitle] = React.useState("");
	const [savedNotes, setSavedNotes] = React.useState<
		Array<{ title: string; content: string }>
	>([]);
	const [suggestions, setSuggestions] = React.useState<string[]>([]);
	const [selectedSuggestion, setSelectedSuggestion] = React.useState(-1);
	const [wordSet, setWordSet] = React.useState<Set<string>>(new Set());
	const [interacted, setInteracted] = React.useState(false);
	const [copiedNote, setCopiedNote] = React.useState(false);
	const [colCount, setColCount] = React.useState(1);
	const [rowCount, setRowCount] = React.useState(1);
	const [charCount, setCharCount] = React.useState(0);
	const [error, setError] = React.useState<string | null>(null);
	const [isTitleFocus, setIsTitleFocus] = React.useState(false);
	const textareaRef = React.useRef<HTMLTextAreaElement>(null);
	const suggestionsRef = React.useRef<HTMLUListElement>(null);

	React.useEffect(() => {
		const loadWords = async () => {
			try {
				const words = await import("an-array-of-english-words");
				setWordSet(new Set(words.default));
			} catch (error_) {
				const error = error_ as Error;
				console.error(error, error.message);
				setWordSet(
					new Set([
						"the",
						"be",
						"to",
						"of",
						"and",
						"in",
						"that",
						"have",
						"it",
						"for",
					]),
				);
			}
		};
		loadWords();
	}, []);

	React.useEffect(() => {
		const savedText = localStorage.getItem("notepadText");
		if (savedText) {
			setText(savedText);
		}
	}, []);

	React.useEffect(() => {
		const storedNotes = localStorage.getItem("storedNotes");
		if (storedNotes) {
			setSavedNotes(JSON.parse(storedNotes));
		}
	}, []);

	React.useEffect(() => {
		localStorage.setItem("storedNotes", JSON.stringify(savedNotes));
	}, [savedNotes]);

	React.useEffect(() => {
		localStorage.setItem("notepadText", text);
	}, [text]);

	React.useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.setSelectionRange(text.length, text.length);
		}
	}, [text]);

	React.useEffect(() => {
		setCharCount(text.length);
		setRowCount(text.split("\n").length);
		setColCount(text.split(/\s+/).filter((word) => word.length > 0).length);
	}, [text]);

	function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		const newText = e.target.value;
		const cursorPosition = e.target.selectionStart;
		setText(newText);

		const wordBeforeCursor =
			newText.slice(0, cursorPosition).split(/\s+/).pop() || "";

		if (wordBeforeCursor.length > 1) {
			const suggestions = Array.from(wordSet)
				.filter((word) =>
					word.toLowerCase().startsWith(wordBeforeCursor.toLowerCase()),
				)
				.slice(0, 5);
			setSuggestions(suggestions);
			setSelectedSuggestion(-1);
		} else {
			setSuggestions([]);
		}

		setTimeout(() => {
			if (textareaRef.current) {
				textareaRef.current.selectionStart = cursorPosition;
				textareaRef.current.selectionEnd = cursorPosition;
			}
		}, 0);
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
		if (suggestions.length === 0) return;

		if (e.key === "ArrowDown") {
			e.preventDefault();
			setSelectedSuggestion((prev) => (prev + 1) % suggestions.length);
			scrollToSelectedSuggestion();
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setSelectedSuggestion(
				(prev) => (prev - 1 + suggestions.length) % suggestions.length,
			);
			scrollToSelectedSuggestion();
		} else if (e.key === "Enter" && selectedSuggestion > -1) {
			e.preventDefault();
			applySuggestion(suggestions[selectedSuggestion]);
		} else if (e.key === "Tab" && suggestions.length > 0) {
			e.preventDefault();
			applySuggestion(
				suggestions[selectedSuggestion === -1 ? 0 : selectedSuggestion],
			);
		} else if (e.key === "Escape") {
			setSuggestions([]);
			setSelectedSuggestion(-1);
		}
	}

	function scrollToSelectedSuggestion() {
		if (suggestionsRef.current && selectedSuggestion !== -1) {
			const selectedElement = suggestionsRef.current.children[
				selectedSuggestion
			] as HTMLElement;
			if (selectedElement) {
				selectedElement.scrollIntoView({ block: "nearest" });
			}
		}
	}

	function applySuggestion(suggestion: string) {
		if (textareaRef.current) {
			const cursorPosition = textareaRef.current.selectionStart;
			const textBeforeCursor = text.slice(0, cursorPosition);
			const textAfterCursor = text.slice(cursorPosition);
			const lastWordBeforeCursor = textBeforeCursor.split(/\s+/).pop() || "";
			const newTextBeforeCursor =
				textBeforeCursor.slice(0, -lastWordBeforeCursor.length) + suggestion;
			const newText = newTextBeforeCursor + " " + textAfterCursor.trimStart();

			setText(newText);

			const newCursorPosition = newTextBeforeCursor.length + 1;
			setTimeout(() => {
				if (textareaRef.current) {
					textareaRef.current.selectionStart = newCursorPosition;
					textareaRef.current.selectionEnd = newCursorPosition;
					textareaRef.current.focus();
				}
			}, 0);
		}
		setSuggestions([]);
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(text).then(() => {
			setInteracted(true);

			setTimeout(() => {
				setInteracted(false);
			}, 2_000);
		});
	}

	function saveNote() {
		if (!text) {
			setError("Please provide at least a text!");
			return;
		}

		const newNote = { title: noteTitle || "Untitled", content: text };
		setSavedNotes([...savedNotes, newNote]);
		setText("");
		setNoteTitle("");
		setError(null);
		localStorage.setItem(
			"storedNotes",
			JSON.stringify([...savedNotes, newNote]),
		);
	}

	function deleteNote(noteToDelete: { title: string; content: string }) {
		const updatedNotes = savedNotes.filter(
			(note) =>
				note.title !== noteToDelete.title ||
				note.content !== noteToDelete.content,
		);
		setSavedNotes(updatedNotes);
		localStorage.setItem("storedNotes", JSON.stringify(updatedNotes));
	}

	function clearText() {
		setText("");
		localStorage.removeItem("notepadText");
	}

	function exportToTxt() {
		const element = document.createElement("a");
		const file = new Blob([text], { type: "text/plain" });
		element.href = URL.createObjectURL(file);
		element.download = `${
			noteTitle || "Untitled"
		}-${new Date().toISOString()}.txt`;
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}

	function copyNoteToClipboard(note: string) {
		navigator.clipboard.writeText(note).then(() => {
			setCopiedNote(true);

			setTimeout(() => {
				setCopiedNote(false);
			}, 2_000);
		});
	}

	function handleSuggestionClick(suggestion: string) {
		applySuggestion(suggestion);
	}

	function handleSuggestionMouseEnter(index: number) {
		setSelectedSuggestion(index);
	}

	return (
		<div className="container max-w-screen-2xl">
			<div className="flex flex-col space-y-4 pt-6 pb-12">
				<div className="grid grid-cols-1 gap-4">
					<div className="w-full">
						<div className="relative flex flex-col bg-background border rounded-lg shadow-2xl">
							<div className="flex items-center w-full bg-muted border-b px-3 py-1">
								<div className="flex items-center space-x-2">
									<NotebookIcon className="size-4 shrink-0 text-blue-500" />
									<input
										type="text"
										value={noteTitle}
										onChange={(e) => setNoteTitle(e.target.value)}
										placeholder="Untitled"
										onFocus={() => setIsTitleFocus(true)}
										onBlur={() => setIsTitleFocus(false)}
										className={`text-sm leading-snug bg-transparent border-none outline-none w-full ${
											isTitleFocus ? "caret-blue-500" : "caret-transparent"
										}`}
									/>
								</div>
							</div>
							<div className="flex items-center gap-2 w-full bg-muted/20 border-b p-2">
								<Button
									variant="outline"
									size="icon"
									className="size-8 rounded-lg"
									title="Save"
									aria-label="Save"
									onClick={saveNote}
								>
									<Save className="size-4 shrink-0" />
								</Button>
								<Button
									variant="outline"
									size="icon"
									className="size-8 rounded-lg"
									title="Export"
									aria-label="Export"
									onClick={exportToTxt}
								>
									<FileDown className="size-4 shrink-0" />
								</Button>
								<Button
									variant="outline"
									onClick={copyToClipboard}
									size="icon"
									className="size-8 rounded-lg"
									title="Copy to Clipboard"
									aria-label="Copy to Clipboard"
								>
									{interacted ? (
										<>
											<Check className="size-4 shrink-0" />
										</>
									) : (
										<>
											<Copy className="size-4 shrink-0" />
										</>
									)}
								</Button>
								<Button
									variant="outline"
									onClick={clearText}
									size="icon"
									className="size-8 rounded-lg"
									title="Clear Text"
									aria-label="Clear Text"
								>
									<Trash className="size-4 shrink-0" />
								</Button>
								<KnowledgeBase />
							</div>
							<textarea
								aria-label="Notepad"
								ref={textareaRef}
								value={text}
								onChange={handleChange}
								onKeyDown={handleKeyDown}
								className={`${geistMono.className} resize-none h-96 rounded-none bg-background text-sm p-3 w-full focus:outline-none focus:ring-0`}
								spellCheck={true}
								rows={5}
							/>
							{suggestions.length > 0 && (
								<ul
									ref={suggestionsRef}
									className="absolute  z-10 w-full mt-4 bottom-0 flex flex-col bg-background border shadow-lg overflow-auto"
								>
									{suggestions.map((suggestion, i) => (
										<li
											key={suggestion}
											className="inline-flex items-center px-2 py-0.5 cursor-pointer w-full text-sm font-medium transition hover:bg-muted"
											onClick={() => handleSuggestionClick(suggestion)}
											onMouseEnter={() => handleSuggestionMouseEnter(i)}
										>
											{suggestion}
										</li>
									))}
								</ul>
							)}
							<div className="flex items-center justify-between px-3 py-1 bg-muted border shadow rounded-b-lg">
								<div className="flex items-center gap-3">
									<span className="text-sm">col {colCount}</span>
									<span className="text-sm">row {rowCount}</span>
								</div>
								<div className="flex items-center gap-3 justify-end">
									<span className="text-sm">{charCount} characters</span>
									<span className="text-sm">EN-US</span>
									<span className="text-sm">UTF-8</span>
								</div>
							</div>
						</div>
					</div>
					<div className="w-full">
						{error && (
							<div className="mt-3">
								<p className="text-sm text-red-600">{error}</p>
							</div>
						)}
						{savedNotes.length > 0 && (
							<div className="mt-5 flex flex-col space-y-4">
								<h1 className="text-lg font-medium leading-snug">
									Saved Notes
								</h1>
								<div className="flex flex-row flex-wrap gap-4">
									{savedNotes.map((note, i) => (
										<div
											key={i}
											className="block p-3 border bg-muted rounded-lg shadow-md w-full md:w-80"
										>
											<div className="flex justify-between w-full">
												<div className="flex flex-col space-y-2">
													<h2 className="font-semibold">{note.title}</h2>
													<div
														className="text-sm whitespace-pre-wrap mr-14"
														dangerouslySetInnerHTML={{
															__html: transformText(note.content),
														}}
													/>
												</div>
												<div className="flex justify-end gap-2">
													<Button
														variant="ghost"
														size="icon"
														className="size-8 hover:bg-transparent hover:text-blue-500"
														onClick={() => copyNoteToClipboard(note.content)}
													>
														{copiedNote ? (
															<Check className="size-4 shrink-0" />
														) : (
															<Copy className="size-4 shrink-0" />
														)}
													</Button>
													<Button
														variant="ghost"
														size="icon"
														className="size-8 hover:bg-transparent hover:text-red-600"
														onClick={() => deleteNote(note)}
													>
														<X className="size-4 shrink-0" />
													</Button>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
