import * as React from "react";
import { cn } from "@/lib";

export function SectionContainer({
	id,
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<section
			id={id}
			className={cn(
				"container mx-auto max-w-7xl px-6 py-16 md:px-4 lg:py-24",
				className,
			)}
			{...props}
		>
			{children}
		</section>
	);
}

export function SectionBody({
	className,
	children,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={cn("space-y-8", className)} {...props}>
			{children}
		</div>
	);
}

type SectionHeaderProps = React.HTMLAttributes<HTMLDivElement> & {
	title: string;
	subtitle?: string;
	description: string;
	badgeText?: string;
	isBadgeEnabled?: boolean;
	isGradientText?: boolean;
	isCenteredText?: boolean;
};

export function SectionHeader({
	title,
	subtitle,
	description,
	badgeText,
	isBadgeEnabled,
	isGradientText,
	isCenteredText,
	className,
	...props
}: SectionHeaderProps) {
	return (
		<div className={cn("space-y-4", className)} {...props}>
			{isBadgeEnabled && (
				<div className="from-scheme-primary to-scheme-foreground/80 relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r px-6 py-1 text-xs font-medium text-white">
					{badgeText}
				</div>
			)}
			{isGradientText && (
				<h1 className="from-scheme-primary to-scheme-foreground/80 bg-gradient-to-r bg-clip-text text-center text-4xl font-bold text-balance text-transparent lg:text-6xl">
					{title}
				</h1>
			)}
			{!isGradientText && (
				<h1 className="text-4xl font-bold text-balance lg:text-6xl">
					{title}{" "}
					<span className="from-scheme-primary to-scheme-foreground/80 bg-gradient-to-r bg-clip-text text-transparent">
						{subtitle}
					</span>
				</h1>
			)}
			<p
				className={cn(
					"text-scheme-foreground/50 text-lg leading-relaxed text-pretty sm:text-xl",
					isCenteredText && "text-center",
				)}
			>
				{description}
			</p>
		</div>
	);
}
