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

export function MainNav() {
	return (
		<div className="hidden items-center justify-end gap-3 md:flex">
			{navItems.map((item, index) => (
				<NextLink
					key={index}
					href={item.href}
					className={cn(
						buttonVariants({
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
