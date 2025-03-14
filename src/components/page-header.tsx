import * as React from "react";
import { cn } from "~/lib/utils";

export function PageHeader({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<section
			className={cn("w-full py-12 md:py-24 lg:py-32 xl:py-48", className)}
			{...props}
		>
			{children}
		</section>
	);
}

export function PageHeaderContainer({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<section className={cn("container", className)} {...props}>
			{children}
		</section>
	);
}

export function PageHeaderBody({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}

export function PageHeaderHeading({
	className,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h1
			className={cn(
				"text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none",
				className,
			)}
			{...props}
		/>
	);
}

export function PageHeaderDescription({
	className,
	...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			className={cn(
				"max-w-[600px] text-muted-foreground md:text-xl",
				className,
			)}
			{...props}
		/>
	);
}

export function PageHeaderActions({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("flex flex-col gap-2 md:flex-row", className)}
			{...props}
		>
			{children}
		</div>
	);
}
