import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const metadata = {
	title: "Register",
};

export default function Page() {
	return (
		<div className="mx-auto flex h-screen w-screen items-center justify-center p-6 sm:p-4">
			<div className="flex w-full flex-col justify-center gap-6 sm:w-[350px]">
				<div className="flex flex-col gap-2 text-center">
					<h1 className="text-2xl font-bold">Create An Account</h1>
					<p className="mx-auto max-w-lg text-pretty text-neutral-500">
						User registration for this instance is currently disabled.
					</p>
				</div>
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
					<Link
						href="/"
						className={cn(
							buttonVariants({ className: "group", variant: "outline" }),
						)}
					>
						<ArrowLeft className="size-4 shrink-0 transition-transform group-hover:-translate-x-1" />
						Home
					</Link>
					<Link href="/login" className={cn(buttonVariants())}>
						Login
					</Link>
				</div>
			</div>
		</div>
	);
}
