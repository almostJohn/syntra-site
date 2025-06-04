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
	email: string;
	name: string;
};

export function SignedInMainNav({ email, name }: SignedInMainNavProps) {
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
				<ArrowRight className="size-4 text-muted-foreground transition-all group-hover:text-accent-foreground group-hover:translate-x-1" />
			</NextLink>
			<DropdownMenu>
				<DropdownMenuTrigger className="rounded-md cursor-pointer">
					<Avatar className="size-9 border border-blue-600 rounded-md">
						<AvatarFallback className="bg-blue-50 text-blue-600 rounded-md">
							<span className="font-medium">
								{name.charAt(0).toUpperCase()}
							</span>
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-62" align="end">
					<DropdownMenuLabel className="flex items-center space-x-2">
						<Avatar className="rounded-sm border border-blue-600">
							<AvatarFallback className="rounded-sm bg-blue-50 text-blue-600">
								<span className="font-medium">
									{name.charAt(0).toUpperCase()}
								</span>
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col space-y-0.5">
							<span className="text-sm font-semibold">{name}</span>
							<span className="text-xs text-muted-foreground truncate">
								{email}
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
						<NextLink href="/dashboard/account" className="flex items-center">
							<Settings className="size-4" />
							<span>Account settings</span>
						</NextLink>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<LogoutButton isDropdownMenu={true} />
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
