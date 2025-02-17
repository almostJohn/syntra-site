"use client";

import * as React from "react";
import Link from "next/link";
import { nanoid } from "nanoid";
import {
	Check,
	Copy,
	X,
	Trash2,
	Plus,
	Loader2,
	AlignLeft,
	Download,
} from "lucide-react";
import { Icons } from "./icons";
import { LOCAL_STORAGE_KEY } from "~/util/constants";
import { formatDate } from "~/util/formatDate";
import { getWordCount } from "~/util/getWordCount";
import { Button } from "./ui/button";
import { geistMono } from "~/util/fonts";
import { useMediaQuery } from "~/hooks/use-media-query";

type Note = {
	id: string;
	title: string;
	content: string;
	createdAt: string;
	lastModified: string;
};

export function Notepad() {
	const [notes, setNotes] = React.useState<Note[]>([]);
	const [activeNote, setActiveNote] = React.useState<Note | null>(null);
	const [interacted, setInteracted] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState("");
	const [error, setError] = React.useState<string | null>(null);
	const [isClient, setIsClient] = React.useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
	const isMobile = useMediaQuery("(max-width: 767px)");

	React.useEffect(() => {
		setIsClient(true);

		const savedNotes = localStorage.getItem(LOCAL_STORAGE_KEY);

		if (savedNotes) {
			try {
				const parsedNotes = JSON.parse(savedNotes);
				setNotes(parsedNotes);
			} catch (error_) {
				const error = error_ as Error;
				console.error(error, error.message);
				setError("Failed to load notes. Please try again.");
			}
		}
	}, []);

	React.useEffect(() => {
		if (isClient && notes.length > 0) {
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
		}
	}, [isClient, notes]);

	function createNote() {
		const newNote: Note = {
			id: nanoid(),
			title: "Untitled",
			content: "",
			createdAt: new Date().toISOString(),
			lastModified: new Date().toISOString(),
		};

		setNotes([newNote, ...notes]);
		setActiveNote(newNote);
	}

	function updateNoteContent(content: string) {
		if (!activeNote) {
			return;
		}

		const updatedContent = {
			...activeNote,
			content,
			lastModified: new Date().toISOString(),
		};

		setActiveNote(updatedContent);
		setNotes(
			notes.map((note) => (note.id === activeNote.id ? updatedContent : note)),
		);
	}

	function updateNoteTitle(title: string) {
		if (!activeNote) {
			return;
		}

		const updatedTitle = {
			...activeNote,
			title,
			lastModified: new Date().toISOString(),
		};

		setActiveNote(updatedTitle);
		setNotes(
			notes.map((note) => (note.id === activeNote.id ? updatedTitle : note)),
		);
	}

	function clearNoteContent() {
		if (!activeNote) {
			return;
		}

		if (!activeNote.content) {
			setError("You cannot clear an empty string. Please try again.");
			return;
		}

		const clearedNote = {
			...activeNote,
			content: "",
			lastModified: new Date().toISOString(),
		};

		setActiveNote(clearedNote);
		setNotes(
			notes.map((note) => (note.id === activeNote.id ? clearedNote : note)),
		);
		setError(null);
	}

	function deleteNote(id: string) {
		setNotes(notes.filter((note) => note.id !== id));
		if (activeNote?.id === id) {
			setActiveNote(
				notes.length > 1 ? notes.find((n) => n.id !== id) || null : null,
			);
		}
	}

	function exportNote(note: Note) {
		const element = document.createElement("a");
		const file = new Blob([note.content], { type: "text/plain" });
		element.href = URL.createObjectURL(file);
		element.download = `${note.title}-${new Date().toISOString()}.txt`;
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}

	function setActiveNoteAndCloseSidebar(note: Note) {
		setActiveNote(note);
		if (isMobile) {
			setIsSidebarOpen(false);
		}
	}

	function copyNoteToClipboard(content: string) {
		if (!content) {
			setError("You cannot copy an empty string. Please try again.");
			return;
		}

		navigator.clipboard.writeText(content).then(() => {
			setInteracted(true);
			setError(null);

			setTimeout(() => {
				setInteracted(false);
			}, 2_000);
		});
	}

	const filteredNotes = notes.filter(
		(n) =>
			n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			n.content.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<div className="h-screen flex flex-col">
			<div className="bg-neutral-900 text-neutral-100 flex items-center gap-2 h-14 px-4">
				<Button
					variant="ghost"
					size="icon"
					className="hover:bg-transparent hover:text-white"
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
				>
					<AlignLeft className="size-5" />
				</Button>
				<Link href="/" className="flex items-center space-x-2">
					<Icons.logo />
					<h1 className="font-bold">SimplyNote</h1>
				</Link>
			</div>

			{error && (
				<div className="bg-red-600 text-white block px-3 py-0.5" role="alert">
					<div className="flex items-center justify-between w-full">
						<div className="flex items-center">
							<p className="text-xs font-medium">{error}</p>
						</div>
						<div className="flex items-center">
							<Button
								size="icon"
								variant="ghost"
								className="hover:bg-transparent hover:text-white"
								onClick={() => setError(null)}
							>
								<X />
							</Button>
						</div>
					</div>
				</div>
			)}

			<div className="flex flex-1 overflow-hidden">
				<aside
					className={`border-r border-neutral-300 flex flex-col transition-all duration-300 ${
						isSidebarOpen
							? isMobile
								? "w-full"
								: "w-80"
							: "w-0 overflow-hidden"
					}`}
				>
					<div className="p-4">
						<div className="flex flex-col space-y-2">
							<Button
								className="bg-blue-600 text-white rounded-none transition hover:bg-blue-700 w-full"
								onClick={createNote}
							>
								<Plus className="h-5 w-5" /> Create Note
							</Button>
							<input
								value={searchQuery}
								placeholder="Search note..."
								className="p-2 rounded-none h-10 text-sm border border-neutral-300 bg-transparent transition hover:border-blue-600 focus:border-blue-600 ring-0 outline-none"
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
					</div>
					<div className="flex-1 overflow-y-auto">
						{isClient &&
							filteredNotes.map((note) => (
								<div
									key={note.id}
									className={`cursor-pointer block p-4 transition hover:bg-neutral-200 ${
										activeNote?.id === note.id ? "bg-neutral-200" : ""
									}`}
									onClick={() => setActiveNoteAndCloseSidebar(note)}
								>
									<div className="flex justify-between w-full">
										<div className="flex flex-col space-y-0.5">
											<h3 className="font-medium">{note.title}</h3>
											<p className="text-sm text-neutral-500 whitespace-pre-wrap truncate">
												{note.content || "Blank"}
											</p>
											<p className="text-sm text-neutral-500">
												{formatDate(note.lastModified, isClient)}
											</p>
										</div>
										<div className="flex justify-end gap-2">
											<Button
												title="Export"
												size="icon"
												className="rounded-none bg-blue-600 text-white transition hover:bg-blue-700"
												onClick={() => exportNote(note)}
											>
												<Download className="size-4" />
											</Button>
											<Button
												title="Delete"
												size="icon"
												className="rounded-none bg-red-600 text-white transition hover:bg-red-700"
												onClick={() => deleteNote(activeNote!.id)}
											>
												<Trash2 className="size-4" />
											</Button>
										</div>
									</div>
								</div>
							))}
					</div>
				</aside>

				<main className="flex-1 overflow-hidden flex flex-col">
					{isClient && activeNote ? (
						<>
							<div className="relative h-[calc(100%-2.5rem)]">
								<div className="flex items-center justify-between w-full border-b border-neutral-300 px-4 py-2">
									<input
										type="text"
										value={activeNote.title}
										onChange={(e) => updateNoteTitle(e.target.value)}
										className="text-lg font-semibold bg-transparent border-none outline-none ring-0"
									/>
									<div className="flex gap-2">
										<Button
											title="Copy to Clipboard"
											size="icon"
											className="bg-transparent text-neutral-900 rounded-none transition hover:bg-neutral-200"
											onClick={() => copyNoteToClipboard(activeNote.content)}
										>
											{interacted ? (
												<Check className="size-4" />
											) : (
												<Copy className="size-4" />
											)}
										</Button>
										<Button
											title="Clear Text"
											size="icon"
											className="bg-transparent text-neutral-900 rounded-none transition hover:bg-neutral-200"
											onClick={clearNoteContent}
										>
											<X className="size-4" />
										</Button>
									</div>
								</div>
								<textarea
									title="Notepad"
									aria-label="Notepad"
									className={`${geistMono.className} h-[calc(100%-2rem)] bg-transparent w-full resize-none border-none outline-none p-4 rounded-none`}
									spellCheck={true}
									value={activeNote.content}
									onChange={(e) => updateNoteContent(e.target.value)}
								/>
								<div className="absolute bottom-0 right-4 p-2 text-sm text-neutral-500">
									Words: {getWordCount(activeNote.content)}
								</div>
							</div>
						</>
					) : (
						<div className="flex h-full items-center justify-center text-neutral-500 ml-4 md:ml-0">
							{isClient ? (
								"Select a note or create a new one to get started"
							) : (
								<>
									<Loader2 className="size-10 animate-spin text-muted-foreground mr-2" />{" "}
									Loading...
								</>
							)}
						</div>
					)}
				</main>
			</div>
		</div>
	);
}
