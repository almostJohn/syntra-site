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
		<div className="flex flex-col space-y-3">
			<h2 className="text-lg font-bold pb-2">User Profile</h2>
			<div className="flex justify-between w-full">
				<div className="flex flex-col space-y-1">
					<div className="flex items-center gap-2">
						<h3 className="font-medium text-sm">Profile Picture</h3>
						<div className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-medium">
							Beta
						</div>
					</div>
					<span className="text-sm text-muted-foreground truncate">
						You look good today!
					</span>
				</div>
				<div>
					<Avatar className="size-12 border border-blue-600">
						<AvatarFallback className="bg-blue-50 text-blue-600">
							{user.displayName.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</div>
			</div>
			<Separator />
			<div className="flex justify-between w-full">
				<div className="flex flex-col space-y-1">
					<h3 className="font-medium text-sm">Username</h3>
					<span className="text-sm text-muted-foreground">
						Your username can be edited on{" "}
						<NextLink
							href="/dashboard/settings"
							className="text-blue-600 underline-offset-2 hover:underline"
						>
							settings
						</NextLink>
						.
					</span>
				</div>
				<div className="flex items-center px-3 py-2 rounded-md border border-border bg-background/80 text-muted-foreground text-sm font-medium">
					@{user.username}
				</div>
			</div>
			<Separator />
			<div className="flex justify-between w-full">
				<div className="flex flex-col space-y-1">
					<h3 className="font-medium text-sm">Display Name</h3>
					<span className="text-sm text-muted-foreground">
						Your display name can be edited on{" "}
						<NextLink
							href="/dashboard/settings"
							className="text-blue-600 underline-offset-2 hover:underline"
						>
							settings
						</NextLink>
						.
					</span>
				</div>
				<div className="flex items-center px-3 py-2 rounded-md border border-border bg-background/80 text-muted-foreground text-sm font-medium">
					{user.displayName}
				</div>
			</div>
			<Separator />
			<div className="flex flex-col space-y-1">
				<h3 className="font-medium text-sm">Joined At</h3>
				<span className="text-sm text-muted-foreground">
					{formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
				</span>
			</div>
		</div>
	);
}
