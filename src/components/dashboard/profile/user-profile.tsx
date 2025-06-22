import { formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

type User = {
	id: string;
	email: string;
	name: string;
	isEmailVerified: boolean;
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
							{user.name.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</div>
			</div>
			<Separator />
			<div className="flex flex-col space-y-1">
				<h3 className="font-medium text-sm">Email</h3>
				<div className="flex items-center gap-2">
					<span className="text-sm text-muted-foreground">{user.email}</span>
					<div className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-600 text-white text-xs font-medium">
						Primary
					</div>
					{user.isEmailVerified && (
						<div className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-medium">
							Verified
						</div>
					)}
				</div>
			</div>
			<Separator />
			<div className="flex flex-col space-y-1">
				<h3 className="font-medium text-sm">Name</h3>
				<span className="text-sm text-muted-foreground">{user.name}</span>
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
