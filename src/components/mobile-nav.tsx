"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Icons } from "./icons";

export function MobileNav() {
	const router = useRouter();

	return (
		<div className="flex items-center justify-end md:hidden">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon" className="hover:bg-transparent">
						<Icons.menu />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem
						className="rounded-md"
						onSelect={() => router.push("/")}
					>
						Home
					</DropdownMenuItem>
					<DropdownMenuItem
						className="rounded-md"
						onSelect={() => router.push("/about")}
					>
						About
					</DropdownMenuItem>
					<DropdownMenuItem
						className="rounded-md"
						onSelect={() => router.push("/contact")}
					>
						Contact
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
