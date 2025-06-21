"use client";

import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
	Drawer,
	DrawerTrigger,
	DrawerContent,
	DrawerTitle,
	DrawerDescription,
} from "./ui/drawer";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { NextLink } from "./ui/next-link";
import { Icons } from "./icons";
import { LogoutButton } from "./auth/logout-button";

type SignedInMobileNavProps = {
	email: string;
	name: string;
};

export function SignedInMobileNav({ email, name }: SignedInMobileNavProps) {
	const [interacted, setInteracted] = useState(false);

	return (
		<Drawer open={interacted} onOpenChange={setInteracted}>
			<DrawerTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="cursor-pointer hover:bg-transparent md:hidden"
					onClick={() => setInteracted(!interacted)}
				>
					<Icons.menu className="size-6 shrink-0" />
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<VisuallyHidden>
					<DrawerTitle>TitleMenu</DrawerTitle>
					<DrawerDescription>DescriptionMenu</DrawerDescription>
				</VisuallyHidden>
				<div className="p-8 flex flex-col gap-4">
					<div className="flex items-center gap-3 mb-2">
						<Avatar className="size-10 rounded border border-blue-600">
							<AvatarFallback className="bg-blue-50 rounded text-blue-600">
								<span className="font-medium">
									{name.charAt(0).toUpperCase()}
								</span>
							</AvatarFallback>
						</Avatar>
						<div className="flex flex-col space-y-0.5">
							<span className="text-sm font-medium">{name}</span>
							<span className="text-sm text-muted-foreground truncate">
								{email}
							</span>
						</div>
					</div>
					<div className="border-t border-border w-full" />
					<div className="flex flex-col gap-2">
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
					<div className="border-t border-border w-full" />
					<div className="mt-2">
						<LogoutButton isDropdownMenu={false} />
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
