import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UploadAvatarForm } from "@/components/dashboard/forms/upload-avatar-form";
import { UpdateUsernameForm } from "@/components/dashboard/forms/update-username-form";
import { UpdateDisplayNameForm } from "@/components/dashboard/forms/update-display-name-form";

export const metadata = {
	title: "Settings",
};

export default async function Page() {
	const { data: currentUser } = await auth.getCurrentUser();

	if (!currentUser) redirect("/login");

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-1">
				<h1 className="text-2xl font-semibold sm:text-xl">Settings</h1>
				<p className="text-base/6 text-neutral-500 sm:text-base/8">
					Manage your account information.
				</p>
			</div>
			<div className="mx-auto mt-3 flex w-full max-w-3xl flex-col gap-6">
				{/* Avatar Section */}
				<div className="flex flex-col rounded-md border border-neutral-300 shadow-sm">
					<div className="flex justify-between rounded-t-md border-b border-neutral-300 bg-white p-6">
						<div className="flex flex-col gap-4">
							<h2 className="text-lg font-semibold">Avatar</h2>
							<div className="flex flex-col gap-1">
								<p className="text-sm">This is your avatar.</p>
								<p className="text-sm">
									Click on the avatar to upload a custom one from your files.
								</p>
							</div>
						</div>
						<UploadAvatarForm user={currentUser} />
					</div>
					<div className="mt-auto rounded-b-md bg-neutral-100/95 p-6">
						<p className="text-center text-sm text-neutral-500 md:text-left">
							An avatar is optional but strongly recommended.
						</p>
					</div>
				</div>

				{/* Display Name Section */}
				<UpdateDisplayNameForm user={currentUser} />

				{/* Username Section */}
				<UpdateUsernameForm user={currentUser} />

				{/* Password Section */}
				<div className="flex flex-col rounded-md border border-neutral-300 shadow-sm">
					<div className="flex flex-col gap-4 rounded-t-md border-b border-neutral-300 bg-white p-6">
						<h2 className="text-lg font-semibold">Password</h2>
						<p className="text-sm">Change your account password here.</p>
					</div>
					<div className="mt-auto flex flex-col items-center justify-center gap-2 rounded-b-md bg-neutral-100/95 p-6 md:flex-row md:justify-between">
						<p className="text-center text-sm text-neutral-500 md:text-left">
							For security reasons, please choose a strong password.
						</p>
					</div>
				</div>

				{/* Danger Zone Section */}
				<div className="flex flex-col rounded-md border border-red-200 shadow-sm">
					<div className="flex flex-col gap-4 rounded-t-md border-b border-red-200 bg-white p-6">
						<h2 className="text-lg font-semibold">Delete Account</h2>
						<p className="text-sm">
							Permanently remove your Personal Account and all of its contents
							from the Syntra platform. This action is not reversible, so please
							proceed with caution.
						</p>
					</div>
					<div className="mt-auto flex flex-col items-center justify-center gap-2 rounded-b-md bg-red-100 p-6 md:flex-row md:justify-between">
						<p className="text-center text-sm text-red-700 md:text-left">
							Be cautious when making changes here.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
