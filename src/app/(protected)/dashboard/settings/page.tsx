import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { UploadAvatarForm } from "@/components/dashboard/forms/upload-avatar-form";

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
				<div className="flex flex-col rounded-md border border-neutral-300 shadow-sm">
					<div className="flex justify-between rounded-t-md border-b border-neutral-300 bg-neutral-200/60 p-6">
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
			</div>
		</div>
	);
}
