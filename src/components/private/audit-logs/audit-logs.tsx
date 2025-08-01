import { AuditLogList } from "./audit-log-list";
import { getAuditLogs } from "@/data/queries/get-audit-logs";

export async function AuditLogs({ userId }: { userId: string }) {
	const logs = await getAuditLogs(userId);

	if (logs.length === 0) {
		return (
			<div className="mx-auto max-w-3xl flex text-center items-center justify-center py-18 md:py-32">
				<div className="text-sm text-neutral-500">No audit logs found.</div>
			</div>
		);
	}

	return <AuditLogList auditLogs={logs} />;
}
