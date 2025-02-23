import * as React from "react";
import Link from "next/link";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

export function MobileNav() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="size-8 outline-none rounded-lg md:hidden"
				>
					<Menu className="size-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="rounded-lg" align="end">
				<DropdownMenuItem className="rounded-lg">
					<Link href="/">Home</Link>
				</DropdownMenuItem>
				<DropdownMenuItem className="rounded-lg">
					<Link href="/about">About</Link>
				</DropdownMenuItem>
				<DropdownMenuItem className="rounded-lg">
					<Link href="/notepad">Notepad</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
