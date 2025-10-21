import type { PropsWithChildren } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function TaskColumn({ children }: PropsWithChildren) {
	return (
		<ScrollArea className="max-h-[calc(100vh-300px)]">
			<div className="flex flex-col gap-4 p-4">{children}</div>
		</ScrollArea>
	);
}
