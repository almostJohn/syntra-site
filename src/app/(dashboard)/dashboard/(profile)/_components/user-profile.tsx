import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { NextLink } from "@/components/ui/next-link";

type User = {
	id: string;
	username: string;
	displayName: string;
	createdAt: Date;
};

type UserProfileProps = {
	user: User;
};

export function UserProfile({ user }: UserProfileProps) {
	return (
		<div className="flex flex-col space-y-4">
			<div className="flex justify-between w-full">
				<div className="flex flex-col space-y-0.5">
					<span className="font-medium">Profile Picture</span>
					<span className="text-sm text-neutral-500">You look good today!</span>
				</div>
				<div>
					<Avatar className="size-13 border border-neutral-300 dark:border-neutral-700">
						<AvatarFallback className="bg-neutral-200 text-xl font-semibold dark:bg-neutral-700">
							{user.displayName.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</div>
			</div>
			<Separator />
			<div className="flex justify-between w-full">
				<div className="flex flex-col space-y-0.5">
					<span className="font-medium">Username</span>
					<span className="text-sm text-neutral-500">
						Your username can be edited on{" "}
						<NextLink
							href="/dashboard/settings"
							className="text-[#5865f2] hover:underline"
						>
							settings
						</NextLink>
						.
					</span>
				</div>
				<div className="flex items-center px-3 py-0.5 rounded-sm text-neutral-500 border border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-700 text-sm font-medium">
					@{user.username}
				</div>
			</div>
			<Separator />
			<div className="flex justify-between w-full">
				<div className="flex flex-col space-y-0.5">
					<span className="font-medium">Display Name</span>
					<span className="text-sm text-neutral-500">
						Your display name can be edited on{" "}
						<NextLink
							href="/dashboard/settings"
							className="text-[#5865f2] hover:underline"
						>
							settings
						</NextLink>
						.
					</span>
				</div>
				<div className="flex items-center px-3 py-0.5 rounded-sm text-neutral-500 border border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-700 text-sm font-medium">
					{user.displayName}
				</div>
			</div>
			<Separator />
			<div className="flex flex-col space-y-0.5">
				<span className="font-medium">Joined At</span>
				<span className="text-sm text-neutral-500">
					{formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
				</span>
			</div>
		</div>
	);
}
