import { Icons } from "@/components/icons";

export default function Loading() {
	return (
		<div className="mx-auto max-w-3xl h-screen w-screen flex flex-col space-y-4 items-center justify-center">
			<div className="mx-auto flex justify-center">
				<Icons.loading className="size-20 shrink-0" />
			</div>
			<p className="font-medium">Now Loading...</p>
		</div>
	);
}
