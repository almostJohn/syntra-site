import { Icons } from "@/components/icons";

export default function Loading() {
	return (
		<div className="mx-auto flex items-center justify-center py-24 md:py-32 lg:py-40">
			<Icons.loading className="size-16 shrink-0 text-blue-500" />
		</div>
	);
}
