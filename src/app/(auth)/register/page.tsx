import { buttonVariants } from "@/components/ui/button";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";
import { ArrowLeft, LockKeyhole } from "lucide-react";

export const metadata = {
	title: "create an account",
};

export default function RegisterPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			<div className="mx-auto max-w-md px-6 md:px-4">
				<div className="space-y-6">
					<div className="mx-auto flex justify-center">
						<div className="text-muted-foreground inline-flex size-26 items-center justify-center rounded-full border border-neutral-700 bg-neutral-800">
							<LockKeyhole className="size-14 shrink-0" />
						</div>
					</div>
					<div className="space-y-2 text-center">
						<h1 className="text-2xl font-bold">Create An Account</h1>
						<p className="text-muted-foreground text-lg">
							User registration for this instance is currently disabled.
						</p>
					</div>
					<div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-center">
						<NextLink
							href="/"
							className={cn(
								buttonVariants({
									className:
										"group h-9 rounded-none border border-neutral-100 bg-transparent px-6 py-2 hover:bg-neutral-100 hover:text-neutral-900",
								}),
							)}
						>
							<ArrowLeft className="size-4 shrink-0 transition-transform group-hover:-translate-x-1" />{" "}
							Go Back
						</NextLink>
						<NextLink
							href="/login"
							className={cn(
								buttonVariants({
									className:
										"h-9 rounded-none bg-neutral-100 px-6 py-2 text-neutral-900 hover:bg-neutral-100/80",
								}),
							)}
						>
							Login
						</NextLink>
					</div>
				</div>
			</div>
		</div>
	);
}
