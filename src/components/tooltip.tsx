import * as React from "react";
import {
	Tooltip as TooltipWrapper,
	TooltipProvider,
	TooltipTrigger,
	TooltipContent,
} from "./ui/tooltip";

export function Tooltip({
	children,
	content,
}: {
	readonly children: React.ReactNode;
	readonly content: string;
}) {
	return (
		<TooltipProvider>
			<TooltipWrapper>
				<TooltipTrigger>{children}</TooltipTrigger>
				<TooltipContent>{content}</TooltipContent>
			</TooltipWrapper>
		</TooltipProvider>
	);
}
