"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import {
	Drawer,
	DrawerContent,
	DrawerTrigger,
	DrawerTitle,
	DrawerDescription,
} from "./ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button, buttonVariants } from "./ui/button";
import { NextLink } from "./ui/next-link";
import { cn } from "@/lib/utils";

export function MobileNav() {
	const [interacted, setInteracted] = useState(false);

	function handleClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<Drawer open={interacted} onOpenChange={setInteracted}>
			<DrawerTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="hover:bg-scheme-primary/30 cursor-pointer rounded-lg p-2 md:hidden"
				>
					<Menu className="size-6 shrink-0" />
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<VisuallyHidden>
					<DrawerTitle>Menu Title</DrawerTitle>
					<DrawerDescription>Menu Description</DrawerDescription>
				</VisuallyHidden>
				<div className="flex flex-col gap-4 p-8">
					<NextLink
						href="/login"
						onClick={handleClose}
						className={cn(
							buttonVariants({
								variant: "ghost",
								className: "hover:bg-scheme-primary/30 text-lg font-semibold",
							}),
						)}
					>
						Login
					</NextLink>
					<NextLink
						href="/register"
						onClick={handleClose}
						className={cn(
							buttonVariants({
								className:
									"bg-scheme-primary hover:bg-scheme-primary/90 hover:shadow-scheme-primary/60 text-lg font-semibold text-white transition-shadow hover:shadow-xl",
							}),
						)}
					>
						Register
					</NextLink>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
