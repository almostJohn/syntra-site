import { Icons } from "./icons";

export function Announcement() {
	return (
		<div className="mx-auto flex justify-center mb-6">
			<div className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-full text-xs font-medium border border-neutral-300 bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-700">
				<Icons.philippines className="size-4 shrink-0" />
				proudly Filipino-founded
			</div>
		</div>
	);
}
