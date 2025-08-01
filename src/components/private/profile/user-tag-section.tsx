import { Icons } from "@/components/icons";

export function UserTagSection({ tag }: { tag: string }) {
	return (
		<div className="p-6 rounded-md shadow-sm border border-neutral-300 dark:border-neutral-700">
			<div className="flex items-center gap-4">
				<Icons.hashtag className="size-6 shrink-0" />
				<div className="flex flex-col gap-2">
					<div className="text-neutral-500">User Tag</div>
					<div className="font-medium">{tag}</div>
				</div>
			</div>
		</div>
	);
}
