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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { NextLink } from "@/components/ui/next-link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogoutButton } from "@/components/logout-button";

export function DrawerMenu({
	email,
	displayName,
}: {
	email: string;
	displayName: string;
}) {
	const [interacted, setInteracted] = useState(false);

	function toggleDrawerMenu() {
		setInteracted(!interacted);
	}

	return (
		<Drawer>
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
				<div className="p-6 flex flex-col gap-6">
					<div className="flex items-center gap-3">
						<Avatar className="rounded-md size-11">
							<AvatarFallback className="rounded-md bg-blue-600/10 text-blue-600">
								{displayName.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col space-y-0.5">
							<span className="font-semibold">{displayName}</span>
							<span className="text-sm text-muted-foreground">{email}</span>
						</div>
					</div>
					<div className="flex flex-col gap-3">
						<NextLink
							href="/dashboard"
							className={cn(buttonVariants({ variant: "outline" }))}
							onClick={() => setInteracted(false)}
						>
							Go To Dashboard
						</NextLink>
						<LogoutButton isDropdownMenu={false} />
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
