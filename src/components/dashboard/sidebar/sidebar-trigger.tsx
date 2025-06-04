import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";

type SidebarTriggerProps = {
	onTrigger(): void;
};

export function SidebarTrigger({ onTrigger }: SidebarTriggerProps) {
	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={onTrigger}
			className="cursor-pointer size-11"
		>
			<PanelLeft className="size-4 shrink-0" />
		</Button>
	);
}
