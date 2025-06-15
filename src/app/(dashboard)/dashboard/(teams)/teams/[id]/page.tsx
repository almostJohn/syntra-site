import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/data/db/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getUserTeams } from "@/data/db/queries/get-user-teams";
import { Header } from "@/components/dashboard/teams/individual/header";

export async function generateMetadata({
	params,
}: {
	params: { id: string };
}): Promise<Metadata> {
	const team = await prisma.team.findUnique({
		where: {
			id: params.id,
		},
		select: {
			name: true,
		},
	});

	if (!team) {
		notFound();
	}

	return {
		title: `${team.name}`,
	};
}

export default async function TeamPage({ params }: { params: { id: string } }) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect("/login");
	}

	const teams = await getUserTeams(currentUser.id);

	if (!teams || teams.length === 0) {
		notFound();
	}

	const team = teams.find((t) => t.id === params.id);

	if (!team) {
		notFound();
	}

	return (
		<div className="p-8 min-h-screen bg-muted flex flex-col space-y-6">
			<Header name={team.name} />
		</div>
	);
}
