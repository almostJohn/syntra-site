"use client";

import { useState } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerTitle,
	DrawerTrigger,
} from "./ui/drawer";
import { Button, buttonVariants } from "./ui/button";
import { Icons } from "./icons";
import { NextLink } from "./ui/next-link";
import { cn } from "@/lib/utils";

const navItems = [
	{
		title: "Login",
		href: "/login",
	},
	{
		title: "Register",
		href: "/register",
	},
];

export function SignedOutMobileNav() {
	const [interacted, setInteracted] = useState(false);

	return (
		<Drawer open={interacted} onOpenChange={setInteracted}>
			<DrawerTrigger asChild>
				<Button
					variant="ghost"
					className="cursor-pointer hover:bg-transparent md:hidden"
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
					{navItems.map((item, index) => (
						<NextLink
							key={index}
							href={item.href}
							onClick={() => setInteracted(false)}
							className={cn(
								buttonVariants({
									className: "h-10 text-lg font-semibold",
									variant:
										item.href === "/login"
											? "outline"
											: item.href === "/register"
												? "primary"
												: null,
								}),
							)}
						>
							{item.title}
						</NextLink>
					))}
				</div>
			</DrawerContent>
		</Drawer>
	);
}
