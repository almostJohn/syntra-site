import { Icons } from "@/components/icons";

export default function Loading() {
	return (
		<div className="mx-auto flex flex-col items-center justify-center gap-2 py-24 md:py-32 lg:py-40">
			<div className="mx-auto flex justify-center">
				<Icons.loading className="size-20 shrink-0 text-neutral-500" />
			</div>
			<p className="text-neutral-500">Loading...</p>
		</div>
	);
}
