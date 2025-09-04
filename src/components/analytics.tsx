import { AnalyticsService } from "@/services/analytics.service";
import { Icons } from "./icons";

export async function Analytics() {
	const { data } = await AnalyticsService.getSize();

	return (
		<div className="mx-auto flex max-w-3xl flex-col items-center gap-4 pt-20 text-center sm:gap-6">
			<h3 className="from-scheme-primary to-scheme-foreground/80 mb-2 bg-gradient-to-r bg-clip-text text-lg font-bold text-transparent uppercase sm:text-xl">
				our impact
			</h3>
			{/* First 3 Grid */}
			<div className="hidden grid-cols-3 gap-6 md:grid">
				<div className="flex items-center gap-3">
					<Icons.user className="size-5 shrink-0 text-sky-500" />
					<span className="text-sm font-semibold">{data?.totalUsers || 0}</span>
					<span className="text-scheme-foreground/80 text-sm">
						{data?.totalUsers === 1 ? "User" : "Users"}
					</span>
				</div>
				<div className="flex items-center gap-3">
					<Icons.folders className="size-5 shrink-0 text-emerald-500" />
					<span className="text-sm font-semibold">
						{data?.totalProjects || 0}
					</span>
					<span className="text-scheme-foreground/80 text-sm">
						{data?.totalProjects === 1 ? "Project" : "Projects"}
					</span>
				</div>
				<div className="flex items-center gap-3">
					<Icons.userGroup className="size-5 shrink-0 text-rose-500" />
					<span className="text-sm font-semibold">{data?.totalTeams || 0}</span>
					<span className="text-scheme-foreground/80 text-sm">
						{data?.totalTeams === 1 ? "Team" : "Teams"}
					</span>
				</div>
			</div>
			{/* Last 2 Grid */}
			<div className="mt-6 hidden grid-cols-2 gap-6 md:grid">
				<div className="flex items-center gap-3">
					<Icons.comments className="size-5 shrink-0 text-amber-500" />
					<span className="text-sm font-semibold">
						{data?.totalComments || 0}
					</span>
					<span className="text-scheme-foreground/80 text-sm">
						{data?.totalComments === 1 ? "Comment" : "Comments"}
					</span>
				</div>
				<div className="flex items-center gap-3">
					<Icons.tasks className="size-5 shrink-0 text-blue-500" />
					<span className="text-sm font-semibold">{data?.totalTasks || 0}</span>
					<span className="text-scheme-foreground/80 text-sm">
						{data?.totalTasks === 1 ? "Task" : "Tasks"}
					</span>
				</div>
			</div>
			{/* 4 Grid Mobile */}
			<div className="mt-6 grid grid-cols-2 gap-6 md:hidden">
				<div className="flex items-center gap-3">
					<Icons.user className="size-5 shrink-0 text-sky-500" />
					<span className="text-sm font-semibold">{data?.totalUsers || 0}</span>
					<span className="text-scheme-foreground/80 text-sm">
						{data?.totalUsers === 1 ? "User" : "Users"}
					</span>
				</div>
				<div className="flex items-center gap-3">
					<Icons.folders className="size-5 shrink-0 text-emerald-500" />
					<span className="text-sm font-semibold">
						{data?.totalProjects || 0}
					</span>
					<span className="text-scheme-foreground/80 text-sm">
						{data?.totalProjects === 1 ? "Project" : "Projects"}
					</span>
				</div>
				<div className="flex items-center gap-3">
					<Icons.userGroup className="size-5 shrink-0 text-rose-500" />
					<span className="text-sm font-semibold">{data?.totalTeams || 0}</span>
					<span className="text-scheme-foreground/80 text-sm">
						{data?.totalTeams === 1 ? "Team" : "Teams"}
					</span>
				</div>
				<div className="flex items-center gap-3">
					<Icons.comments className="size-5 shrink-0 text-amber-500" />
					<span className="text-sm font-semibold">
						{data?.totalComments || 0}
					</span>
					<span className="text-scheme-foreground/80 text-sm">
						{data?.totalComments === 1 ? "Comment" : "Comments"}
					</span>
				</div>
			</div>
			{/* Last Item Mobile */}
			<div className="mx-auto flex items-center gap-3 md:hidden">
				<Icons.tasks className="size-5 shrink-0 text-blue-500" />
				<span className="text-sm font-semibold">{data?.totalTasks || 0}</span>
				<span className="text-scheme-foreground/80 text-sm">
					{data?.totalTasks === 1 ? "Task" : "Tasks"}
				</span>
			</div>
		</div>
	);
}
