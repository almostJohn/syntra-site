import { Form as LoginForm } from "./form";

export const metadata = {
	title: "Login",
};

export default function LoginPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			<div className="mx-auto max-w-md px-6 md:px-4">
				<div className="space-y-6">
					<div className="space-y-2">
						<h1 className="text-center text-2xl font-bold">Welcome Back</h1>
						<p className="text-muted-foreground text-center text-lg">
							Enter your credentials to login into your account.
						</p>
					</div>
					<LoginForm />
				</div>
			</div>
		</div>
	);
}
