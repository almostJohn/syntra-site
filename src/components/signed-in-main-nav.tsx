import { NextLink } from "./ui/next-link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuLabel,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ArrowRight, Settings, User } from "lucide-react";
import { LogoutButton } from "./auth/logout-button";

type SignedInMainNavProps = {
	username: string;
	displayName: string;
};

export function SignedInMainNav({
	username,
	displayName,
}: SignedInMainNavProps) {
	return (
		<div className="hidden items-center justify-end space-x-3 md:flex">
			<NextLink
				href="/dashboard"
				className={cn(
					buttonVariants({
						variant: "ghost:with-active:scale-95",
						className: "group px-6",
					}),
				)}
			>
				Dashboard
				<ArrowRight className="size-4 text-muted-foreground transition-all group-hover:text-accent-foreground group-hover:translate-x-0.5" />
			</NextLink>
			<DropdownMenu>
				<DropdownMenuTrigger className="rounded-sm cursor-pointer">
					<Avatar className="size-9 rounded-sm border border-[#5865f2]">
						<AvatarFallback className="bg-[#5865f2]/10 text-[#5865f2] rounded-sm">
							<span className="font-medium">
								{displayName.charAt(0).toUpperCase()}
							</span>
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-64" align="end">
					<DropdownMenuLabel className="flex items-center space-x-2">
						<Avatar className="size-8 rounded-sm border border-[#5865f2]">
							<AvatarFallback className="bg-[#5865f2]/10 text-[#5865f2] rounded-sm">
								{displayName.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col space-y-0.5">
							<h3 className="text-sm font-medium capitalize">{displayName}</h3>
							<span className="text-xs text-muted-foreground truncate">
								@{username}
							</span>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem asChild>
						<NextLink href="/dashboard/profile" className="flex items-center">
							<User className="size-4" />
							<span>Profile</span>
						</NextLink>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<NextLink href="/dashboard/settings" className="flex items-center">
							<Settings className="size-4" />
							<span>Settings</span>
						</NextLink>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<LogoutButton isDropdownMenu={true} />
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
