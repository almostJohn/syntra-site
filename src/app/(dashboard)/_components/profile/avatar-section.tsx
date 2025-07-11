import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type AvatarSectionProps = {
	displayName: string;
};

export function AvatarSection({ displayName }: AvatarSectionProps) {
	return (
		<div className="flex items-center justify-between w-full">
			<div className="flex items-start flex-col gap-1">
				<div className="font-medium">Avatar</div>
				<div className="text-sm text-neutral-500">You look good today!</div>
			</div>
			<div className="flex items-center">
				<Avatar className="size-12 border border-neutral-300 dark:border-neutral-700">
					<AvatarFallback className="bg-neutral-200 dark:bg-neutral-700 text-lg font-semibold">
						{displayName.charAt(0).toUpperCase()}
					</AvatarFallback>
				</Avatar>
			</div>
		</div>
	);
}
