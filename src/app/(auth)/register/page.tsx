import { NextLink } from "@/components/ui/next-link";
import { RegisterForm } from "../../../components/forms/register-form";

export const metadata = {
	title: "Register",
};

export default function RegisterPage() {
	return (
		<div className="mx-auto max-w-3xl px-6 md:px-0 flex flex-col space-y-4 items-center justify-center w-screen h-screen">
			<RegisterForm />
			<div className="flex justify-center text-center text-sm">
				<p className="text-muted-foreground">
					By registering an account, you agree to our{" "}
					<NextLink
						href="/terms"
						className="font-semibold text-blue-600 underline-offset-2 hover:underline"
					>
						Terms of Service
					</NextLink>
					,{" "}
					<NextLink
						href="/privacy"
						className="font-semibold text-blue-600 underline-offset-2 hover:underline"
					>
						Privacy Policy
					</NextLink>{" "}
					and{" "}
					<NextLink
						href="/cookies"
						className="font-semibold text-blue-600 underline-offset-2 hover:underline"
					>
						Cookie Policy
					</NextLink>
					.
				</p>
			</div>
		</div>
	);
}
