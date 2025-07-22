import { Avatar, AvatarFallback } from "../ui/avatar";

type AvatarSectionProps = {
	displayName: string;
};

export function AvatarSection({ displayName }: AvatarSectionProps) {
	return (
		<div className="mx-auto flex justify-center">
			<Avatar className="rounded-full border border-neutral-300 dark:border-neutral-700 size-24">
				<AvatarFallback className="rounded-full bg-neutral-200 dark:bg-neutral-700 text-3xl font-bold">
					{displayName.charAt(0).toUpperCase()}
				</AvatarFallback>
			</Avatar>
		</div>
	);
}
