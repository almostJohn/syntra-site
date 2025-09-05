import { AnalyticsService } from "@/services/analytics.service";
import { Icons } from "./icons";

export async function Analytics() {
	const { data } = await AnalyticsService.getSize();

	return (
		<>
			<div className="grid grid-cols-2 gap-6 pt-12 md:grid-cols-5">
				<div className="text-center">
					<div className="text-3xl font-bold text-orange-800">
						{data?.totalUsers || 0}
					</div>
					<div className="mt-1 flex items-center justify-center gap-1 text-sm text-orange-600">
						<Icons.user className="size-6 shrink-0" />{" "}
						{data?.totalUsers === 1 ? "User" : "Users"}
					</div>
				</div>
				<div className="text-center">
					<div className="text-3xl font-bold text-orange-800">
						{data?.totalProjects || 0}
					</div>
					<div className="mt-1 flex items-center justify-center gap-1 text-sm text-orange-600">
						<Icons.folders className="size-6 shrink-0" />{" "}
						{data?.totalProjects === 1 ? "Project" : "Projects"}
					</div>
				</div>
				<div className="text-center">
					<div className="text-3xl font-bold text-orange-800">
						{data?.totalTeams || 0}
					</div>
					<div className="mt-1 flex items-center justify-center gap-1 text-sm text-orange-600">
						<Icons.userGroup className="size-6 shrink-0" />{" "}
						{data?.totalTeams === 1 ? "Team" : "Teams"}
					</div>
				</div>
				<div className="text-center">
					<div className="text-3xl font-bold text-orange-800">
						{data?.totalComments || 0}
					</div>
					<div className="mt-1 flex items-center justify-center gap-1 text-sm text-orange-600">
						<Icons.comments className="size-6 shrink-0" />{" "}
						{data?.totalComments === 1 ? "Comment" : "Comments"}
					</div>
				</div>
				<div className="hidden text-center md:block">
					<div className="text-3xl font-bold text-orange-800">
						{data?.totalTasks || 0}
					</div>
					<div className="mt-1 flex items-center justify-center gap-1 text-sm text-orange-600">
						<Icons.tasks className="size-6 shrink-0" />{" "}
						{data?.totalTasks === 1 ? "Task" : "Tasks"}
					</div>
				</div>
			</div>
			<div className="mt-6 flex flex-col items-center justify-center text-center md:hidden">
				<div className="text-3xl font-bold text-orange-800">
					{data?.totalTasks || 0}
				</div>
				<div className="mt-1 flex items-center justify-center gap-1 text-sm text-orange-600">
					<Icons.tasks className="size-6 shrink-0" />{" "}
					{data?.totalTasks === 1 ? "Task" : "Tasks"}
				</div>
			</div>
		</>
	);
}
