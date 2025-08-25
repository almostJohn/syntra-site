import * as React from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<section
			className={cn("relative z-10 py-12 md:py-20", className)}
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
		<div
			className={cn("mx-auto max-w-5xl text-center px-4 md:px-0", className)}
			{...props}
		>
			{children}
		</div>
	);
}

export function PageHeaderBody({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn("flex flex-col justify-center text-center", className)}
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
				"text-5xl font-bold tracking-tight text-balance sm:text-6xl",
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
				"mt-8 px-8 md:px-0 text-base text-pretty mx-auto max-w-2xl sm:text-xl/8",
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
			className={cn(
				"flex flex-col items-center gap-4 w-full md:w-auto md:flex-row md:justify-center mt-8 opacity-0 animate-slide",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}
