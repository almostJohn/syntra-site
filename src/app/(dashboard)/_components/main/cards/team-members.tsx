import { icons } from "@/components/icons";

type TeamMembersProps = {
	title: string;
	count: number;
	trend: string;
};

export function TeamMembers({ title, count, trend }: TeamMembersProps) {
	return (
		<div className="bg-background p-6 rounded-md border border-border shadow-sm">
			<div className="flex items-center justify-between">
				<div className="flex flex-col space-y-1">
					<span className="font-medium text-sm">{title}</span>
					<span className="text-3xl font-bold">{count}</span>
				</div>
				<div className="size-12 bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center rounded-sm">
					<icons.Users className="size-6" />
				</div>
			</div>
			<p className="text-xs text-gray-600 mt-2">{trend}</p>
		</div>
	);
}
