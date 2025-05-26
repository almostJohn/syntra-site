"use client";

import {
	type ForwardRefExoticComponent,
	type RefAttributes,
	useEffect,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { NextLink } from "@/components/ui/next-link";
import { cn } from "@/lib/utils";
import { Check, X, CircleAlert, type LucideProps } from "lucide-react";

const config: Record<
	string,
	{
		title: string;
		message: string;
		color: string;
		icon: ForwardRefExoticComponent<
			Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
		>;
	}
> = {
	success: {
		title: "verified",
		message: "Your email has been verified!",
		color: "green",
		icon: Check,
	},
	expired: {
		title: "expired",
		message: "This verification link has expired.",
		color: "yellow",
		icon: CircleAlert,
	},
	invalid: {
		title: "invalid",
		message: "This verification link is invalid or already used.",
		color: "red",
		icon: X,
	},
	error: {
		title: "error",
		message: "Something went wrong on our end.",
		color: "red",
		icon: X,
	},
	missing: {
		title: "missing",
		message: "Verification token is missing.",
		color: "orange",
		icon: CircleAlert,
	},
};

export function VerifyResult() {
	const router = useRouter();

	const params = useSearchParams();

	const status = params.get("status") ?? "error";

	const { title, message, color, icon: Icon } = config[status] ?? config.error;

	useEffect(() => {
		document.cookie = "verify-status=; Max-Age=0; path=/";

		const timeout = setTimeout(() => {
			router.push("/login");
		}, 5000);

		return () => clearTimeout(timeout);
	}, [router]);

	return (
		<>
			<div
				className={cn(
					"block border-l-4 pl-3 py-4 pr-8 rounded-l rounded-r",
					color === "green" && "bg-green-500/10 border-green-500",
					color === "yellow" && "bg-yellow-500/10 border-yellow-500",
					color === "red" && "bg-red-500/10 border-red-500",
					color === "orange" && "bg-orange-500/10 border-orange-500",
				)}
			>
				<div className="flex flex-col space-y-4">
					<h1 className="text-xl font-bold">Email Verification Status</h1>
					<div className="flex flex-col space-y-1">
						<div className="flex items-center gap-2">
							<Icon
								className={cn(
									"h-6 w-6",
									color === "green" && "text-green-500",
									color === "yellow" && "text-yellow-500",
									color === "red" && "text-red-500",
									color === "orange" && "text-orange-500",
								)}
							/>
							<h3
								className={cn(
									"text-lg font-semibold capitalize",
									color === "green" && "text-green-500",
									color === "yellow" && "text-yellow-500",
									color === "red" && "text-red-500",
									color === "orange" && "text-orange-500",
								)}
							>
								{title}
							</h3>
						</div>
						<p className="text-sm">{message}</p>
					</div>
					<NextLink
						href="/login"
						className="font-semibold underline-offset-2 hover:underline text-blue-600"
					>
						Back to login page
					</NextLink>
				</div>
			</div>
		</>
	);
}
