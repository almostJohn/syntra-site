"use client";

import { useState } from "react";
import { useServerAction } from "@/hooks/use-server-action";
import { Button, buttonVariants } from "../ui/button";
import { ModeToggle } from "./mode-toggle";
import { logout } from "@/app/(private)/actions/logout";
import { Icons } from "../icons";
import { NextLink } from "../ui/next-link";
import { cn } from "@/lib/utils";

const initialState = {
	successMessage: "",
	errorMessage: "",
};

export function MobileNav() {
	const { formAction, isPending } = useServerAction(logout, initialState, {
		redirectTo: "/login",
	});
	const [interacted, setInteracted] = useState(false);

	function onTrigger() {
		setInteracted((prev) => !prev);
	}

	return (
		<div className="relative">
			<Button
				variant="ghost"
				size="icon"
				className="cursor-pointer md:hidden"
				onClick={onTrigger}
				aria-label={interacted ? "Close Menu" : "Open Menu"}
				aria-expanded={interacted}
			>
				{interacted ? (
					<Icons.x className="size-6 shrink-0" />
				) : (
					<Icons.menu className="size-6 shrink-0" />
				)}
			</Button>
			{interacted && (
				<div
					className={cn(
						"fixed inset-0 bg-neutral-100 dark:bg-neutral-800 z-50 md:hidden transition-transform duration-200 ease-in-out",
						interacted
							? "translate-x-0 opacity-100"
							: "-translate-x-full opacity-0 pointer-events-none",
					)}
				>
					<div className="flex items-center justify-between h-18 px-6 border-b border-neutral-200 dark:border-neutral-700">
						<NextLink
							href="/app"
							className="text-2xl font-bold leading-tight tracking-tighter md:text-3xl"
						>
							Syntra
						</NextLink>
						<div className="flex items-center gap-3">
							<ModeToggle className="md:hidden" />
							<Button
								variant="ghost"
								size="icon"
								className="cursor-pointer"
								onClick={onTrigger}
								aria-label="Close Menu"
							>
								<Icons.x className="size-6 shrink-0" />
							</Button>
						</div>
					</div>
					<div className="flex flex-col min-h-screen bg-neutral-100 dark:bg-neutral-800">
						<div className="p-4 flex flex-col gap-4">
							<div className="flex flex-col gap-2 pb-4 border-b border-neutral-200 dark:border-neutral-700">
								<NextLink
									href="/app/profile"
									className={cn(
										buttonVariants({
											variant: "ghost",
											className: "justify-start h-10 text-lg",
										}),
									)}
									onClick={onTrigger}
								>
									Profile
								</NextLink>
								<NextLink
									href="/app/settings"
									className={cn(
										buttonVariants({
											variant: "ghost",
											className: "justify-start h-10 text-lg",
										}),
									)}
									onClick={onTrigger}
								>
									Settings
								</NextLink>
							</div>
							<form
								action={() => {
									formAction(undefined);
									onTrigger();
								}}
							>
								<Button
									variant="destructive"
									disabled={isPending}
									className="h-10 cursor-pointer text-lg w-full"
								>
									{isPending ? (
										<Icons.loading className="size-5 shrink-0" />
									) : (
										"Logout"
									)}
								</Button>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
