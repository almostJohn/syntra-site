import { formatDistanceToNow } from "date-fns";
import { Icons } from "@/components/icons";

export function JoinedAtSection({ createdAt }: { createdAt: Date }) {
	return (
		<div className="p-6 rounded-md shadow-sm border border-neutral-300 dark:border-neutral-700">
			<div className="flex items-center gap-4">
				<Icons.calendar className="size-6 shrink-0" />
				<div className="flex flex-col gap-2">
					<div className="text-neutral-500">Member Since</div>
					<div className="font-medium">
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
