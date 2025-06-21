"use client";

import { useState } from "react";
import { NoteCard } from "./note-card";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type Note = {
	id: string;
	title: string | null;
	content: string;
	created_at: Date;
};

type NoteListProps = {
	notes: Note[];
};

export function NoteList({ notes }: NoteListProps) {
	const [query, setQuery] = useState("");
	const [sortBy, setSortBy] = useState("newest");

	const filteredNotes = notes
		.filter(
			(note) =>
				(note.title || "").toLowerCase().includes(query.toLowerCase()) ||
				note.content.toLowerCase().includes(query.toLowerCase()),
		)
		.sort((a, b) => {
			if (sortBy === "newest") {
				return (
					new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
				);
			}

			if (sortBy === "oldest") {
				return (
					new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
				);
			}

			return 0;
		});

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between w-full">
				<div className="flex items-center justify-start gap-2">
					<Filter className="size-4 text-muted-foreground" />
					<Select value={sortBy} onValueChange={setSortBy}>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Sort By" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="newest">Newest First</SelectItem>
							<SelectItem value="oldest">Oldest First</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="flex items-center justify-end">
					<div className="relative">
						<Search className="size-4 shrink-0 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-all" />
						<Input
							className="pl-9 w-[350px] focus-visible:border-blue-300 focus-visible:ring-blue-600/40 transition-all"
							placeholder="Search notes..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{filteredNotes.map((note) => (
					<NoteCard key={note.id} note={note} />
				))}
			</div>
		</div>
	);
}
