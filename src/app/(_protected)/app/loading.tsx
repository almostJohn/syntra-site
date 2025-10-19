import { Loader2 } from "lucide-react";

export default function Loading() {
	return (
		<div className="mx-auto flex items-center justify-center py-24 text-center">
			<Loader2 className="size-12 shrink-0 animate-spin" />
		</div>
	);
}
