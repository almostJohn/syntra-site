import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/sessions";
import { Header } from "@/app/(dashboard)/_components/settings/header";
import { AvatarSettings } from "@/app/(dashboard)/_components/settings/avatar-settings";
import { UsernameSettings } from "@/app/(dashboard)/_components/settings/username-settings";
import { DisplayNameSettings } from "@/app/(dashboard)/_components/settings/display-name-settings";
import { DangerZoneSettings } from "@/app/(dashboard)/_components/settings/danger-zone-settings";

export default async function SettingsPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col gap-4">
			<Header />
			<AvatarSettings displayName={user.displayName} />
			<UsernameSettings user={user} />
			<DisplayNameSettings user={user} />
			<DangerZoneSettings />
		</div>
	);
}
