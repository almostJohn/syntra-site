import { cn } from "@/lib/utils";
import * as React from "react";

export function Form({
	className,
	children,
	...props
}: React.ComponentProps<"form">) {
	return (
		<form className={cn("flex flex-col gap-4", className)} {...props}>
			{children}
		</form>
	);
}

export function FormField({
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

export function FormFieldError({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			className={cn("text-sm font-medium text-red-500", className)}
			{...props}
		/>
	);
}
