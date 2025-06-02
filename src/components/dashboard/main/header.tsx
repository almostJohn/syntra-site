import {
	LayoutDashboard,
	Settings,
	ChartNoAxesColumn,
	Sparkle,
} from "lucide-react";

type HeaderProps = {
	displayName: string;
};

export function Header({ displayName }: HeaderProps) {
	return (
		<div className="flex flex-col space-y-2">
			<h1 className="text-4xl font-extrabold">Dashboard</h1>
			<p className="text-muted-foreground">
				Welcome <span className="font-medium text-blue-600">{displayName}</span>
				! This is your{" "}
				<span className="inline-flex items-center text-rose-600 font-medium">
					<LayoutDashboard className="size-3.5 mr-1" /> Dashboard
				</span>
				. From here, you can easily access your{" "}
				<span className="inline-flex items-center text-orange-600 font-medium">
					<Settings className="size-3.5 mr-1" /> Account Settings
				</span>
				, view your{" "}
				<span className="inline-flex items-center text-purple-600 font-medium">
					<ChartNoAxesColumn className="size-3.5 mr-1" /> Recent Activity
				</span>
				, and explore available{" "}
				<span className="inline-flex items-center text-green-600 font-medium">
					<Sparkle className="size-3.5 mr-1" /> Features
				</span>
				.
			</p>
		</div>
	);
}
