import * as React from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<section
			className={cn(
				"container mx-auto max-w-6xl px-6 py-16 sm:px-4 lg:py-24",
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
		<div
			className={cn("mx-auto max-w-4xl space-y-8 text-center", className)}
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
				"mb-4 text-4xl font-bold text-balance lg:text-6xl",
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
				"mx-auto max-w-2xl text-xl leading-relaxed text-pretty text-neutral-500",
				className,
			)}
			{...props}
		/>
	);
}

export function PageActions({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"flex flex-col justify-center gap-4 sm:flex-row",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
