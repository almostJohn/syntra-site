"use client";

import { useState } from "react";
import {
	Drawer,
	DrawerTrigger,
	DrawerContent,
	DrawerTitle,
	DrawerDescription,
} from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button, buttonVariants } from "@/components/ui/button";
import { icons } from "@/components/icons";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";

export function MobileNav() {
	const [interacted, setInteracted] = useState(false);

	function handleToggle() {
		setInteracted(!interacted);
	}

	return (
		<Drawer open={interacted} onOpenChange={setInteracted}>
			<DrawerTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="cursor-pointer hover:bg-transparent md:hidden"
					onClick={handleToggle}
				>
					<icons.Menu className="h-5 w-5" />
				</Button>
			</DrawerTrigger>
			<DrawerContent className="w-full">
				<VisuallyHidden>
					<DrawerTitle>Mobile Nav Drawer Title</DrawerTitle>
					<DrawerDescription>Mobile Nav Drawer Description</DrawerDescription>
				</VisuallyHidden>
				<div className="p-6 flex flex-col gap-4">
					<NextLink
						href="/login"
						className={cn(buttonVariants({ variant: "outline" }))}
						onClick={() => setInteracted(false)}
					>
						Login
					</NextLink>
					<NextLink
						href="/register"
						className={cn(buttonVariants({ variant: "primary" }))}
						onClick={() => setInteracted(false)}
					>
						Register
					</NextLink>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
