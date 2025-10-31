import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

export const metadata = {
	title: "Register",
};

const REGISTER_TITLE = "Create an account" as const;
const REGISTER_DESCRIPTION =
	"User registration for this instance is currently disabled." as const;

export default function RegisterPage() {
	return (
		<div className="mx-auto flex h-screen w-screen flex-col items-center justify-center px-8">
			<div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
				<div className="flex flex-col gap-2 text-center">
					<div className="mx-auto flex justify-center">
						<Icons.todo className="size-38 shrink-0" />
					</div>
					<h1 className="text-2xl font-semibold tracking-tight">
						{REGISTER_TITLE}
					</h1>
					<p className="text-muted-foreground text-sm">
						{REGISTER_DESCRIPTION}
					</p>
				</div>
				<div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-center">
					<NextLink
						href="/"
						className={cn(
							buttonVariants({
								className: "group",
								variant: "outline",
							}),
						)}
					>
						<ArrowLeft className="size-4 shrink-0 transition-transform group-hover:-translate-x-1" />{" "}
						Back
					</NextLink>
					<NextLink href="/login" className={cn(buttonVariants())}>
						Login
					</NextLink>
				</div>
			</div>
		</div>
	);
}
