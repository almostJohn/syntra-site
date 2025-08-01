import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Header as ProfileHeader } from "@/components/private/profile/header";
import { AvatarSection } from "@/components/private/profile/avatar-section";
import { DisplayNameSection } from "@/components/private/profile/display-name-section";
import { UsernameSection } from "@/components/private/profile/username-section";
import { UserTagSection } from "@/components/private/profile/user-tag-section";
import { JoinedAtSection } from "@/components/private/profile/joined-at-section";

export default async function ProfilePage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col gap-4">
			<ProfileHeader title="Profile" />
			<div className="flex flex-col gap-6">
				<AvatarSection displayName={user.displayName} />
				<div className="mt-2 flex flex-col gap-5">
					<DisplayNameSection displayName={user.displayName} />
					<UsernameSection username={user.username} />
					<UserTagSection tag={user.tag} />
					<JoinedAtSection createdAt={user.createdAt} />
				</div>
			</div>
		</div>
	);
}
