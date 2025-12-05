import { Notifications } from "@/components/dashboard/notifications/notifications";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
	title: "Notifications",
};

export default async function Page() {
	const { data: currentUser } = await auth.getCurrentUser();

	if (!currentUser) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-1">
				<h1 className="text-2xl font-semibold sm:text-xl">Notifications</h1>
				<p className="text-base/6 text-neutral-500 sm:text-base/8">
					View and manage your notifications here.
				</p>
			</div>
			<Notifications userId={currentUser.id} />
		</div>
	);
}
