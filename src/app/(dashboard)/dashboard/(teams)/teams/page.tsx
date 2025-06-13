import { redirect } from "next/navigation";
import { Header } from "@/components/dashboard/teams/header";
import { Teams } from "@/components/dashboard/teams/teams";
import { getCurrentUser } from "@/lib/auth";
import { getAllTeams } from "@/data/db/queries/get-all-teams";

export default async function TeamsPage() {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect("/login");
	}

	const teams = await getAllTeams(currentUser.id);

	return (
		<div className="p-8 min-h-screen bg-muted flex flex-col space-y-6">
			<Header />
			<Teams teams={teams} />
		</div>
	);
}
