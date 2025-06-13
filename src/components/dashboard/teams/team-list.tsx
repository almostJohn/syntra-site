import { TeamItem } from "./team-item";

type Team = {
	id: string;
	name: string;
	description: string;
};

type TeamListProps = {
	teams: Team[];
};

export function TeamList({ teams }: TeamListProps) {
	return (
		<div className="flex flex-col gap-4">
			{teams.map((team) => (
				<TeamItem
					key={team.id}
					id={team.id}
					name={team.name}
					description={team.description}
				/>
			))}
		</div>
	);
}
