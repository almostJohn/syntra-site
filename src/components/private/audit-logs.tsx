import { getAuditLogs } from "@/data/queries/get-audit-logs";
import { AuditLogList } from "./audit-log-list";

type AuditLogsProps = {
	userId: string;
};

export async function AuditLogs({ userId }: AuditLogsProps) {
	const auditLogs = await getAuditLogs(userId);

	if (auditLogs.length === 0) {
		return (
			<div className="mx-auto max-w-3xl flex text-center items-center justify-center py-18 md:py-32">
				<div className="text-sm text-neutral-500">No audit logs found.</div>
			</div>
		);
	}

	return <AuditLogList auditLogs={auditLogs} />;
}
