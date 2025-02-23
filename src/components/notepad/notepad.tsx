"use client";

import * as React from "react";
import Link from "next/link";
import {
	Plus,
	Search,
	NotepadText,
	AlignLeft,
	Check,
	Copy,
	Trash2,
	Download,
	Eraser,
	X,
} from "lucide-react";
import { nanoid } from "nanoid";
import { Button } from "../ui/button";
import { geistMono } from "~/util/fonts";
import { LOCAL_STORAGE_KEY } from "~/util/constants";
import { useToast } from "~/hooks/use-toast";
import { formatDate } from "~/util/formatDate";
import { getWordCount } from "~/util/getWordCount";
import { ModeToggle } from "../mode-toggle";
import { useMediaQuery } from "~/hooks/use-media-query";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogTrigger,
	AlertDialogDescription,
	AlertDialogFooter,
} from "../ui/alert-dialog";

type Note = {
	id: string;
	title: string;
	content: string;
	createdAt: string;
	lastModified: string;
};

export function Notepad() {
	const [notes, setNotes] = React.useState<Note[]>([]);
	const [selectedNote, setSelectedNote] = React.useState<Note | null>(null);
	const [interacted, setInteracted] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState("");
	const [isClient, setIsClient] = React.useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
	const { toast } = useToast();
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
				toast({
					description: "Failed to load notes. Please try again.",
					variant: "destructive",
					className: "rounded-lg",
				});
			}
		}
	}, [toast]);

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
		setSelectedNote(newNote);
	}

	function updateNoteContent(content: string) {
		if (!selectedNote) {
			return;
		}

		const updatedContent = {
			...selectedNote,
			content,
			lastModified: new Date().toISOString(),
		};

		setSelectedNote(updatedContent);
		setNotes(
			notes.map((note) =>
				note.id === selectedNote.id ? updatedContent : note,
			),
		);
	}

	function updateNoteTitle(title: string) {
		if (!selectedNote) {
			return;
		}

		const updatedTitle = {
			...selectedNote,
			title,
			lastModified: new Date().toISOString(),
		};

		setSelectedNote(updatedTitle);
		setNotes(
			notes.map((note) => (note.id === selectedNote.id ? updatedTitle : note)),
		);
	}

	function clearNoteContent() {
		if (!selectedNote) {
			return;
		}

		if (!selectedNote.content) {
			toast({
				description: "You cannot clear an empty string. Please try again.",
				variant: "destructive",
				className: "rounded-lg",
			});
			return;
		}

		const clearedNote = {
			...selectedNote,
			content: "",
			lastModified: new Date().toISOString(),
		};

		setSelectedNote(clearedNote);
		setNotes(
			notes.map((note) => (note.id === selectedNote.id ? clearedNote : note)),
		);
	}

	function deleteNote(id: string) {
		setNotes(notes.filter((note) => note.id !== id));
		if (selectedNote?.id === id) {
			setSelectedNote(
				notes.length > 1 ? notes.find((n) => n.id !== id) || null : null,
			);
		}
	}

	function setActiveNoteAndCloseSidebar(note: Note) {
		setSelectedNote(note);
		if (isMobile) {
			setIsSidebarOpen(false);
		}
	}

	function closeActiveNote() {
		if (!selectedNote) {
			return;
		}

		setSelectedNote(null);
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

	function copyNoteToClipboard(content: string) {
		if (!content) {
			toast({
				description: "You cannot copy an empty string. Please try again.",
				variant: "destructive",
				className: "rounded-lg",
			});
			return;
		}

		navigator.clipboard.writeText(content).then(() => {
			setInteracted(true);

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
			<div className="top-0 w-full bg-background border-b border-border/40 flex items-center justify-between h-14 px-6">
				<div className="flex items-center gap-2">
					<Button
						variant="ghost"
						className="rounded-lg px-2 py-1 h-8"
						onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					>
						<AlignLeft />
					</Button>
					<Link href="/" className="flex items-center space-x-2">
						<NotepadText />
						<h1 className="font-bold tracking-tighter">SimplyNote</h1>
					</Link>
				</div>
				<div className="flex items-center justify-end">
					<ModeToggle />
				</div>
			</div>
			<div className="flex flex-1 overflow-hidden">
				<aside
					className={`border-r border-border/40 flex flex-col transition-all duration-300 ${
						isSidebarOpen
							? isMobile
								? "w-full"
								: "w-72"
							: "w-0 overflow-hidden"
					}`}
				>
					<div className="p-4">
						<div className="flex flex-col space-y-2">
							<Button className="rounded-lg w-full" onClick={createNote}>
								<Plus className="size-5" /> New Note
							</Button>
							<div className="relative">
								<input
									value={searchQuery}
									placeholder="Search note..."
									className="peer pl-10 p-2 rounded-lg h-10 text-sm border bg-background transition hover:border-teal-500 focus:border-teal-500 ring-0 outline-none w-full"
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
								<Search className="size-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 peer-hover:text-teal-500 peer-focus:text-teal-500" />
							</div>
						</div>
					</div>
					<div className="flex-1 overflow-y-auto">
						<div className="flex flex-col">
							{isClient &&
								filteredNotes.map((note) => (
									<div
										key={note.id}
										className={`cursor-pointer block p-4 transition hover:bg-accent ${
											selectedNote?.id === note.id
												? "bg-accent text-accent-foreground"
												: ""
										}`}
										onClick={() => setActiveNoteAndCloseSidebar(note)}
									>
										<div className="flex flex-col space-y-3">
											<h3 className="font-semibold">{note.title}</h3>
											<p className="text-sm whitespace-pre-wrap">
												{note.content || "Blank"}
											</p>
											<p className="text-muted-foreground text-sm">
												{formatDate(note.lastModified, isClient)}
											</p>
										</div>
									</div>
								))}
						</div>
					</div>
				</aside>
				<main className="flex-1 overflow-hidden flex flex-col">
					{(isClient && selectedNote === null) || selectedNote === undefined ? (
						<>
							<div className="h-screen flex items-center justify-center container">
								<p className="text-sm text-muted-foreground">
									No selected note found. Select one to get started.
								</p>
							</div>
						</>
					) : (
						selectedNote && (
							<>
								<div className="flex items-center px-4 py-2 w-full border-b border-border/40">
									<input
										type="text"
										value={selectedNote.title}
										onChange={(e) => updateNoteTitle(e.target.value)}
										className="text-lg font-semibold bg-transparent border-none outline-none ring-0"
									/>
								</div>
								<div className="flex items-center gap-1 border-b border-border/40 p-2">
									<Button
										title="Copy note to clipboard"
										aria-label="Copy note to clipboard"
										variant="ghost"
										className="h-8 px-2 py-1 rounded-lg"
										onClick={() => copyNoteToClipboard(selectedNote.content)}
									>
										{interacted ? <Check /> : <Copy />}
									</Button>
									<Button
										title="Export"
										aria-label="Export"
										variant="ghost"
										className="h-8 px-2 py-1 rounded-lg"
										onClick={() => exportNote(selectedNote)}
									>
										<Download />
									</Button>
									<Button
										title="Clear note"
										aria-label="Clear note"
										variant="ghost"
										className="h-8 px-2 py-1 rounded-lg"
										onClick={clearNoteContent}
									>
										<Eraser />
									</Button>
									<Button
										title="Close note"
										aria-label="Close note"
										variant="ghost"
										className="h-8 px-2 py-1 rounded-lg"
										onClick={closeActiveNote}
									>
										<X />
									</Button>
									<ConfirmDelete
										deleteNote={() => deleteNote(selectedNote.id)}
									/>
								</div>
								<div className="flex-1 relative">
									<textarea
										title="Notepad"
										aria-label="Notepad"
										className={`${geistMono.className} h-[calc(100%-2rem)] bg-transparent w-full resize-none border-none outline-none p-4 rounded-none`}
										spellCheck={true}
										value={selectedNote!.content}
										onChange={(e) => updateNoteContent(e.target.value)}
									/>
									<div className="absolute bottom-4 right-4 p-2 text-sm text-muted-foreground">
										Words: {getWordCount(selectedNote.content)}
									</div>
								</div>
							</>
						)
					)}
				</main>
			</div>
		</div>
	);
}

function ConfirmDelete({ deleteNote }: { deleteNote: () => void }) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					title="Delete note"
					aria-label="Delete note"
					variant="ghost"
					className="h-8 px-2 py-1 rounded-lg"
				>
					<Trash2 />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="rounded-none md:rounded-lg">
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete the
						selected note. Proceed with caution.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className="rounded-lg">Cancel</AlertDialogCancel>
					<AlertDialogAction
						className="rounded-lg border border-red-600 text-red-600 bg-transparent hover:bg-red-600 hover:text-white"
						onClick={deleteNote}
					>
						Confirm Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
