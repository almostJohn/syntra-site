import * as React from "react";
import { cn } from "~/lib/utils";

export function PageHeader({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<section
			className={cn(
				"container mx-auto px-4 pt-12 pb-24 flex flex-col items-center",
				className,
			)}
			{...props}
		>
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
		<div className={cn("text-center mb-12", className)} {...props}>
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
				"text-4xl font-bold tracking-tight sm:text-5xl mb-4",
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
				"text-xl text-neutral-500 mb-6 max-w-2xl mx-auto",
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
			className={cn("flex items-center justify-center", className)}
			{...props}
		>
			{children}
		</div>
	);
}
