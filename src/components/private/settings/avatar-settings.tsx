import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitial } from "@/lib/get-initial";

export function AvatarSettings({ displayName }: { displayName: string }) {
	return (
		<div className="flex flex-col rounded-md shadow-sm border border-neutral-300 dark:border-neutral-700">
			<div className="flex justify-between p-6">
				<div className="flex flex-col gap-4">
					<div className="text-xl font-semibold">Avatar</div>
					<div className="flex flex-col gap-2">
						<div className="text-sm">This is your avatar.</div>
						<div className="text-sm">Avatar uploads are coming soon!</div>
						<div className="text-sm">
							We&apos;re testing this feature and it&apos;s not fully available
							yet — stay tuned, it&apos;s coming soon to the platform!
						</div>
					</div>
				</div>
				<div>
					<Avatar className="rounded-full border border-neutral-300 dark:border-neutral-700 size-23">
						<AvatarFallback className="rounded-full text-3xl font-bold bg-neutral-200 dark:bg-neutral-700">
							{getInitial(displayName)}
						</AvatarFallback>
					</Avatar>
				</div>
			</div>
			<div className="mt-auto p-6 md:px-6 md:py-4 border-t border-neutral-300 dark:border-neutral-700">
				<div className="text-sm text-center md:text-left text-neutral-500">
					An avatar is optional but strongly recommended.
				</div>
			</div>
		</div>
	);
}
