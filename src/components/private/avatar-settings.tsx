import { Avatar, AvatarFallback } from "../ui/avatar";

type AvatarSettingsProps = {
	displayName: string;
};

export function AvatarSettings({ displayName }: AvatarSettingsProps) {
	return (
		<div className="flex flex-col rounded-sm border border-neutral-200 dark:border-neutral-700">
			<div className="flex justify-between w-full p-5">
				<div className="flex flex-col gap-4">
					<div className="font-semibold">Avatar</div>
					<div className="flex flex-col gap-1 text-sm">
						<div>This is your avatar.</div>
						<div>Avatar uploads are coming soon!</div>
						<div>
							We&apos;re testing this feature and it&apos;s not fully available
							yet — stay tuned, it&apos;s coming soon to the platform!
						</div>
					</div>
				</div>
				<Avatar className="rounded-full border border-neutral-300 dark:border-neutral-700 size-20">
					<AvatarFallback className="rounded-full bg-neutral-200 dark:bg-neutral-700 text-3xl font-bold">
						{displayName.charAt(0).toUpperCase()}
					</AvatarFallback>
				</Avatar>
			</div>
			<div className="px-5 py-3 mt-auto border-t border-neutral-200 dark:border-neutral-700">
				<div className="text-sm text-neutral-500">
					An avatar is optional but strongly recommended.
				</div>
			</div>
		</div>
	);
}
