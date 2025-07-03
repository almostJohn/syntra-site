import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type AvatarSettingsProps = {
	displayName: string;
};

export function AvatarSettings({ displayName }: AvatarSettingsProps) {
	return (
		<div className="flex flex-col rounded-sm bg-transparent border border-neutral-200 dark:border-neutral-700 shadow">
			<div className="flex justify-between w-full p-6">
				<div className="flex flex-col space-y-4">
					<div className="flex items-center gap-2">
						<h3 className="text-lg font-bold">Avatar</h3>
						<span className="inline-flex items-center justify-center px-2 py-0.5 rounded-sm text-xs font-medium border border-neutral-300 bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-700">
							Beta
						</span>
					</div>
					<div className="flex flex-col space-y-1">
						<span className="text-sm">This is your avatar.</span>
						<span className="text-sm">
							We&apos;re working hard to bring you custom avatar uploads! This
							feature is currently in beta and will be available soon.
						</span>
					</div>
				</div>
				<div className="flex">
					<Avatar className="size-20 border border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-700">
						<AvatarFallback className="text-2xl font-bold">
							{displayName.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</div>
			</div>
			<div className="mt-auto border-t border-neutral-200 dark:border-neutral-700 px-6 py-4">
				<span className="text-sm text-neutral-500">
					An avatar is optional but strongly recommended.
				</span>
			</div>
		</div>
	);
}
