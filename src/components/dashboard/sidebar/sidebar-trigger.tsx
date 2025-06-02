import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { NextLink } from "@/components/ui/next-link";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";

type SidebarTriggerProps = PropsWithChildren & {
	isCollapsed: boolean;
	clickEvent(): void;
};

export function SidebarTrigger({
	isCollapsed,
	clickEvent,
	children,
}: SidebarTriggerProps) {
	return (
		<aside
			className={cn(
				"fixed top-0 left-0 h-full bg-background border-r border-border transition-all duration-300 ease-in-out flex flex-col z-10",
				isCollapsed ? "w-18" : "w-64",
			)}
		>
			<div className="p-4 border-b border-border">
				<div className="flex items-center justify-between">
					{!isCollapsed && (
						<NextLink
							href="/dashboard"
							className="text-2xl font-bold tracking-tighter"
						>
							Syntra
						</NextLink>
					)}
					<Button
						size="icon"
						variant="ghost"
						className="cursor-pointer"
						onClick={clickEvent}
					>
						<PanelLeft className="size-4 shrink-0" />
					</Button>
				</div>
			</div>
			{children}
		</aside>
	);
}
