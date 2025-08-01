import { RegisterForm } from "@/components/auth/forms/register-form";

export const metadata = {
	title: "Register",
};

export default function RegisterPage() {
	return (
		<div className="min-h-screen flex">
			<div className="relative hidden w-1/2 overflow-hidden md:block">
				<div
					className="absolute inset-0 opacity-30"
					style={{
						backgroundImage: `
						linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
          	linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
					`,
						backgroundSize: "60px 60px",
					}}
				/>
				<div
					className="absolute inset-0 opacity-20 hidden dark:block"
					style={{
						backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
						backgroundSize: "60px 60px",
					}}
				/>
			</div>
			<div className="flex min-h-screen w-full items-center justify-center px-4 md:w-1/2">
				<div className="max-w-md w-full space-y-8">
					<div className="flex flex-col gap-2 text-center justify-center">
						<div className="text-3xl font-bold">Create An Account</div>
						<div className="text-neutral-500">
							Enter your information to get started.
						</div>
					</div>
					<RegisterForm />
				</div>
			</div>
		</div>
	);
}
