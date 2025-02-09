import * as React from "react";
import Link from "next/link";
import { Icons } from "./icons";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export function MobileNav() {
	return (
		<div className="flex items-center md:hidden">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
						className="hover:bg-transparent size-8"
					>
						<Icons.menu />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="rounded-xl" align="start">
					<Link href="/" legacyBehavior>
						<DropdownMenuItem className="rounded-lg">Home</DropdownMenuItem>
					</Link>
					<Link href="/about" legacyBehavior>
						<DropdownMenuItem className="rounded-lg">About</DropdownMenuItem>
					</Link>
					<Link href="/notepad" legacyBehavior>
						<DropdownMenuItem className="rounded-lg">Notepad</DropdownMenuItem>
					</Link>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
