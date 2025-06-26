import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/sessions";

export default async function NotesPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="p-8 min-h-screen bg-muted flex flex-col space-y-6">
			<h1>Notes Page</h1>
		</div>
	);
}
