import { Icons } from "@/components/icons";

export function UsernameSection({ username }: { username: string }) {
	return (
		<div className="p-6 border border-neutral-300 dark:border-neutral-700 shadow-sm rounded-md">
			<div className="flex items-center gap-4">
				<Icons.atSymbol className="size-6 shrink-0" />
				<div className="flex flex-col gap-2">
					<div className="text-neutral-500">Username</div>
					<div className="font-medium">{username}</div>
				</div>
			</div>
		</div>
	);
}
