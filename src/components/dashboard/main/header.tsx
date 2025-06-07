import { LayoutGrid, Settings, BarChart2, Sparkle } from "lucide-react";

type HeaderProps = {
	name: string;
};

export function Header({ name }: HeaderProps) {
	return (
		<div className="flex items-center justify-between w-full">
			<div className="flex flex-col space-y-1.5">
				<h1 className="text-3xl font-extrabold">Dashboard</h1>
				<p className="text-muted-foreground">
					Welcome,{" "}
					<span className="font-semibold text-accent-foreground">{name}</span>!
					This is your{" "}
					<span className="inline-flex items-center space-x-1 text-blue-600">
						<LayoutGrid className="size-3 shrink-0" />
						<span>Dashboard</span>
					</span>
					. From here, you can easily access your{" "}
					<span className="inline-flex items-center space-x-1 text-orange-600">
						<Settings className="size-3 shrink-0" />
						<span>Account Settings</span>
					</span>
					, view your{" "}
					<span className="inline-flex items-center space-x-1 text-purple-600">
						<BarChart2 className="size-3 shrink-0" />
						<span>Recent Activity</span>
					</span>
					, and explore available{" "}
					<span className="inline-flex items-center space-x-1 text-rose-600">
						<Sparkle className="size-3 shrink-0" />
						<span>Features</span>
					</span>
					.
				</p>
			</div>
		</div>
	);
}
