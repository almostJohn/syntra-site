import { NextLink } from "./ui/next-link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { icons } from "./icons";
import { LogoutButton } from "./logout-button";

type MainNavProps = {
	email?: string;
	displayName?: string;
	isSignedIn: boolean;
};

function SignedOutButtons() {
	return (
		<div className="hidden gap-2 items-center justify-end md:flex">
			<NextLink
				href="/login"
				className={cn(
					buttonVariants({ variant: "ghost:with-active:scale-95" }),
				)}
			>
				Login
			</NextLink>
			<NextLink
				href="/register"
				className={cn(buttonVariants({ variant: "primary" }))}
			>
				Register
			</NextLink>
		</div>
	);
}

function UserDropdownMenu({
	email,
	displayName,
}: {
	email: string;
	displayName: string;
}) {
	return (
		<div className="hidden gap-3.5 items-center justify-end md:flex">
			<NextLink
				href="/dashboard"
				className={cn(
					buttonVariants({
						variant: "ghost:with-active:scale-95",
						className: "group px-6",
					}),
				)}
			>
				Dashboard{" "}
				<icons.ArrowRight className="size-4 text-muted-foreground transition-all group-hover:text-accent-foreground group-hover:translate-x-1" />
			</NextLink>
			<DropdownMenu>
				<DropdownMenuTrigger className="rounded-full cursor-pointer">
					<Avatar className="size-9 border border-blue-200">
						<AvatarFallback className="bg-blue-50 text-blue-600">
							{displayName.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-60" align="end">
					<DropdownMenuLabel className="flex items-center gap-2">
						<Avatar className="size-9 rounded-sm border border-blue-200">
							<AvatarFallback className="rounded-sm bg-blue-50 text-blue-600">
								{displayName.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col space-y-0.5">
							<span className="font-semibold leading-snug">{displayName}</span>
							<span className="text-xs text-muted-foreground truncate">
								{email}
							</span>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem asChild>
						<NextLink
							href="/dashboard/profile"
							className="flex items-center gap-2"
						>
							<icons.User className="size-4" />
							<span>Profile</span>
						</NextLink>
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<NextLink
							href="/dashboard/settings"
							className="flex items-center gap-2"
						>
							<icons.Settings className="size-4" />
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

export function MainNav({ email, displayName, isSignedIn }: MainNavProps) {
	return (
		<>
			{!isSignedIn ? (
				<SignedOutButtons />
			) : (
				email &&
				displayName && (
					<UserDropdownMenu email={email} displayName={displayName} />
				)
			)}
		</>
	);
}
