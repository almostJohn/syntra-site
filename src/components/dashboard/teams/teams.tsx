import { TeamList } from "./team-list";
import { Sparkles } from "lucide-react";

type Team = {
	id: string;
	name: string;
	description: string;
};

type TeamsProps = {
	teams: Team[];
};

export function Teams({ teams }: TeamsProps) {
	if (!teams || teams.length === 0) {
		return (
			<div className="py-16 flex items-center justify-center">
				<div className="flex flex-col space-y-6">
					<div className="mx-auto flex items-center justify-center">
						<Sparkles className="size-16 shrink-0 text-muted-foreground" />
					</div>
					<p className="text-muted-foreground text-sm">
						Unfortunately, you currently have no teams yet. Create a new one to
						get started.
					</p>
				</div>
			</div>
		);
	}

	return <TeamList teams={teams} />;
}
