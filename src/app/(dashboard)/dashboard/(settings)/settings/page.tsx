import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/sessions";
import { Header } from "../_components/header";
import { AvatarSettings } from "../_components/avatar-settings";
import { UsernameSetting } from "../_components/username-setting";
import { DisplayNameSetting } from "../_components/display-name-setting";
import { DangerZoneSetting } from "../_components/danger-zone-setting";

export default async function SettingsPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col space-y-6">
			<Header />
			<AvatarSettings displayName={user.displayName} />
			<UsernameSetting user={user} />
			<DisplayNameSetting user={user} />
			<DangerZoneSetting />
		</div>
	);
}
