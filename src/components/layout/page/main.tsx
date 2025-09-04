import { cn } from "@/lib";
import * as React from "react";

export function Main({
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
