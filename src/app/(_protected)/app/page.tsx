import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { H1 } from "@/components/ui/heading";
import { P } from "@/components/ui/paragraph";

export default async function AppPage() {
	const currentUser = await auth.getCurrentUser();

	if (!currentUser) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="grid gap-1">
					<H1>Projects</H1>
					<P>Stay on top of your projects and manage them all in one place.</P>
				</div>
			</div>
		</div>
	);
}
