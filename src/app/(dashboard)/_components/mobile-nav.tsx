"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";
import { LogoutButton } from "./logout-button";
import { X } from "lucide-react";
import { Icons } from "@/components/icons";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";

export function MobileNav() {
	const [interacted, setInteracted] = useState(false);

	function onTrigger() {
		setInteracted((prev) => !prev);
	}

	return (
		<div className="relative">
			<Button
				size="icon"
				variant="ghost"
				className="cursor-pointer md:hidden"
				onClick={onTrigger}
				aria-label={interacted ? "Close Menu" : "Open Menu"}
				aria-expanded={interacted}
			>
				{interacted ? (
					<X className="size-6 shrink-0" />
				) : (
					<Icons.menu className="size-6 shrink-0" />
				)}
			</Button>
			{interacted && (
				<div
					className={cn(
						"fixed inset-0 bg-neutral-100 dark:bg-neutral-800 z-50 md:hidden transform transition-all duration-300 ease-in-out",
						interacted
							? "translate-x-0 opacity-100"
							: "-translate-x-full opacity-0 pointer-events-none",
					)}
				>
					<div className="flex items-center justify-between px-6 py-4 h-18 border-b border-neutral-200 dark:border-neutral-700">
						<NextLink href="/dashboard" className="flex items-center space-x-3">
							<div className="text-2xl font-bold leading-tight tracking-tighter md:text-3xl">
								Syntra
							</div>
							<div className="inline-flex items-center justify-center px-2 py-0.5 rounded-sm bg-neutral-200 border border-neutral-300 dark:border-neutral-800 dark:bg-neutral-700 shadow-sm text-xs font-bold">
								BETA
							</div>
						</NextLink>
						<div className="flex items-center gap-2">
							<ModeToggle className="md:hidden" />
							<Button
								variant="ghost"
								size="icon"
								className="cursor-pointer"
								onClick={onTrigger}
								aria-label="Close Menu"
							>
								<X className="size-6 shrink-0" />
							</Button>
						</div>
					</div>
					<div className="flex flex-col min-h-screen bg-neutral-100 dark:bg-neutral-800">
						<div className="p-4 flex flex-col space-y-4">
							<nav className="flex flex-col gap-2 pb-4 border-b border-neutral-200 dark:border-neutral-700">
								<NextLink
									href="/dashboard/profile"
									className={cn(
										buttonVariants({
											variant: "ghost",
											className: "justify-start h-10",
										}),
									)}
									onClick={onTrigger}
								>
									Profile
								</NextLink>
								<NextLink
									href="/dashboard/settings"
									className={cn(
										buttonVariants({
											variant: "ghost",
											className: "justify-start h-10",
										}),
									)}
									onClick={onTrigger}
								>
									Settings
								</NextLink>
							</nav>
							<LogoutButton />
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
