"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, Trash2, Plus } from "lucide-react";
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
	const [searchTerm, setSearchTerm] = React.useState("");
	const { toast } = useToast();
	const router = useRouter();

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
		router.push(`/notes/${note.id}`);
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

		const updatedNotes = [newNote, ...notes];
		setNotes(updatedNotes);
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedNotes));

		router.push(`/notes/${newNote.id}`);
	}

	function handleDeleteNote(id: string) {
		const updatedNotes = notes.filter((note) => note.id !== id);
		setNotes(updatedNotes);
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedNotes));
	}

	return (
		<>
			<div className="flex items-center mb-6 text-sm">
				<span className="text-primary font-medium">Notes</span>
			</div>

			<div className="flex flex-col gap-4 mb-6 md:flex-row md:justify-between">
				<h1 className="text-2xl font-bold text-left">My Notes</h1>
				<div className="relative">
					<Search className="absolute left-2 top-2.5 size-4 text-muted-foreground" />
					<Input
						placeholder="Search notes..."
						value={searchTerm}
						className="w-full pl-8"
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				<div
					className="border border-dashed rounded-md p-6 flex flex-col items-center justify-center h-60 cursor-pointer hover:bg-accent/60 transition duration-300"
					onClick={handleNewNote}
				>
					<div className="size-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
						<Plus className="size-6 text-primary" />
					</div>
					<p className="text-muted-foreground font-medium text-sm">
						Create New Note
					</p>
				</div>

				{filteredNotes.map((note) => (
					<div
						key={note.id}
						className="block rounded-md overflow-hidden bg-background border border-border transition duration-300 cursor-pointer group hover:border-foreground"
					>
						<div
							className="flex flex-col h-full p-0"
							onClick={() => handleNoteSelect(note)}
						>
							<div className="p-4 border-b border-dashed border-border transition duration-300 group-hover:border-foreground">
								<div className="flex items-start justify-between">
									<h3 className="font-medium truncate leading-snug">
										{note.title}
									</h3>
									<Button
										size="icon"
										variant="ghost"
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
								<p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-4">
									{note.content}
								</p>
							</div>
							<div className="p-3 bg-muted/60 text-xs text-muted-foreground mt-auto transition duration-300 group-hover:bg-foreground group-hover:text-background">
								{note.createdAt} • {note.time}
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
