import { getUserStats } from "@/data/queries";
import { StatCard } from "./stat-card";
import { Folder, FolderKanban, Scroll, Users } from "lucide-react";

type StatsProps = {
	userId: string;
};

export async function Stats({ userId }: StatsProps) {
	const stats = await getUserStats(userId);

	const boardTrend =
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
			<StatCard
				title="Total Projects"
				count={stats.totalProjects}
				className="bg-blue-50 border border-blue-600 text-blue-600"
				textColor="text-blue-600"
				icon={Folder}
			/>
			<StatCard
				title="Active Boards"
				count={stats.activeBoards}
				trend={boardTrend}
				className="bg-green-50 border border-green-600 text-green-600"
				textColor="text-green-600"
				icon={FolderKanban}
			/>
			<StatCard
				title="Notes Created"
				count={stats.notesCreated}
				trend={noteTrend}
				className="bg-orange-50 border border-orange-600 text-orange-600"
				textColor="text-orange-600"
				icon={Scroll}
			/>
			<StatCard
				title="Team Members"
				count={stats.teamMembers}
				trend={memberTrend}
				className="bg-purple-50 border border-purple-600 text-purple-600"
				textColor="text-purple-600"
				icon={Users}
			/>
		</div>
	);
}
