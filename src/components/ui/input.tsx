import * as React from "react";
import { cn } from "~/util/cn";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"flex h-10 w-full rounded-md border border-neutral-300 bg-neutral-50 px-3 py-2 transition-colors text-base hover:border-teal-300 focus:border-teal-300 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-50 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };
