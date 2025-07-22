import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AvatarSection } from "@/components/private/avatar-section";
import { DisplayNameSection } from "@/components/private/display-name-section";
import { UsernameSection } from "@/components/private/username-section";
import { UserTagSection } from "@/components/private/user-tag-section";
import { JoinedAtSection } from "@/components/private/joined-at-section";

export default async function ProfilePage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="text-lg font-bold leading-snug md:text-xl">Profile</div>
			<div className="flex flex-col gap-6">
				<AvatarSection displayName={user.displayName} />
				<div className="mt-2 flex flex-col gap-4">
					<DisplayNameSection displayName={user.displayName} />
					<UsernameSection username={user.username} />
					<UserTagSection tag={user.tag} />
					<JoinedAtSection createdAt={user.createdAt} />
				</div>
			</div>
		</div>
	);
}
