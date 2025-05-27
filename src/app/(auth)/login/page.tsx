import { NextLink } from "@/components/ui/next-link";
import { LoginForm } from "@/components/forms/signed-out/login.form";

export const metadata = {
	title: "Login",
};

export default function LoginPage() {
	return (
		<div className="mx-auto max-w-3xl px-6 md:px-0 flex flex-col space-y-4 items-center justify-center w-screen h-screen">
			<LoginForm />
			<div className="flex justify-center text-center text-sm">
				<p className="text-muted-foreground">
					By logging in, you agree to our{" "}
					<NextLink
						href="/terms"
						className="font-semibold text-blue-600 underline-offset-2 hover:underline"
					>
						Terms of Service
					</NextLink>{" "}
					and{" "}
					<NextLink
						href="/privacy"
						className="font-semibold text-blue-600 underline-offset-2 hover:underline"
					>
						Privacy Policy
					</NextLink>
					.
				</p>
			</div>
		</div>
	);
}
