import { NextLink } from "@/components/ui/next-link";
import { Form as LoginForm } from "./form";
import { Icons } from "@/components/icons";

export const metadata = {
	title: "login",
};

export default function LoginPage() {
	return (
		<div className="mx-auto flex h-screen w-screen flex-col items-center justify-center px-8">
			<div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
				<div className="flex flex-col gap-2 text-center">
					<div className="mx-auto flex justify-center">
						<Icons.todo className="size-38 shrink-0" />
					</div>
					<h1 className="text-2xl font-semibold tracking-tight">
						Welcome back
					</h1>
					<p className="text-muted-foreground text-sm">
						Enter your credentials to login into your account.
					</p>
				</div>
				<div className="grid gap-6">
					<LoginForm />
					<p className="text-muted-foreground px-8 text-center text-sm">
						Need an account?{" "}
						<NextLink
							href="/register"
							className="underline underline-offset-4 hover:text-neutral-100"
						>
							Sign Up
						</NextLink>
					</p>
				</div>
			</div>
		</div>
	);
}
