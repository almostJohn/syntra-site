import { NextLink } from "@/components/ui/next-link";
import { Icons } from "@/components/icons";
import { UserDropdown } from "./user-dropdown.app";

type User = {
	id: string;
	username: string;
};

type NavbarProps = {
	user: User;
};

export function Navbar({ user }: NavbarProps) {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-900/95 backdrop-blur-xl supports-[backdrop-filter]:bg-neutral-900/60">
			<div className="flex h-18 w-full items-center justify-between px-4 sm:px-6 md:px-8">
				<NextLink href="/app" className="flex items-center gap-2">
					<Icons.todo className="size-8 shrink-0" />
					<h1 className="text-xl font-bold sm:text-2xl">syntra</h1>
				</NextLink>
				<div className="flex items-center justify-end gap-2">
					<UserDropdown user={user} />
				</div>
			</div>
		</header>
	);
}
