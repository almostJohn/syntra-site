import { MainLayout } from "@/components/main-layout";
import { RegisterForm } from "./register-form";

export const metadata = {
	title: "Register",
};

export default function RegisterPage() {
	return (
		<MainLayout>
			<div className="flex h-screen w-screen items-center justify-center px-8 sm:px-6">
				<div className="flex w-full max-w-md flex-col justify-center gap-6">
					<div className="flex flex-col gap-2 text-center">
						<h3 className="text-2xl font-semibold tracking-tight">
							Create an account
						</h3>
						<p className="text-muted-foreground text-sm">
							Enter your information to get started.
						</p>
					</div>
					<RegisterForm />
				</div>
			</div>
		</MainLayout>
	);
}
