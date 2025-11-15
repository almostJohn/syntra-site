import * as React from "react";
import { cn } from "@/lib/utils";

export function Empty({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center rounded-md border-2 border-dashed border-neutral-200 p-6 text-center text-sm text-neutral-500",
				className,
			)}
			{...props}
		/>
	);
}

export function EmptyHeading({
	className,
	...props
}: React.ComponentProps<"h3">) {
	return (
		<h3
			className={cn("mb-2 text-lg font-semibold text-neutral-700", className)}
			{...props}
		/>
	);
}

export function EmptyText({ className, ...props }: React.ComponentProps<"p">) {
	return <p className={cn("text-sm text-neutral-500", className)} {...props} />;
}
