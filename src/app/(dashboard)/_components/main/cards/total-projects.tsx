import { icons } from "@/components/icons";

type TotalProjectsProps = {
	title: string;
	count: number;
};

export function TotalProjects({ title, count }: TotalProjectsProps) {
	return (
		<div className="bg-background rounded-md border border-border p-6 shadow">
			<div className="flex items-center justify-between">
				<div className="flex flex-col space-y-1">
					<span className="text-sm font-medium">{title}</span>
					<span className="text-3xl font-bold">{count}</span>
				</div>
				<div className="size-12 rounded-sm bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
					<icons.Folder className="size-6" />
				</div>
			</div>
		</div>
	);
}
