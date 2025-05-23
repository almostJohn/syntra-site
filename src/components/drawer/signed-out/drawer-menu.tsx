"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import {
	Drawer,
	DrawerTrigger,
	DrawerTitle,
	DrawerDescription,
	DrawerContent,
} from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { NextLink } from "@/components/ui/next-link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DrawerMenu() {
	const [interacted, setInteracted] = useState(false);

	function toggleDrawerMenu() {
		setInteracted(!interacted);
	}

	return (
		<Drawer open={interacted} onOpenChange={setInteracted}>
			<DrawerTrigger asChild>
				<Button
					size="icon"
					variant="ghost"
					className="cursor-pointer md:hidden"
					onClick={toggleDrawerMenu}
				>
					<Menu />
				</Button>
			</DrawerTrigger>
			<DrawerContent className="w-full">
				<VisuallyHidden>
					<DrawerTitle>Drawer Menu Title</DrawerTitle>
					<DrawerDescription>Drawer Menu Description</DrawerDescription>
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
