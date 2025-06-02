import { CreateNoteForm } from "@/components/forms/create-note-form";

export const metadata = {
	title: "New note",
};

export default function CreateNotePage() {
	return (
		<div className="min-h-screen p-6 bg-muted">
			<CreateNoteForm />
		</div>
	);
}
