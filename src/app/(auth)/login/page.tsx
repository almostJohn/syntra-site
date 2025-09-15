import { MainLayout } from "@/components/main-layout";
import { LoginForm } from "./login-form";

export const metadata = {
	title: "Login",
};

export default function LoginPage() {
	return (
		<MainLayout className="flex items-center justify-center px-6 sm:px-4">
			<div className="w-full max-w-md">
				<div className="flex flex-col rounded-md border bg-white shadow-2xl">
					<div className="flex flex-col gap-2 p-6 text-center">
						<h3 className="text-2xl font-bold">Welcome Back!</h3>
						<p className="text-muted-foreground">
							Log in to continue to your account.
						</p>
					</div>
					<div className="mt-auto p-6 pt-0">
						<LoginForm />
					</div>
				</div>
			</div>
		</MainLayout>
	);
}
