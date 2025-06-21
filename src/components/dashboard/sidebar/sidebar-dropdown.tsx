import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuLabel,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "@/components/auth/logout-button";
import { cn } from "@/lib/utils";

type SidebarDropdownProps = {
	email: string;
	name: string;
	isCollapsed: boolean;
};

export function SidebarDropdown({
	email,
	name,
	isCollapsed,
}: SidebarDropdownProps) {
	return (
		<div className="border-t border-border p-4 bg-background/95">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className={cn(
							"w-full cursor-pointer h-auto p-0 transition-all duration-300",
							isCollapsed ? "justify-center" : "justify-start",
						)}
					>
						<div
							className={cn(
								"flex items-center p-2 w-full",
								isCollapsed ? "justify-center" : "gap-3",
							)}
						>
							<Avatar className="rounded-full size-9 border border-blue-600">
								<AvatarFallback className="rounded-full bg-blue-50 text-blue-600">
									<span className="font-medium">
										{name.charAt(0).toUpperCase()}
									</span>
								</AvatarFallback>
							</Avatar>
							{!isCollapsed && (
								<div className="flex flex-col space-y-0.5 text-left">
									<span className="text-sm font-medium">{name}</span>
									<span className="text-xs text-muted-foreground truncate">
										{email}
									</span>
								</div>
							)}
						</div>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-65"
					align="end"
					side="right"
					sideOffset={8}
				>
					<DropdownMenuLabel className="flex items-center space-x-2">
						<Avatar className="rounded size-9 border border-blue-600">
							<AvatarFallback className="rounded bg-blue-50 text-blue-600">
								<span className="font-medium">
									{name.charAt(0).toUpperCase()}
								</span>
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col space-y-1">
							<span className="text-sm font-medium">{name}</span>
							<span className="text-xs text-muted-foreground truncate">
								{email}
							</span>
						</div>
					</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<LogoutButton isDropdownMenu={true} />
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
