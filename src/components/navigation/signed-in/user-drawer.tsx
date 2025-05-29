"use client";

import { useState } from "react";
import {
	Drawer,
	DrawerTrigger,
	DrawerContent,
	DrawerTitle,
	DrawerDescription,
} from "@/components/ui/drawer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { icons } from "@/components/icons";
import { NextLink } from "@/components/ui/next-link";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { LogoutButton } from "./logout-button";

type UserDrawerProps = {
	email: string;
	displayName: string;
	isDashboard?: boolean;
};

export function UserDrawer({
	email,
	displayName,
	isDashboard,
}: UserDrawerProps) {
	const [interacted, setInteracted] = useState(false);

	function handleToggle() {
		setInteracted(!interacted);
	}

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="cursor-pointer hover:bg-transparent md:hidden"
					onClick={handleToggle}
				>
					<icons.Menu className="size-5" />
				</Button>
			</DrawerTrigger>
			<DrawerContent className="w-full">
				<VisuallyHidden>
					<DrawerTitle>User Drawer Title</DrawerTitle>
					<DrawerDescription>User Drawer Description</DrawerDescription>
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
					<div className="py-1 flex flex-col gap-4">
						{!isDashboard && (
							<NextLink
								href="/dashboard"
								className="text-lg font-semibold underline-offset-2 hover:underline"
								onClick={() => setInteracted(false)}
							>
								Dashboard
							</NextLink>
						)}
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
