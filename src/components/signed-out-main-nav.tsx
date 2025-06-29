import { NextLink } from "./ui/next-link";
import { buttonVariants } from "./ui/button";
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

export function SignedOutMainNav() {
	return (
		<div className="hidden items-center justify-end space-x-3 md:flex">
			{navItems.map((item, index) => (
				<NextLink
					key={index}
					href={item.href}
					className={cn(
						buttonVariants({
							className: "cursor-pointer",
							variant:
								item.href === "/login"
									? "ghost"
									: item.href === "/register"
									? "default"
									: null,
						}),
					)}
				>
					{item.title}
				</NextLink>
			))}
		</div>
	);
}
