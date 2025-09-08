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
					<div key={title} className="text-center">
						<div className="mx-auto mb-2 flex justify-center">
							<Icon className="size-5 shrink-0 text-orange-600" />
						</div>
						<div className="text-4xl font-bold text-orange-800">{count}</div>
						<div className="mt-2 text-base text-orange-600">{title}</div>
					</div>
				))}
			</div>

			<div className="flex flex-col gap-6 pt-12 md:hidden">
				<div className="text-center">
					<div className="mx-auto mb-2 flex justify-center">
						<SingleIcon className="size-5 shrink-0 text-orange-600" />
					</div>
					<div className="text-3xl font-bold text-orange-800">
						{analytics[0].count}
					</div>
					<div className="mt-2 text-base text-orange-600">
						{analytics[0].title}
					</div>
				</div>
				<div className="grid grid-cols-2 gap-6">
					{analytics.slice(1, 5).map(({ title, count, icon: Icon }) => (
						<div key={title} className="text-center">
							<div className="mx-auto mb-2 flex justify-center">
								<Icon className="size-5 shrink-0 text-orange-600" />
							</div>
							<div className="text-4xl font-bold text-orange-800">{count}</div>
							<div className="mt-2 text-base text-orange-600">{title}</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
