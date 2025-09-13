import * as React from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<section
			className={cn("relative overflow-hidden py-20 lg:py-32", className)}
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
			className={cn("mx-auto max-w-4xl px-6 text-center sm:px-4", className)}
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
				"mb-8 text-4xl font-bold text-balance md:text-6xl lg:text-7xl",
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
				"text-muted-foreground mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-pretty",
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
