"use client";

import * as React from "react";
import Link from "next/link";
import {
	Drawer,
	DrawerContent,
	DrawerTrigger,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
} from "./ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "./ui/button";
import { AlignLeft } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { cn } from "~/lib/utils";

const navItems = [
	{
		label: "Home",
		href: "/",
	},
	{
		label: "Features",
		href: "/#features",
	},
	{
		label: "About",
		href: "/about",
	},
	{
		label: "Notes",
		href: "/notes",
	},
];

export function MobileNav() {
	const [open, setOpen] = React.useState(false);

	function handleLinkClick() {
		setOpen(false);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="hover:bg-transparent md:hidden"
				>
					<AlignLeft />
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<VisuallyHidden>
					<DrawerHeader>
						<DrawerTitle>MobileNav</DrawerTitle>
						<DrawerDescription>MobileNavDescription</DrawerDescription>
					</DrawerHeader>
				</VisuallyHidden>
				<div className="p-8">
					<div className="flex flex-col gap-2">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={cn(
									buttonVariants({
										variant: "link",
										className: "text-lg font-semibold w-full",
									}),
								)}
								onClick={handleLinkClick}
							>
								{item.label}
							</Link>
						))}
					</div>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
