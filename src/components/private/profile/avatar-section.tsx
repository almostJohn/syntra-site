import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitial } from "@/lib/get-initial";

export function AvatarSection({ displayName }: { displayName: string }) {
	return (
		<div className="mx-auto flex justify-center">
			<Avatar className="rounded-full size-25 border border-neutral-300 dark:border-neutral-700">
				<AvatarFallback className="rounded-full text-3xl font-bold bg-neutral-200 dark:bg-neutral-700">
					{getInitial(displayName)}
				</AvatarFallback>
			</Avatar>
		</div>
	);
}
