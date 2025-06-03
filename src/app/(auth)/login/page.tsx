import { NextLink } from "@/components/ui/next-link";
import { LoginForm } from "@/components/auth/login-form";

export const metadata = {
	title: "Login",
};

export default function LoginPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
			<div className="w-full max-w-md">
				<LoginForm />
				<div className="pt-3 flex items-center justify-center text-center">
					<p className="text-sm text-muted-foreground">
						By signing in, you agree to our{" "}
						<NextLink
							href="/terms"
							className="font-medium text-blue-600 transition-colors hover:text-blue-700"
						>
							Terms of Service
						</NextLink>{" "}
						and{" "}
						<NextLink
							href="/privacy"
							className="font-medium text-blue-600 transition-colors hover:text-blue-700"
						>
							Privacy Policy
						</NextLink>
						.
					</p>
				</div>
			</div>
		</div>
	);
}
