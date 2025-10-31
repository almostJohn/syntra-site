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

export function FormLabel({
	className,
	...props
}: React.ComponentProps<"label">) {
	return (
		<label
			className={cn(
				"flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
				className,
			)}
			{...props}
		/>
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

export function FormAction({
	className,
	children,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"flex flex-col-reverse gap-2 md:flex-row md:items-center",
				className,
			)}
			{...props}
		>
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
