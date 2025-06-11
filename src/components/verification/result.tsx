"use client";

import {
	type ForwardRefExoticComponent,
	type RefAttributes,
	useEffect,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
	CheckCircle,
	CircleAlert,
	CircleX,
	type LucideProps,
} from "lucide-react";

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
		title: "success",
		message: "Your email has been verified!",
		color: "green",
		icon: CheckCircle,
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
		icon: CircleX,
	},
	error: {
		title: "error",
		message: "Something went wrong on our end.",
		color: "red",
		icon: CircleX,
	},
	missing: {
		title: "missing",
		message: "Verification token is missing.",
		color: "orange",
		icon: CircleAlert,
	},
};

export function Result() {
	const router = useRouter();
	const params = useSearchParams();
	const status = params.get("status") ?? "error";
	const { title, message, color, icon: Icon } = config[status] ?? config.error;

	useEffect(() => {
		document.cookie = `${process.env.NEXT_REQUEST_STATUS_NAME}=; Max-Age=0; path=/`;

		const timeout = setTimeout(() => {
			router.push("/login");
		}, 5000);

		return () => clearTimeout(timeout);
	}, [router]);

	return (
		<>
			<div
				className={cn(
					"block p-6 rounded-md border shadow-lg",
					color === "green" && "bg-green-50 border-green-600",
					color === "yellow" && "bg-yellow-50 border-yellow-600",
					color === "red" && "bg-red-50 border-red-600",
					color === "orange" && "bg-orange-50 border-orange-600",
				)}
			>
				<div className="flex flex-col gap-6">
					<div className="flex justify-center">
						<Icon
							className={cn(
								"size-16",
								color === "green" && "text-green-600",
								color === "yellow" && "text-yellow-600",
								color === "red" && "text-red-600",
								color === "orange" && "text-orange-600",
							)}
						/>
					</div>
					<div className="flex flex-col space-y-2">
						<h1
							className={cn(
								"text-2xl capitalize font-bold text-center",
								color === "green" && "text-green-800",
								color === "yellow" && "text-yellow-800",
								color === "red" && "text-red-800",
								color === "orange" && "text-orange-800",
							)}
						>
							{title}
						</h1>
						<p
							className={cn(
								"text-base text-center",
								color === "green" && "text-green-700",
								color === "yellow" && "text-yellow-700",
								color === "red" && "text-red-700",
								color === "orange" && "text-orange-700",
							)}
						>
							{message}
						</p>
					</div>
					<div className="flex flex-col gap-2 rounded-sm border border-border bg-background px-4 py-2">
						<span className="text-lg font-semibold">Notice</span>
						<span className="text-sm text-muted-foreground">
							This page will become inaccessible in the next 5 seconds and will
							redirect you to our login page.
						</span>
					</div>
				</div>
			</div>
		</>
	);
}
