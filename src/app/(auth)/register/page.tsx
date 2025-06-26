import { NextLink } from "@/components/ui/next-link";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata = {
	title: "Register",
};

export default function RegisterPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-neutral-50 via-blue-50 to-indigo-100 p-4">
			<div className="w-full max-w-md">
				<RegisterForm />
				<div className="pt-3 flex items-center justify-center text-center">
					<p className="text-sm text-muted-foreground">
						By registering an account, you agree to our{" "}
						<NextLink
							href="/terms"
							className="font-medium text-[#5865f2] transition-colors hover:underline hover:text-[#5865f2]/80"
						>
							Terms of Service
						</NextLink>{" "}
						and{" "}
						<NextLink
							href="/privacy"
							className="font-medium text-[#5865f2] transition-colors hover:underline hover:text-[#5865f2]/80"
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
