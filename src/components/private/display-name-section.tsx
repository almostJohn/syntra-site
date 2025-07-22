import { Icons } from "../icons";

type DisplayNameSectionProps = {
	displayName: string;
};

export function DisplayNameSection({ displayName }: DisplayNameSectionProps) {
	return (
		<div className="p-5 rounded-sm border border-neutral-200 dark:border-neutral-700">
			<div className="flex items-center gap-3">
				<Icons.user className="size-5 shrink-0" />
				<div className="flex flex-col gap-2">
					<div className="text-sm text-neutral-500">Display Name</div>
					<div className="text-lg font-medium">{displayName}</div>
				</div>
			</div>
		</div>
	);
}
