import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { H1 } from "@/components/ui/heading";
import { P } from "@/components/ui/paragraph";

export default async function NotificationsPage() {
	const currentUser = await auth.getCurrentUser();

	if (!currentUser) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center">
				<div className="grid gap-1">
					<H1>Notifications</H1>
					<P>
						Stay informed with real-time updates and important notifications.
					</P>
				</div>
			</div>
		</div>
	);
}
