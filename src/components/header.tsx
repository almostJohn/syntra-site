import Link from "next/link";

export function Header() {
	return (
		<div className="block p-4 bg-neutral-200/50">
			<div className="flex items-center justify-between w-full">
				<Link
					href="/"
					className="text-xl font-bold leading-tight text-blue-700 tracking-tighter md:text-2xl"
				>
					simplynote
				</Link>
				<div className="flex items-center gap-2 text-sm font-medium">
					<a
						href="https://x.com/almostJohn1"
						rel="noreferrer"
						target="_blank"
						className="underline underline-offset-4 text-blue-700"
					>
						twitter
					</a>
					/
					<a
						href="https://github.com/almostJohn"
						rel="noreferrer"
						target="_blank"
						className="underline underline-offset-4 text-blue-700"
					>
						github
					</a>
				</div>
			</div>
		</div>
	);
}
