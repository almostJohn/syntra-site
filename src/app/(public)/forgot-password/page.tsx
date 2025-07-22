import { Form as ForgotPasswordForm } from "./form";

export const metadata = {
	title: "Forgot Password",
};

export default function ForgotPasswordPage() {
	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<div className="rounded-sm p-6 bg-transparent border border-neutral-200 dark:border-neutral-700 shadow-sm">
					<h3 className="text-2xl font-bold text-center mb-6">
						Reset Your Password
					</h3>
					<ForgotPasswordForm />
				</div>
			</div>
		</div>
	);
}
