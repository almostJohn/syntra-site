import { icons } from "lucide-react";

type NotesCreatedProps = {
	title: string;
	count: number;
	trend: string;
};

export function NotesCreated({ title, count, trend }: NotesCreatedProps) {
	return (
		<div className="bg-background p-6 rounded-md border border-border shadow-sm">
			<div className="flex items-center justify-between">
				<div className="flex flex-col space-y-1">
					<span className="font-medium text-sm">{title}</span>
					<span className="text-3xl font-bold">{count}</span>
				</div>
				<div className="size-12 bg-yellow-50 border border-yellow-200 text-yellow-600 flex items-center justify-center rounded-sm">
					<icons.Scroll className="size-6" />
				</div>
			</div>
			<p className="text-xs text-blue-600 mt-2">{trend}</p>
		</div>
	);
}
