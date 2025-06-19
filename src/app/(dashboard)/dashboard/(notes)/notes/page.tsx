import { redirect } from "next/navigation";
import { Header } from "@/components/dashboard/notes/header";
import { Notes } from "@/components/dashboard/notes/notes";
import { getCurrentUser } from "@/lib/auth";

export default async function NotesPage() {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect("/login");
	}

	return (
		<div className="p-8 min-h-screen bg-muted flex flex-col space-y-6">
			<Header />
			<Notes userId={currentUser.id} />
		</div>
	);
}
