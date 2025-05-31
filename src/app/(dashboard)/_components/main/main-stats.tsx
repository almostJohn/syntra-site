import { getUserStats } from "@/data/queries";
import { TotalProjects } from "./cards/total-projects";
import { ActiveBoards } from "./cards/active-boards";
import { NotesCreated } from "./cards/notes-created";
import { TeamMembers } from "./cards/team-members";

type MainStatsProps = {
	userId: string;
};

export async function MainStats({ userId }: MainStatsProps) {
	const stats = await getUserStats(userId);

	const activeBoard =
		stats.activeBoardsLastMonth === 0
			? "No data from last month"
			: `+${stats.activeBoardsLastMonth} new this month`;

	const noteTrend =
		stats.notesTrend === 0
			? "No data from last month"
			: `+${((stats.notesLastWeek / stats.notesTrend) * 100).toFixed(0)}% from last month`;

	const memberTrend =
		stats.teamMembersLastMonth === 0
			? "No change"
			: `+${stats.teamMembersLastMonth} new this month`;

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
			<TotalProjects title="Total Projects" count={stats.totalProjects} />
			<ActiveBoards
				title="Active Boards"
				count={stats.activeBoards}
				trend={activeBoard}
			/>
			<NotesCreated
				title="Notes Created"
				count={stats.notesCreated}
				trend={noteTrend}
			/>
			<TeamMembers
				title="Team Members"
				count={stats.teamMembers}
				trend={memberTrend}
			/>
		</div>
	);
}
