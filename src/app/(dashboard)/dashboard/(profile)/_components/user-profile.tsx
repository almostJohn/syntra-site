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
			<Picture displayName={user.displayName} />
			<Separator />
			<Username username={user.username} />
			<Separator />
			<DisplayName displayName={user.displayName} />
			<Separator />
			<JoinedAt createdAt={user.createdAt} />
		</div>
	);
}

function Picture({ displayName }: { displayName: string }) {
	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-col space-y-1">
				<h2 className="font-semibold">Picture</h2>
				<p className="text-sm text-neutral-500">You look good today!</p>
			</div>
			<div className="flex items-center justify-end">
				<Avatar className="size-12 border border-neutral-300 dark:border-neutral-700">
					<AvatarFallback className="bg-neutral-200 dark:bg-neutral-700 text-lg font-medium">
						{displayName.charAt(0).toUpperCase()}
					</AvatarFallback>
				</Avatar>
			</div>
		</div>
	);
}

function Username({ username }: { username: string }) {
	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-col space-y-1">
				<h2 className="font-semibold">Username</h2>
				<p className="text-sm text-neutral-500">
					Your username can be edited on{" "}
					<NextLink
						href="/dashboard/settings"
						className="text-[#5865f2] hover:underline"
					>
						settings
					</NextLink>
					.
				</p>
			</div>
			<div className="flex items-center justify-end">
				<div className="max-w-md">
					<div className="inline-flex items-center justify-center px-2 py-1 h-8 text-sm font-medium rounded-sm border border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-700 text-neutral-400">
						@{username}
					</div>
				</div>
			</div>
		</div>
	);
}

function DisplayName({ displayName }: { displayName: string }) {
	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-col space-y-1">
				<h2 className="font-semibold">Display Name</h2>
				<p className="text-sm text-neutral-500">
					Your display name can be edited on{" "}
					<NextLink
						href="/dashboard/settings"
						className="text-[#5865f2] hover:underline"
					>
						settings
					</NextLink>
					.
				</p>
			</div>
			<div className="flex items-center justify-end">
				<div className="max-w-md">
					<div className="inline-flex items-center justify-center px-2 py-1 h-8 text-sm font-medium rounded-sm border border-neutral-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-700 text-neutral-400">
						{displayName}
					</div>
				</div>
			</div>
		</div>
	);
}

function JoinedAt({ createdAt }: { createdAt: Date }) {
	return (
		<div className="flex flex-col space-y-1">
			<h2 className="font-semibold">Joined At</h2>
			<p className="text-sm text-neutral-500">
				{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
			</p>
		</div>
	);
}
