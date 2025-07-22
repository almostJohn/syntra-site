import { Icons } from "../icons";
import { formatDistanceToNow } from "date-fns";

type JoinedAtSectionProps = {
	createdAt: Date;
};

export function JoinedAtSection({ createdAt }: JoinedAtSectionProps) {
	return (
		<div className="p-5 rounded-sm border border-neutral-200 dark:border-neutral-700">
			<div className="flex items-center gap-3">
				<Icons.calendar className="size-5 shrink-0" />
				<div className="flex flex-col gap-2">
					<div className="text-sm text-neutral-500">Member Since</div>
					<div className="text-lg font-medium">
						{new Date(createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}{" "}
						({formatDistanceToNow(new Date(createdAt), { addSuffix: true })})
					</div>
				</div>
			</div>
		</div>
	);
}
