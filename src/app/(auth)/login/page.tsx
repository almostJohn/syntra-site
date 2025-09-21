import { MainLayout } from "@/components/main-layout";
import { LoginForm } from "./login-form";

export const metadata = {
	title: "Login",
};

export default function LoginPage() {
	return (
		<MainLayout className="flex items-center justify-center p-4 sm:p-0">
			<div className="w-full max-w-md">
				<div className="flex flex-col">
					<div className="mb-8">
						<h1 className="mb-2 text-center text-4xl font-bold tracking-tight text-blue-600">
							Welcome
						</h1>
						<p className="text-muted-foreground mx-auto max-w-sm text-center text-pretty">
							Sign in to continue to your account.
						</p>
					</div>
					<LoginForm />
				</div>
			</div>
		</MainLayout>
	);
}
