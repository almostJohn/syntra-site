import { getCurrentUser } from "@/lib/auth";
import { AuditLogs } from "@/components/private/audit-logs";
import { redirect } from "next/navigation";

export default async function AuditLogsPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="text-lg font-bold leading-snug md:text-xl">
				Audit Logs
			</div>
			<AuditLogs userId={user.id} />
		</div>
	);
}
