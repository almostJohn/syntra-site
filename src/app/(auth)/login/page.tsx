import { LoginForm } from "./login-form";

export const metadata = {
	title: "Login",
};

export default function LoginPage() {
	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<div className="w-full max-w-md">
				<div className="border-scheme-foreground/10 shadow-scheme-primary/60 flex h-full flex-col rounded-3xl border bg-white shadow-2xl">
					<div className="flex flex-col justify-center gap-2 px-6 pt-6 pb-3 text-center">
						<h2 className="text-2xl font-bold">Welcome Back!</h2>
						<p className="text-sm">Log in to continue to your account.</p>
					</div>
					<div className="mt-auto p-6">
						<LoginForm />
					</div>
				</div>
			</div>
		</div>
	);
}
