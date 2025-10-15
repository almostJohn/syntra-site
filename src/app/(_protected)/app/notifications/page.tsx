import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { TypographicalComponents } from "@/components/typographical-components";

export default async function NotificationsPage() {
	const user = await auth.getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center">
				<div className="grid gap-1">
					<TypographicalComponents.h1>Notifications</TypographicalComponents.h1>
					<TypographicalComponents.p>
						Stay informed with real-time updates and important notifications.
					</TypographicalComponents.p>
				</div>
			</div>
		</div>
	);
}
