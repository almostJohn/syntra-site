import * as React from "react";
import { cn } from "@/lib/utils";

export function MainLayout({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("min-h-screen", className)} {...props}>
			{children}
		</div>
	);
}
