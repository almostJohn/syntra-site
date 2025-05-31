import { icons } from "@/components/icons";

type ActiveBoardsProps = {
	title: string;
	count: number;
	trend: string;
};

export function ActiveBoards({ title, count, trend }: ActiveBoardsProps) {
	return (
		<div className="bg-background p-6 rounded-md border border-border shadow">
			<div className="flex items-center justify-between">
				<div className="flex flex-col space-y-1">
					<span className="font-medium text-sm">{title}</span>
					<span className="text-3xl font-bold">{count}</span>
				</div>
				<div className="size-12 bg-green-50 border border-green-200 text-green-600 flex items-center justify-center rounded-sm">
					<icons.Kanban className="size-6" />
				</div>
			</div>
			<p className="text-xs text-green-600 mt-2">{trend}</p>
		</div>
	);
}
