import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AvatarSettings } from "../../_components/avatar-settings.app";

export default async function SettingsPage() {
	const user = await auth.getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col gap-4">
			{/* Settings Page Header */}
			<div className="grid gap-1">
				<h1 className="text-lg font-semibold tracking-tight">Settings</h1>
				<p className="text-muted-foreground text-sm">
					Manage your account preferences.
				</p>
			</div>
			<div className="mt-2 grid gap-3">
				<AvatarSettings user={user} />
			</div>
		</div>
	);
}
