import { Form as RegisterForm } from "./form";

export const metadata = {
	title: "Register",
};

export default function RegisterPage() {
	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<div className="rounded-sm p-6 bg-transparent border border-neutral-200 dark:border-neutral-700 shadow-sm">
					<h3 className="text-2xl font-bold text-center mb-6">
						Register an Account
					</h3>
					<RegisterForm />
				</div>
			</div>
		</div>
	);
}
