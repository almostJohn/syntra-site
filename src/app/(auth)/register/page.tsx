import { RegisterForm } from "./register-form";

export const metadata = {
	title: "Register",
};

export default function RegisterPage() {
	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<RegisterForm />
			</div>
		</div>
	);
}
