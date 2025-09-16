import { MainLayout } from "@/components/main-layout";
import { LoginForm } from "./login-form";

export const metadata = {
	title: "Login",
};

export default function LoginPage() {
	return (
		<MainLayout>
			<div className="flex h-screen w-screen flex-col items-center justify-center px-8 sm:px-6">
				<div className="flex w-full max-w-md flex-col justify-center gap-6">
					<div className="flex flex-col gap-2 text-center">
						<h3 className="text-2xl font-semibold tracking-tight">
							Welcome back
						</h3>
						<p className="text-muted-foreground text-sm">
							Log in to continue to your account.
						</p>
					</div>
					<LoginForm />
				</div>
			</div>
		</MainLayout>
	);
}
