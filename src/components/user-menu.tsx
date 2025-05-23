import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { LogoutButton } from "./logout-button";

type UserMenuProps = {
	username: string;
	displayName: string;
};

export function UserMenu({ username, displayName }: UserMenuProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="rounded-full cursor-pointer hover:bg-transparent"
				>
					<Avatar>
						<AvatarFallback className="bg-blue-600/10 text-blue-600">
							{displayName && displayName.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end">
				<DropdownMenuLabel className="flex items-center gap-3">
					<Avatar className="rounded-md">
						<AvatarFallback className="rounded-md bg-blue-600/10 text-blue-600">
							{displayName && displayName.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col space-y-0.5">
						<span className="font-semibold">{displayName}</span>
						<span className="text-xs text-muted-foreground">@{username}</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<LogoutButton isDropdownMenu={true} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
