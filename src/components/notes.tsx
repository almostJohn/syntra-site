"use client";

import * as React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, Trash2, Save, Plus, ArrowLeft } from "lucide-react";
import { nanoid } from "nanoid";
import { useToast } from "~/hooks/use-toast";
import { LOCAL_STORAGE_KEY } from "~/util/constants";

type Note = {
	id: string;
	title: string;
	content: string;
	createdAt: string;
	time: string;
};

export function Notes() {
	const [notes, setNotes] = React.useState<Note[]>([]);
	const [selectedNote, setSelectedNote] = React.useState<Note | null>(null);
	const [title, setTitle] = React.useState("");
	const [content, setContent] = React.useState("");
	const [searchTerm, setSearchTerm] = React.useState("");
	const { toast } = useToast();

	React.useEffect(() => {
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
					className: "text-sm",
				});
			}
		}
	}, [toast]);

	React.useEffect(() => {
		if (notes.length > 0) {
			localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
		}
	}, [notes]);

	const filteredNotes = notes.filter(
		(note) =>
			note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			note.content.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	function handleNoteSelect(note: Note) {
		setSelectedNote(note);
		setTitle(note.title);
		setContent(note.content);
	}

	function handleNewNote() {
		const newNote: Note = {
			id: nanoid(),
			title: "Untitled Note",
			content: "",
			createdAt: new Date().toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
				year: "numeric",
			}),
			time: new Date().toLocaleTimeString("en-US", {
				hour: "numeric",
				minute: "2-digit",
			}),
		};

		setNotes([newNote, ...notes]);
		handleNoteSelect(newNote);
	}

	function handleDeleteNote(id: string) {
		const updatedNotes = notes.filter((note) => note.id !== id);
		setNotes(updatedNotes);
		if (selectedNote && selectedNote.id === id) {
			setSelectedNote(null);
			setTitle("");
			setContent("");
		}
	}

	function handleSaveNote() {
		if (!selectedNote) {
			return;
		}

		const updatedNotes = notes.map((note) =>
			note.id === selectedNote.id
				? {
						...note,
						title,
						content,
						createdAt: new Date().toLocaleDateString("en-US", {
							month: "short",
							day: "numeric",
							year: "numeric",
						}),
						time: new Date().toLocaleTimeString("en-US", {
							hour: "numeric",
							minute: "2-digit",
						}),
				  }
				: note,
		);

		setNotes(updatedNotes);
		setSelectedNote(null);
		setTitle("");
		setContent("");
	}

	function handleBackToNotes() {
		setSelectedNote(null);
		setTitle("");
		setContent("");
	}

	return (
		<>
			<div className="flex items-center mb-6 text-sm">
				<span className="text-primary font-medium">Notes</span>
				{selectedNote && (
					<>
						<span className="mx-2">/</span>
						<span className="text-muted-foreground">{selectedNote.title}</span>
					</>
				)}
			</div>

			{selectedNote ? (
				<div className="bg-background border rounded-md border-border">
					<div className="p-4 flex items-center border-b border-border">
						<Button
							variant="ghost"
							size="icon"
							className="mr-2"
							onClick={handleBackToNotes}
						>
							<ArrowLeft className="size-5" />
						</Button>
						<input
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full bg-background font-medium border-none shadow-none focus-visible:ring-0 focus-visible:outline-none"
							placeholder="Note title"
						/>
						<Button
							variant="outline"
							size="sm"
							className="ml-2"
							onClick={handleSaveNote}
						>
							<Save className="size-4 mr-2" />
							Save
						</Button>
					</div>
					<div className="p-4 h-[calc(100vh-200px)]">
						<textarea
							value={content}
							onChange={(e) => setContent(e.target.value)}
							className="w-full bg-background h-full resize-none border-none shadow-none focus-visible:ring-0 focus-visible:outline-none"
							placeholder="Start typing your note here..."
						/>
					</div>
				</div>
			) : (
				<>
					<div className="flex flex-col gap-4 mb-6 md:flex-row md:justify-between">
						<h1 className="text-2xl text-left font-bold">My Notes</h1>
						<div className="relative">
							<Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
							<Input
								placeholder="Search notes..."
								className="pl-8 w-full"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
						<div
							className="border-2 border-dashed border-border rounded-md p-6 flex flex-col items-center justify-center h-60 cursor-pointer hover:bg-accent/50 transition-colors duration-300"
							onClick={handleNewNote}
						>
							<div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
								<Plus className="size-6 text-primary" />
							</div>
							<p className="text-muted-foreground font-medium">
								Create New Note
							</p>
						</div>

						{filteredNotes.map((note) => (
							<div
								key={note.id}
								className="block rounded-md overflow-hidden bg-background border border-border hover:shadow-lg transition-shadow cursor-pointer group"
							>
								<div
									className="flex flex-col h-full p-0"
									onClick={() => handleNoteSelect(note)}
								>
									<div className="p-4 border-b border-border">
										<div className="flex justify-between items-start">
											<h3 className="font-medium truncate">{note.title}</h3>
											<Button
												variant="ghost"
												size="icon"
												className="size-6 opacity-0 group-hover:opacity-100"
												onClick={(e) => {
													e.stopPropagation();
													handleDeleteNote(note.id);
												}}
											>
												<Trash2 className="size-4" />
											</Button>
										</div>
									</div>
									<div className="p-4 flex-1 overflow-hidden">
										<p className="text-sm text-muted-foreground line-clamp-4">
											{note.content}
										</p>
									</div>
									<div className="p-3 bg-muted/50 text-xs text-muted-foreground mt-auto">
										{note.createdAt} • {note.time}
									</div>
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</>
	);
}
