import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ProfileSection } from "../../_components/settings/profile-section";
import { ChangeUsernameSection } from "../../_components/settings/change-username-section";

export default async function SettingsPage() {
	const user = await auth.getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="grid gap-1">
				<h1 className="text-2xl/8 font-semibold sm:text-xl/8">Settings</h1>
				<p className="text-muted-foreground text-base/6 sm:text-sm/6">
					Manage your account information.
				</p>
			</div>
			<div className="flex flex-col gap-2">
				<ProfileSection user={user} />
				<ChangeUsernameSection user={user} />
			</div>
		</div>
	);
}
