import { MainLayout } from "@/components/main-layout";
import { LoginForm } from "./login-form";

export const metadata = {
	title: "Login",
};

export default function LoginPage() {
	return (
		<MainLayout className="flex">
			<div className="border-border hidden w-1/3 overflow-hidden border-r-2 md:block">
				<div className="flex min-h-screen flex-col items-end justify-center pr-10">
					<h3 className="text-5xl font-bold tracking-tighter text-blue-600">
						Sign In
					</h3>
					<p className="text-muted-foreground mt-2 text-right text-base">
						Enter your username and password.
					</p>
				</div>
			</div>
			<div className="flex w-full items-center justify-start px-6 md:w-2/3 md:pl-10">
				<div className="w-full max-w-lg">
					{/* Mobile Header */}
					<div className="mx-auto mb-8 flex flex-col justify-center text-center md:hidden">
						<h3 className="text-3xl font-bold tracking-tight text-blue-600">
							Sign In
						</h3>
						<p className="text-muted-foreground mt-2 text-base">
							Enter your username and password.
						</p>
					</div>
					<LoginForm />
				</div>
			</div>
		</MainLayout>
	);
}
