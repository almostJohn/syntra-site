import { TeamItem } from "./team-item";
import { getMembersFromTeams } from "@/data/db/queries/get-members-from-teams";

type Team = {
	id: string;
	name: string;
	description: string;
};

type TeamListProps = {
	teams: Team[];
};

export async function TeamList({ teams }: TeamListProps) {
	const teamWithMembers = await Promise.all(
		teams.map(async (team) => {
			const members = await getMembersFromTeams(team.id);
			return {
				...team,
				members,
			};
		}),
	);

	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
			{teamWithMembers.map((team) => (
				<TeamItem key={team.id} id={team.id} name={team.name} />
			))}
		</div>
	);
}
