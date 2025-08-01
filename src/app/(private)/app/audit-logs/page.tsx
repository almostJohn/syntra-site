import { getCurrentUser } from "@/lib/auth";
import { Header as AuditLogsHeader } from "@/components/private/audit-logs/header";
import { AuditLogs } from "@/components/private/audit-logs/audit-logs";
import { redirect } from "next/navigation";

export default async function AuditLogsPage() {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col gap-4">
			<AuditLogsHeader title="Audit Logs" />
			<AuditLogs userId={user.id} />
		</div>
	);
}
