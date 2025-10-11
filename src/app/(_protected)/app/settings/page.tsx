import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { UploadAvatarModal } from "../../_components/client/upload-avatar-modal";
import { UpdateUsernameForm } from "../../_components/client/update-username.form";
import { UpdatePasswordForm } from "../../_components/client/update-password.form";
import { DeleteUserForm } from "../../_components/client/delete-user.form";

export default async function SettingsPage() {
	const user = await auth.getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="grid gap-1">
				<h1 className="text-2xl/8 font-semibold sm:text-xl/8">Settings</h1>
				<p className="text-muted-foreground text-base/6 sm:text-sm/6">
					Manage your account information.
				</p>
			</div>
			<div className="mt-2 flex flex-col gap-6">
				<section className="flex flex-col rounded-md border border-neutral-700">
					<div className="flex justify-between rounded-t-md border-b border-neutral-700 bg-neutral-800 p-6">
						<div className="mb-3 flex flex-col gap-4">
							<h2 className="text-lg font-semibold">Avatar</h2>
							<div className="grid gap-1 text-sm">
								<p>This is your avatar.</p>
								<p>
									Click on the avatar to upload a custom one from your files.
								</p>
							</div>
						</div>
						<div>
							<UploadAvatarModal user={user} />
						</div>
					</div>
					<div className="mt-auto rounded-b-md bg-neutral-900 p-6">
						<p className="text-center text-sm text-neutral-500 md:text-left">
							An avatar is optional but strongly recommended.
						</p>
					</div>
				</section>
				<UpdateUsernameForm user={user} />
				<UpdatePasswordForm />
				<section className="flex flex-col rounded-md border border-red-500/30">
					<div className="flex flex-col gap-4 rounded-t-md border-b border-red-500/30 bg-neutral-800 p-6">
						<h2 className="text-lg font-semibold">Delete Account</h2>
						<p className="text-sm">
							Permanently delete your Personal Account and all its associated
							contents from the Syntra platform. This action is not reversible,
							so please continue with caution.
						</p>
					</div>
					<div className="mt-auto rounded-b-md bg-red-500/10 p-6">
						<div className="flex items-center justify-center md:justify-end">
							<DeleteUserForm user={user} />
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
