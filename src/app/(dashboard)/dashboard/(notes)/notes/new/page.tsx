import { CreateNoteForm } from "@/components/dashboard/notes/create-note-form";

export default function CreateNotePage() {
	return (
		<div className="p-8 min-h-screen bg-muted flex flex-col space-y-6">
			<CreateNoteForm />
		</div>
	);
}
