import { Note } from "@/components/dashboard/notes/note";

export default function NotePage() {
	return (
		<div className="p-8 min-h-screen bg-muted flex flex-col space-y-6">
			<Note />
		</div>
	);
}
