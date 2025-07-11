import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type AvatarSettingsProps = {
	displayName: string;
};

export function AvatarSettings({ displayName }: AvatarSettingsProps) {
	return (
		<div className="flex flex-col rounded-sm bg-transparent border border-neutral-200 dark:border-neutral-700">
			<div className="flex justify-between w-full p-5">
				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-2">
						<div className="font-medium">Avatar</div>
						<div className="inline-flex items-center justify-center px-2 py-0.5 rounded-sm text-xs font-medium border border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-700">
							Beta
						</div>
					</div>
					<div className="max-w-xl text-sm flex flex-col gap-2">
						<div>This is your avatar.</div>
						<div>
							We&apos;re working hard to bring you custom avatar uploads! This
							feature is currently in beta and will be available soon.
						</div>
					</div>
				</div>
				<div className="flex">
					<Avatar className="size-18 border border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-700">
						<AvatarFallback className="text-lg font-semibold">
							{displayName.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</div>
			</div>
			<div className="px-5 py-3 mt-auto border-t border-neutral-200 dark:border-neutral-700">
				<div className="max-w-md text-sm text-neutral-500">
					An avatar is optional but strongly recommended.
				</div>
			</div>
		</div>
	);
}
