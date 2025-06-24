import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Header } from "@/components/dashboard/settings/header";
import { AvatarSetting } from "@/components/dashboard/settings/avatar-setting";
import { UsernameSetting } from "@/components/dashboard/settings/username-setting";
import { NameSetting } from "@/components/dashboard/settings/name-setting";
import { DangerZoneSetting } from "@/components/dashboard/settings/danger-zone-setting";

export default async function SettingsPage() {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect("/login");
	}

	return (
		<div className="p-8 min-h-screen bg-muted flex flex-col space-y-6">
			<Header />
			<AvatarSetting displayName={currentUser.displayName} />
			<UsernameSetting user={currentUser} />
			<NameSetting user={currentUser} />
			<DangerZoneSetting />
		</div>
	);
}
