import { formatDistanceToNow } from "date-fns";

type JoinedAtSectionProps = {
	createdAt: Date;
};

export function JoinedAtSection({ createdAt }: JoinedAtSectionProps) {
	return (
		<div className="flex flex-col gap-1">
			<div className="font-medium">Joined At</div>
			<div className="text-sm text-neutral-500">
				{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
			</div>
		</div>
	);
}
