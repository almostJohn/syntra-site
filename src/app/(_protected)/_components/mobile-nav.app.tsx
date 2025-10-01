"use client";

import { useState } from "react";
import { useServerAction } from "@/hooks/use-server-action";
import { logout } from "../actions/logout";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetTitle,
	SheetDescription,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { usePathname } from "next/navigation";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const navItems = [
	{
		label: "Projects",
		href: "/app" as const,
		icon: Icons.apps,
	},
	{
		label: "Settings",
		href: "/app/settings" as const,
		icon: Icons.settings,
	},
];

const intialState = {
	successMessage: "",
	errorMessage: "",
};

export function MobileNav() {
	const pathname = usePathname();
	const [interacted, setInteracted] = useState(false);
	const { formAction, isPending } = useServerAction(logout, intialState, {
		redirectTo: "/login",
	});

	function onClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<Sheet open={interacted} onOpenChange={setInteracted}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="size-9 cursor-pointer rounded-sm px-2 hover:bg-neutral-800 hover:text-neutral-100 md:hidden"
				>
					<Icons.menu className="size-6 shrink-0" />
				</Button>
			</SheetTrigger>
			<SheetContent
				className="w-[300px] border border-neutral-700 bg-neutral-800"
				side="right"
			>
				<VisuallyHidden>
					<SheetTitle>Hidden Title</SheetTitle>
					<SheetDescription>Hidden Description</SheetDescription>
				</VisuallyHidden>
				<div className="flex flex-col">
					<div className="mt-6 flex flex-col gap-6 p-6">
						<div className="flex w-full flex-col gap-2">
							{navItems.map(({ label, href, icon: Icon }) => (
								<NextLink
									key={label}
									href={href}
									className={cn(
										"inline-flex h-9 w-full items-center gap-3 rounded-sm px-6 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200",
										pathname === href
											? "bg-neutral-700"
											: "hover:bg-neutral-700",
									)}
									title={label}
									aria-label={label}
									onClick={onClose}
								>
									<Icon className="size-4 shrink-0" />
									{label}
								</NextLink>
							))}
							<form
								action={() => {
									formAction(undefined);
									onClose();
								}}
							>
								<button
									type="submit"
									className={cn(
										"group inline-flex w-full cursor-pointer items-center gap-3 rounded-sm px-6 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200 hover:bg-red-500/10 hover:text-red-500 disabled:pointer-events-none disabled:opacity-50",
									)}
									disabled={isPending}
								>
									{isPending ? (
										<>
											<Loader2 className="size-4 shrink-0 animate-spin" />
											Logging out...
										</>
									) : (
										<>
											<Icons.logout className="size-4 shrink-0 transition-colors group-hover:text-red-500" />
											Log out
										</>
									)}
								</button>
							</form>
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
