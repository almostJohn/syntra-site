import { Loader } from "lucide-react";

export default function Loading() {
	return (
		<div className="flex items-center justify-center py-20">
			<Loader className="animate-spin text-neutral-500" />
		</div>
	);
}
