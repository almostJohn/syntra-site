import { NextLink } from "@/components/ui/next-link";
import { RegisterUserForm } from "./register-user-form";

export const metadata = {
	title: "Register",
};

export default function RegisterPage() {
	return (
		<div className="mx-auto max-w-md px-6 md:px-0 flex flex-col space-y-4 items-center justify-center w-screen h-screen">
			<RegisterUserForm />
			<div className="mx-auto flex justify-center text-center">
				<p className="text-sm text-muted-foreground">
					By creating an account, you agree to our{" "}
					<NextLink
						href="/terms"
						className="underline text-blue-600 font-medium"
					>
						Terms of Service
					</NextLink>{" "}
					and{" "}
					<NextLink
						href="/privacy"
						className="underline text-blue-600 font-medium"
					>
						Privacy Policy
					</NextLink>
					.
				</p>
			</div>
		</div>
	);
}
