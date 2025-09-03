"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import {
	Sheet,
	SheetTrigger,
	SheetContent,
	SheetTitle,
	SheetDescription,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib";

const navItems = [
	{
		label: "Home",
		href: "/",
	},
	{
		label: "Changelog",
		href: "/changelog",
	},
];

export function MobileNav() {
	const pathname = usePathname();
	const [interacted, setInteracted] = useState(false);

	function onClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<Sheet open={interacted} onOpenChange={setInteracted}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="hover:bg-scheme-primary/30 cursor-pointer md:hidden"
				>
					<Icons.menu className="size-6 shrink-0" />
				</Button>
			</SheetTrigger>
			<SheetContent className="max-w-[300px] sm:max-w-[400px]" side="right">
				<VisuallyHidden>
					<SheetTitle>Mobile Menu Title</SheetTitle>
					<SheetDescription>Mobile Menu Description</SheetDescription>
				</VisuallyHidden>
				<div className="mt-6 p-6">
					<div className="flex flex-col">
						<div className="flex flex-col gap-3">
							{navItems.map((item, index) => (
								<NextLink
									key={index}
									href={item.href}
									onClick={onClose}
									className={cn(
										"inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200",
										pathname === item.href
											? "bg-scheme-primary/10"
											: "hover:bg-scheme-primary/30",
									)}
								>
									{item.label}
								</NextLink>
							))}
						</div>
						<div className="border-scheme-foreground/10 mt-6 border-t">
							<div className="mt-6 flex flex-col gap-3">
								<NextLink
									href="/login"
									onClick={onClose}
									className={cn(
										buttonVariants({
											variant: "ghost",
											className: "hover:bg-scheme-primary/30 rounded-md",
										}),
									)}
								>
									Login
								</NextLink>
								<NextLink
									href="/register"
									onClick={onClose}
									className={cn(
										buttonVariants({
											className:
												"bg-scheme-primary hover:bg-scheme-primary/90 hover:shadow-scheme-primary/60 transition-shadow hover:shadow-xl",
										}),
									)}
								>
									Register
								</NextLink>
							</div>
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
