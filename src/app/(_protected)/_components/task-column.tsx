import type { PropsWithChildren } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function TaskColumn({ children }: PropsWithChildren) {
	return (
		<ScrollArea className="max-h-[calc(100vh-300px)] p-6">
			<div className="grid gap-2">{children}</div>
		</ScrollArea>
	);
}
