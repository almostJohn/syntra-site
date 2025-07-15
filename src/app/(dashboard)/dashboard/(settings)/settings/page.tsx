import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/sessions";
import { getAuthChallengesById } from "@/data/queries/get-auth-challenges-by-id";
import { Header } from "@/app/(dashboard)/_components/settings/header";
import { AvatarSettings } from "@/app/(dashboard)/_components/settings/avatar-settings";
import { UsernameSettings } from "@/app/(dashboard)/_components/settings/username-settings";
import { DisplayNameSettings } from "@/app/(dashboard)/_components/settings/display-name-settings";
import { PasswordSettings } from "@/app/(dashboard)/_components/settings/password-settings";
import { SecuritySettings } from "@/app/(dashboard)/_components/settings/security-settings";
import { DangerZoneSettings } from "@/app/(dashboard)/_components/settings/danger-zone-settings";

export default async function SettingsPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	const [securityQuestion] = await getAuthChallengesById(user.id);

	return (
		<div className="flex flex-col gap-4">
			<Header />
			<AvatarSettings displayName={user.displayName} />
			<UsernameSettings user={user} />
			<DisplayNameSettings user={user} />
			<PasswordSettings />
			<SecuritySettings securityQuestion={securityQuestion} />
			<DangerZoneSettings />
		</div>
	);
}
