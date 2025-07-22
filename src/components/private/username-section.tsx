import { Icons } from "../icons";

type UsernameSectionProps = {
	username: string;
};

export function UsernameSection({ username }: UsernameSectionProps) {
	return (
		<div className="p-5 rounded-sm border border-neutral-200 dark:border-neutral-700">
			<div className="flex items-center gap-3">
				<Icons.atSymbol className="size-5 shrink-0" />
				<div className="flex flex-col gap-2">
					<div className="text-sm text-neutral-500">Username</div>
					<div className="text-lg font-medium">{username}</div>
				</div>
			</div>
		</div>
	);
}
