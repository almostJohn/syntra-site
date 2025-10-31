import { cn } from "@/lib/utils";
import * as React from "react";

export function P({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p
			className={cn("text-base/6 text-neutral-500 sm:text-sm/6", className)}
			{...props}
		/>
	);
}
