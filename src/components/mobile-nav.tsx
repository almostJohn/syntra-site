"use client";

import { useState } from "react";

import {
	Sheet,
	SheetContent,
	SheetTrigger,
	SheetTitle,
	SheetDescription,
} from "./ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "./ui/button";
import { NextLink } from "./ui/next-link";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";

export function MobileNav() {
	const [interacted, setInteracted] = useState(false);

	return (
		<Sheet open={interacted} onOpenChange={setInteracted}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="cursor-pointer rounded px-2 transition-all duration-300 hover:bg-blue-600/10 hover:text-blue-600/90 md:hidden"
				>
					<Icons.menu className="size-6 shrink-0" />
				</Button>
			</SheetTrigger>
			<SheetContent side="right">
				<VisuallyHidden>
					<SheetTitle>MenuTitle</SheetTitle>
					<SheetDescription>MenuDescription</SheetDescription>
				</VisuallyHidden>
				<div className="mt-4 flex flex-col gap-2 p-8">
					<NextLink
						href="/login"
						className={cn(
							"inline-flex items-center justify-center rounded bg-transparent px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 hover:bg-blue-600/10 hover:text-blue-600/90",
						)}
						onClick={() => setInteracted(false)}
					>
						Login
					</NextLink>
					<NextLink
						href="/register"
						className={cn(
							"inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-sm font-medium whitespace-nowrap text-white transition-all duration-300 hover:bg-blue-700",
						)}
						onClick={() => setInteracted(false)}
					>
						Sign Up
					</NextLink>
				</div>
			</SheetContent>
		</Sheet>
	);
}
