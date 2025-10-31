import { cn } from "@/lib/utils";

export function Empty({
	className,
	children,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"mx-auto flex flex-col items-center justify-center gap-4 py-24 text-center",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}

export function EmptyHeader({
	className,
	children,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div className={cn("mx-auto flex justify-center", className)} {...props}>
			{children}
		</div>
	);
}

export function EmptyIconPlaceholder({
	className,
	children,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"inline-flex size-16 items-center justify-center rounded-full border border-neutral-300 bg-neutral-200",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}

export function EmptyContent({
	className,
	...props
}: React.ComponentProps<"p">) {
	return (
		<p
			className={cn("text-center text-sm text-neutral-500", className)}
			{...props}
		/>
	);
}
