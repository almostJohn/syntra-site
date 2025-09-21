import { MainLayout } from "@/components/main-layout";
import { RegisterForm } from "./register-form";

export const metadata = {
	title: "Register",
};

export default function RegisterPage() {
	return (
		<MainLayout className="flex items-center justify-center p-4 sm:p-0">
			<div className="w-full max-w-md">
				<div className="flex flex-col">
					<div className="mb-8">
						<h1 className="mb-2 text-center text-4xl font-bold tracking-tight text-blue-600">
							Sign Up
						</h1>
						<p className="text-muted-foreground mx-auto max-w-sm text-center text-pretty">
							Fill out your information to get started.
						</p>
					</div>
					<RegisterForm />
				</div>
			</div>
		</MainLayout>
	);
}
