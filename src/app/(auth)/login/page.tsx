import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";

export const metadata = {
	title: "Login",
};

export default function Page() {
	return (
		<div className="mx-auto flex h-screen w-screen items-center justify-center p-6 sm:p-4">
			<div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[350px]">
				<div className="flex flex-col gap-2 text-center">
					<h1 className="text-2xl font-bold">Welcome Back</h1>
					<p className="mx-auto max-w-lg text-pretty text-neutral-500">
						Enter your credentials to login into your account.
					</p>
				</div>
				<LoginForm />
				<p className="text-center text-sm text-neutral-500">
					Don&apos;t have an account?{" "}
					<Link
						href="/register"
						className="font-medium text-teal-500 underline"
					>
						Register
					</Link>
					.
				</p>
			</div>
		</div>
	);
}
