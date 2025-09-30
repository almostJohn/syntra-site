import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function SettingsPage() {
	const user = await auth.getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col gap-4">
			{/* Settings Page Header */}
			<div className="flex items-center justify-between">
				<div className="grid gap-1">
					<h1 className="text-lg font-semibold tracking-tight">
						Account Settings
					</h1>
					<p className="text-muted-foreground text-sm">
						Manage your account preferences.
					</p>
				</div>
			</div>
		</div>
	);
}
