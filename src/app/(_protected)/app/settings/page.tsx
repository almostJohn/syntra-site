import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { H1 } from "@/components/ui/heading";
import { P } from "@/components/ui/paragraph";

export default async function SettingsPage() {
	const currentUser = await auth.getCurrentUser();

	if (!currentUser) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="grid gap-1">
				<H1>Settings</H1>
				<P>Manage your account information.</P>
			</div>
		</div>
	);
}
