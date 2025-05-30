import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { LogoutButton } from "@/components/logout-button";

type UserDropdownProps = {
	email: string;
	displayName: string;
	isCollapsed: boolean;
};

export function UserDropdown({
	email,
	displayName,
	isCollapsed,
}: UserDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className={cn(
						"h-auto p-0 w-full transition-all duration-200 cursor-pointer",
						isCollapsed ? "justify-center" : "justify-start",
					)}
				>
					<div
						className={cn(
							"flex items-center p-2 w-full",
							isCollapsed ? "justify-center p-0" : "space-x-2",
						)}
					>
						<Avatar className="rounded-sm size-9 border border-blue-200">
							<AvatarFallback className="rounded-sm bg-blue-50 text-blue-600">
								{displayName.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						{!isCollapsed && (
							<div className="flex-1 flex-col flex space-y-0.5 min-w-0 text-left">
								<span className="text-semibold leading-snug">
									{displayName}
								</span>
								<span className="text-xs text-muted-foreground truncate">
									{email}
								</span>
							</div>
						)}
					</div>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-60" align="end" side="right">
				<DropdownMenuLabel className="flex items-center gap-2">
					<Avatar className="rounded-sm size-9 border border-blue-200">
						<AvatarFallback className="rounded-sm bg-blue-50 text-blue-600">
							{displayName.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col space-y-0.5">
						<span className="font-semibold leading-snug">{displayName}</span>
						<span className="text-xs text-muted-foreground">{email}</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<LogoutButton isDropdownMenu={true} />
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
