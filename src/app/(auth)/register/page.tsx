import { MainLayout } from "@/components/main-layout";
import { RegisterForm } from "./register-form";

export const metadata = {
	title: "Register",
};

export default function RegisterPage() {
	return (
		<MainLayout className="flex flex-col items-center justify-center">
			<div className="w-full max-w-md">
				<div className="bg-card flex flex-col rounded-xl border p-6 shadow-2xl shadow-blue-600/30">
					<div className="mb-8 flex flex-col justify-center text-center">
						<h3 className="text-3xl font-bold tracking-tight text-blue-600">
							Create Account
						</h3>
						<p className="text-muted-foreground mt-2 text-base">
							Enter your information to get started.
						</p>
					</div>
					<RegisterForm />
				</div>
			</div>
		</MainLayout>
	);
}
