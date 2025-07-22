import { AuditLogCard } from "./audit-log-card";

type AuditLog = {
	id: string;
	title: string;
	description: string;
	createdAt: Date;
};

type AuditLogListProps = {
	auditLogs: AuditLog[];
};

export function AuditLogList({ auditLogs }: AuditLogListProps) {
	return (
		<div className="flex flex-col gap-4">
			{auditLogs.map((auditLog) => (
				<AuditLogCard key={auditLog.id} auditLog={auditLog} />
			))}
		</div>
	);
}
