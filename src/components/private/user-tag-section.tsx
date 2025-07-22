import { Icons } from "../icons";

type UserTagSectionProps = {
	tag: string;
};

export function UserTagSection({ tag }: UserTagSectionProps) {
	return (
		<div className="p-5 rounded-sm border border-neutral-200 dark:border-neutral-700">
			<div className="flex items-center gap-3">
				<Icons.hashtag className="size-5 shrink-0" />
				<div className="flex flex-col gap-2">
					<div className="text-sm text-neutral-500">User Tag</div>
					<div className="text-lg font-medium">{tag}</div>
				</div>
			</div>
		</div>
	);
}
