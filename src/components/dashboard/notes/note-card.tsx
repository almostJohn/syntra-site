import { NextLink } from "@/components/ui/next-link";
import { formatDistanceToNow } from "date-fns";

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
		<NextLink
			href={`/dashboard/notes/${note.id}`}
			className="flex flex-col bg-background rounded-xl p-6 transition-all hover:shadow-xl duration-300 hover:-translate-y-1 border backdrop-blur-sm"
		>
			<div className="pb-3">
				<h4 className="text-sm font-medium">{note.title}</h4>
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
		</NextLink>
	);
}
