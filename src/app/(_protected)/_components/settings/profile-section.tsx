import { UploadAvatarModal } from "../client/upload-avatar-modal";

type User = {
	id: string;
	username: string;
	avatar: string;
};

type ProfileSectionProps = {
	user: User;
};

export function ProfileSection({ user }: ProfileSectionProps) {
	return (
		<div className="grid gap-2">
			<h2 className="border-b border-neutral-800 text-base/7 font-semibold sm:text-sm/6">
				Profile
			</h2>
			<div className="flex items-center gap-2">
				<UploadAvatarModal user={user} />
				<p className="font-medium">@{user.username}</p>
			</div>
		</div>
	);
}
