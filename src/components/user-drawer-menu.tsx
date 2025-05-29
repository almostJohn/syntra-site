"use client";

import { useState } from "react";
import {
	DrawerTrigger,
	Drawer,
	DrawerContent,
	DrawerTitle,
	DrawerDescription,
} from "./ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { icons } from "./icons";
import { NextLink } from "./ui/next-link";
import { LogoutButton } from "./logout-button";

type UserDrawerMenuProps = {
	email: string;
	displayName: string;
};

export function UserDrawerMenu({ email, displayName }: UserDrawerMenuProps) {
	const [interacted, setInteracted] = useState(false);

	function toggleDrawer() {
		setInteracted(!interacted);
	}

	return (
		<Drawer open={interacted} onOpenChange={setInteracted}>
			<DrawerTrigger asChild>
				<Button
					size="icon"
					className="cursor-pointer hover:bg-transparent md:hidden"
					variant="ghost"
					onClick={toggleDrawer}
				>
					<icons.Menu className="size-5" />
				</Button>
			</DrawerTrigger>
			<DrawerContent className="w-full">
				<VisuallyHidden>
					<DrawerTitle>User Drawer Menu Title</DrawerTitle>
					<DrawerDescription>User Drawer Menu Description</DrawerDescription>
				</VisuallyHidden>
				<div className="p-6 flex flex-col gap-6">
					<div className="flex items-center gap-3.5">
						<Avatar className="rounded-sm size-10">
							<AvatarFallback className="rounded-sm bg-blue-100 text-blue-600">
								{displayName.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col space-y-0.5">
							<span className="font-semibold">{displayName}</span>
							<span className="text-sm text-muted-foreground">{email}</span>
						</div>
					</div>
					<div className="w-full border-t border-border" />
					<div className="py-3 flex flex-col gap-4 items-center justify-center text-center">
						<NextLink
							href="/dashboard"
							className="text-lg font-semibold underline-offset-2 hover:underline"
							onClick={() => setInteracted(false)}
						>
							Dashboard
						</NextLink>
						<NextLink
							href="/dashboard/profile"
							className="text-lg font-semibold underline-offset-2 hover:underline"
							onClick={() => setInteracted(false)}
						>
							Profile
						</NextLink>
						<NextLink
							href="/dashboard/settings"
							className="text-lg font-semibold underline-offset-2 hover:underline"
							onClick={() => setInteracted(false)}
						>
							Settings
						</NextLink>
					</div>
					<div className="w-full border-t border-border" />
					<LogoutButton
						isDropdownMenu={false}
						className="h-10 text-lg font-semibold"
					/>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
