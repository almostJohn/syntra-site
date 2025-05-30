"use client";

import { useState } from "react";
import { NextLink } from "./ui/next-link";
import {
	Drawer,
	DrawerTrigger,
	DrawerContent,
	DrawerTitle,
	DrawerDescription,
} from "./ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { icons } from "./icons";
import { LogoutButton } from "./logout-button";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

type MobileNavProps = {
	email?: string;
	displayName?: string;
	isSignedIn: boolean;
};

function SignedOutButtons() {
	const [interacted, setInteracted] = useState(false);

	function handleToggle() {
		setInteracted(!interacted);
	}

	return (
		<Drawer open={interacted} onOpenChange={setInteracted}>
			<DrawerTrigger asChild>
				<Button
					size="icon"
					variant="ghost"
					className="cursor-pointer hover:bg-transparent md:hidden"
					onClick={handleToggle}
				>
					<icons.Menu className="size-6" />
				</Button>
			</DrawerTrigger>
			<DrawerContent className="w-full">
				<VisuallyHidden>
					<DrawerTitle>Drawer Title</DrawerTitle>
					<DrawerDescription>Drawer Description</DrawerDescription>
				</VisuallyHidden>
				<div className="p-7 flex flex-col gap-y-4">
					<NextLink
						href="/login"
						className={cn(
							buttonVariants({
								variant: "outline",
								className: "text-lg h-10",
							}),
						)}
						onClick={() => setInteracted(false)}
					>
						Login
					</NextLink>
					<NextLink
						href="/register"
						className={cn(
							buttonVariants({
								variant: "primary",
								className: "text-lg h-10",
							}),
						)}
						onClick={() => setInteracted(false)}
					>
						Register
					</NextLink>
				</div>
			</DrawerContent>
		</Drawer>
	);
}

function UserDrawerMenu({
	email,
	displayName,
}: {
	email: string;
	displayName: string;
}) {
	const [interacted, setInteracted] = useState(false);

	function handleToggle() {
		setInteracted(!interacted);
	}

	return (
		<Drawer open={interacted} onOpenChange={setInteracted}>
			<DrawerTrigger asChild>
				<Button
					size="icon"
					variant="ghost"
					className="cursor-pointer hover:bg-transparent md:hidden"
					onClick={handleToggle}
				>
					<icons.Menu className="size-6" />
				</Button>
			</DrawerTrigger>
			<DrawerContent className="w-full">
				<VisuallyHidden>
					<DrawerTitle>Drawer Title</DrawerTitle>
					<DrawerDescription>Drawer Description</DrawerDescription>
				</VisuallyHidden>
				<div className="p-7 flex flex-col gap-y-4">
					<div className="flex items-center gap-3">
						<Avatar className="rounded-sm size-11 border border-blue-200">
							<AvatarFallback className="bg-blue-50 text-blue-600 rounded-sm">
								{displayName.charAt(0).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col space-y-0.5">
							<span className="font-semibold leading-snug capitalize">
								{displayName}
							</span>
							<span className="text-sm text-muted-foreground truncate">
								{email}
							</span>
						</div>
					</div>
					<div className="border-t border-border w-full" />
					<div className="flex flex-col space-y-4">
						<NextLink
							href="/dashboard"
							className="text-lg font-medium underline-offset-2 hover:underline"
							onClick={() => setInteracted(false)}
						>
							Dashboard
						</NextLink>
						<NextLink
							href="/dashboard/profile"
							className="text-lg font-medium underline-offset-2 hover:underline"
							onClick={() => setInteracted(false)}
						>
							Profile
						</NextLink>
						<NextLink
							href="/dashboard/settings"
							className="text-lg font-medium underline-offset-2 hover:underline"
							onClick={() => setInteracted(false)}
						>
							Settings
						</NextLink>
					</div>
					<div className="border-t border-border w-full" />
					<LogoutButton isDropdownMenu={false} className="h-10 text-lg" />
				</div>
			</DrawerContent>
		</Drawer>
	);
}

export function MobileNav({ email, displayName, isSignedIn }: MobileNavProps) {
	return (
		<>
			{!isSignedIn ? (
				<SignedOutButtons />
			) : (
				email &&
				displayName && (
					<UserDrawerMenu email={email} displayName={displayName} />
				)
			)}
		</>
	);
}
