import { formatDistanceToNow } from "date-fns";
import { UpdateNoteForm } from "./update-note-form";
import { DeleteNoteButton } from "./delete-note-button";

type Note = {
	id: string;
	title: string | null;
	content: string;
	created_at: Date;
};

type NoteCardProps = {
	note: Note;
};

export function NoteCard({ note }: NoteCardProps) {
	return (
		<div className="flex flex-col bg-background rounded-xl p-6 transition-all hover:shadow-xl duration-300 hover:-translate-y-1 border backdrop-blur-sm">
			<div className="pb-3 flex justify-between items-center">
				<h4 className="text-sm font-medium">{note.title}</h4>
				<div className="flex items-center">
					<UpdateNoteForm note={note} />
					<DeleteNoteButton noteId={note.id} />
				</div>
			</div>
			<div className="pt-0">
				<p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-3 mb-4 leading-relaxed">
					{note.content}
				</p>
			</div>
			<div className="mt-auto">
				<span className="text-sm text-muted-foreground">
					{formatDistanceToNow(new Date(note.created_at), { addSuffix: true })}
				</span>
			</div>
		</div>
	);
}
