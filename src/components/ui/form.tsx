import * as React from "react";
import { cn } from "@/lib/utils";

type FormProps = React.ComponentProps<"form">;

export function Form({ className, children, ...props }: FormProps) {
	return (
		<form className={cn("flex flex-col gap-4", className)} {...props}>
			{children}
		</form>
	);
}

export function FormControl({
	className,
	children,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex flex-col gap-2", className)} {...props}>
			{children}
		</div>
	);
}
