import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getCurrentUser } from "@/lib/auth/sessions";
import { Header } from "../_components/main/header";
import { Projects } from "../_components/main/projects";
import { Icons } from "@/components/icons";

export default async function DashboardPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col gap-4">
			<Header />
			<Suspense fallback={<Loading />}>
				<Projects userId={user.id} />
			</Suspense>
		</div>
	);
}

function Loading() {
	return (
		<div className="mx-auto max-w-3xl flex flex-col space-y-4 items-center justify-center py-18 md:py-28">
			<div className="mx-auto flex justify-center">
				<Icons.loading className="size-16 shrink-0" />
			</div>
			<p className="font-medium">Loading Projects...</p>
		</div>
	);
}
