import { NextLink } from "@/components/ui/next-link";
import { ForgotPasswordForm } from "./forgot-password-form";

export const metadata = {
	title: "Reset Password",
};

export default function ForgotPasswordPage() {
	return (
		<div className="mx-auto max-w-md px-6 md:px-0 flex flex-col space-y-4 items-center justify-center w-screen h-screen">
			<ForgotPasswordForm />
			<div className="mx-auto flex justify-center text-center">
				<p className="text-sm text-muted-foreground">
					By resetting your password, you agree to our{" "}
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
