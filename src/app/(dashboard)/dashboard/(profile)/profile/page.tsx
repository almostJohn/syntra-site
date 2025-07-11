import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/sessions";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/app/(dashboard)/_components/profile/header";
import { AvatarSection } from "@/app/(dashboard)/_components/profile/avatar-section";
import { UsernameSection } from "@/app/(dashboard)/_components/profile/username-section";
import { DisplayNameSection } from "@/app/(dashboard)/_components/profile/display-name-section";
import { JoinedAtSection } from "@/app/(dashboard)/_components/profile/joined-at-section";

export default async function ProfilePage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col gap-4">
			<Header />
			<AvatarSection displayName={user.displayName} />
			<Separator />
			<UsernameSection username={user.username} />
			<Separator />
			<DisplayNameSection displayName={user.displayName} />
			<Separator />
			<JoinedAtSection createdAt={user.createdAt} />
		</div>
	);
}
