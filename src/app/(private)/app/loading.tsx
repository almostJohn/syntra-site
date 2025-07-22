import { Icons } from "@/components/icons";

export default function Loading() {
	return (
		<div className="mx-auto max-w-3xl flex items-center justify-center py-18 md:py-32">
			<Icons.loading className="size-6 shrink-0" />
		</div>
	);
}
