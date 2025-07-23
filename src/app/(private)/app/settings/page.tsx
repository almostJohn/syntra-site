import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AvatarSettings } from "@/components/private/avatar-settings";
import { DisplayNameSettings } from "@/components/private/display-name-settings";
import { UsernameSettings } from "@/components/private/username-settings";
import { UpdatePassword } from "@/components/private/update-password";
import { UserDangerZoneSettings } from "@/components/private/user-danger-zone-settings";

export default async function SettingsPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="text-lg font-bold leading-snug md:text-xl">Settings</div>
			<AvatarSettings displayName={user.displayName} />
			<DisplayNameSettings user={user} />
			<UsernameSettings user={user} />
			<UpdatePassword />
			<UserDangerZoneSettings />
		</div>
	);
}
