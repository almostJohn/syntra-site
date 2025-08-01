import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Header as SettingsHeader } from "@/components/private/settings/header";
import { AvatarSettings } from "@/components/private/settings/avatar-settings";
import { DisplayNameSettings } from "@/components/private/settings/display-name-settings";
import { UsernameSettings } from "@/components/private/settings/username-settings";
import { PasswordSettings } from "@/components/private/settings/password-settings";
import { DeleteAccountSettings } from "@/components/private/settings/delete-account-settings";

export default async function SettingsPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col gap-4">
			<SettingsHeader title="Settings" />
			<div className="flex flex-col gap-5">
				<AvatarSettings displayName={user.displayName} />
				<DisplayNameSettings user={user} />
				<UsernameSettings user={user} />
				<PasswordSettings />
				<DeleteAccountSettings user={user} />
			</div>
		</div>
	);
}
