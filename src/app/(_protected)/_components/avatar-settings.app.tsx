import { UploadAvatarModal } from "./client/upload-avatar-modal";

type User = {
	id: string;
	username: string;
	avatar: string;
};

type AvatarSettingsProps = {
	user: User;
};

export function AvatarSettings({ user }: AvatarSettingsProps) {
	return (
		<div className="flex flex-col rounded-sm border border-neutral-700 shadow-lg">
			<div className="rounded-t-sm border-b border-neutral-700 bg-neutral-800">
				<div className="flex justify-between p-6">
					<div className="flex flex-col gap-4">
						<h2 className="text-lg font-bold">Avatar</h2>
						<div className="grid gap-1 text-sm">
							<p>This is your avatar.</p>
							<p>Click on the avatar to upload a custom one from your files.</p>
						</div>
					</div>
					<div>
						<UploadAvatarModal user={user} />
					</div>
				</div>
			</div>
			<div className="mt-auto flex items-center rounded-b-sm bg-neutral-900 p-6 md:px-6 md:py-4">
				<p className="text-muted-foreground text-center text-sm md:text-left">
					An avatar is optional but strongly recommended.
				</p>
			</div>
		</div>
	);
}
