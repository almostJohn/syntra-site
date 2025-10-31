import { NextLink } from "@/components/ui/next-link";
import { Icons } from "@/components/icons";
import { LoginForm } from "@/components/custom/forms/login-form";

export const metadata = {
	title: "Login",
};

const LOGIN_TITLE = "Welcome back" as const;
const LOGIN_DESCRIPTION =
	"Enter your credentials to login into your account." as const;

export default function LoginPage() {
	return (
		<div className="mx-auto flex h-screen w-screen flex-col items-center justify-center px-8">
			<div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
				<div className="flex flex-col gap-2 text-center">
					<div className="mx-auto flex justify-center">
						<Icons.todo className="size-38 shrink-0" />
					</div>
					<h1 className="text-2xl font-semibold tracking-tight">
						{LOGIN_TITLE}
					</h1>
					<p className="text-muted-foreground text-sm">{LOGIN_DESCRIPTION}</p>
				</div>
				<LoginForm />
				<div className="grid gap-6">
					<p className="text-muted-foreground px-8 text-center text-sm">
						Need an account?{" "}
						<NextLink
							href="/register"
							className="font-medium text-blue-600 underline underline-offset-4"
						>
							Register
						</NextLink>
					</p>
				</div>
			</div>
		</div>
	);
}
