import type { PropsWithChildren } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function TaskColumn({ children }: PropsWithChildren) {
	return (
		<ScrollArea className="overflow-y-auto max-h-[calc(100vh-220px)] p-4">
			<div className="flex flex-col gap-4">{children}</div>
		</ScrollArea>
	);
}
