import { NoteCard } from "./note-card";

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
	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{notes.map((note) => (
				<NoteCard key={note.id} note={note} />
			))}
		</div>
	);
}
