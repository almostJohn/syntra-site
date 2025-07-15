import { ForgotPasswordStepOneForm } from "./forgot-password-step-one-form";

export const metadata = {
	title: "Reset Password",
};

export default function ForgotPasswordStepOnePage() {
	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<ForgotPasswordStepOneForm />
			</div>
		</div>
	);
}
