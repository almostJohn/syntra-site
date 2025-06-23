import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Header } from "@/components/dashboard/settings/header";
import { AvatarSetting } from "@/components/dashboard/settings/avatar-setting";
import { NameSetting } from "@/components/dashboard/settings/name-setting";
import { EmailSetting } from "@/components/dashboard/settings/email-setting";
import { DangerZoneSetting } from "@/components/dashboard/settings/danger-zone-setting";

export default async function SettingsPage() {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		redirect("/login");
	}

	return (
		<div className="p-8 min-h-screen bg-muted flex flex-col space-y-6">
			<Header />
			<AvatarSetting name={currentUser.name} />
			<NameSetting user={currentUser} />
			<EmailSetting
				email={currentUser.email}
				isEmailVerified={currentUser.isEmailVerified}
			/>
			<DangerZoneSetting />
		</div>
	);
}
