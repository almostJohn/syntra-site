import { LoginForm } from "./login-form";

export const metadata = {
	title: "Login",
};

export default function LoginPage() {
	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<LoginForm />
			</div>
		</div>
	);
}
