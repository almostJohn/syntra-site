import { NoteList } from "./note-list";
import { getAllNotes } from "@/data/db/queries/get-all-notes";
import { Icons } from "@/components/icons";

type NotesProps = {
	userId: string;
};

export async function Notes({ userId }: NotesProps) {
	const notes = await getAllNotes(userId);

	if (notes.length === 0) {
		return (
			<div className="mx-auto max-w-3xl flex flex-col space-y-2 items-center justify-center py-16 md:py-28">
				<div className="mx-auto flex justify-center">
					<Icons.sparkles className="size-16 shrink-0 text-muted-foreground" />
				</div>
				<div className="flex flex-col space-y-1 justify-center text-center">
					<p className="font-medium">No Notes Found</p>
					<p className="text-sm text-muted-foreground">
						Create a new note to get started.
					</p>
				</div>
			</div>
		);
	}

	return <NoteList notes={notes} />;
}
