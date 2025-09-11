import { User, Folders, Users, MessageCircle, ListCheck } from "lucide-react";

const analytics = [
	{
		title: "Users",
		count: 0,
		icon: User,
	},
	{
		title: "Projects",
		count: 0,
		icon: Folders,
	},
	{
		title: "Teams",
		count: 0,
		icon: Users,
	},
	{
		title: "Comments",
		count: 0,
		icon: MessageCircle,
	},
	{
		title: "Tasks",
		count: 0,
		icon: ListCheck,
	},
];

export function Analytics() {
	const SingleIcon = analytics[0].icon;

	return (
		<>
			<div className="hidden grid-cols-5 gap-6 pt-12 md:grid">
				{analytics.map(({ title, count, icon: Icon }) => (
					<div key={title} className="flex flex-col gap-2 text-center">
						<div className="text-4xl font-bold text-orange-800">{count}</div>
						<div className="flex items-center justify-center gap-3">
							<Icon className="size-6 shrink-0 text-orange-600" />
							<span>{title}</span>
						</div>
					</div>
				))}
			</div>

			<div className="flex flex-col gap-6 pt-12 md:hidden">
				<div className="flex flex-col gap-2 text-center">
					<div className="text-4xl font-bold text-orange-800">
						{analytics[0].count}
					</div>
					<div className="flex items-center justify-center gap-3">
						<SingleIcon className="size-6 shrink-0 text-orange-600" />
						<span>{analytics[0].title}</span>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-6">
					{analytics.slice(1, 5).map(({ title, count, icon: Icon }) => (
						<div key={title} className="flex flex-col gap-2 text-center">
							<div className="text-4xl font-bold text-orange-800">{count}</div>
							<div className="flex items-center justify-center gap-3">
								<Icon className="size-6 shrink-0 text-orange-600" />
								<span>{title}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
