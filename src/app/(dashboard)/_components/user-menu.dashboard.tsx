import { User, Settings } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NextLink } from "@/components/ui/next-link";

type UserMenuProps = {
	email: string;
	displayName: string;
};

export function UserMenu({ email, displayName }: UserMenuProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="rounded-full cursor-pointer">
				<Avatar className="size-8">
					<AvatarFallback className="bg-blue-100 text-blue-600">
						{displayName.charAt(0).toUpperCase()}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-58" align="end">
				<DropdownMenuLabel className="flex items-center gap-2">
					<Avatar className="rounded-sm">
						<AvatarFallback className="rounded-sm bg-blue-100 text-blue-600">
							{displayName.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col space-y-0.5">
						<span className="font-semibold">{displayName}</span>
						<span className="text-xs text-muted-foreground">{email}</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<NextLink href="/dashboard/profile">
						<User className="size-4" />
						Profile
					</NextLink>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<NextLink href="/dashboard/settings">
						<Settings className="size-4" />
						Settings
					</NextLink>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
