import { formatDistanceToNow } from "date-fns";
import { Icons } from "../icons";

type AuditLog = {
	id: string;
	title: string;
	description: string;
	createdAt: Date;
};

type AuditLogCardProps = {
	auditLog: AuditLog;
};

export function AuditLogCard({ auditLog }: AuditLogCardProps) {
	return (
		<div className="p-5 rounded-sm border border-neutral-200 dark:border-neutral-700">
			<div className="flex items-start gap-3">
				<Icons.history className="size-5 shrink-0 mt-1" />
				<div className="flex flex-col gap-1.5">
					<div className="flex items-center gap-2">
						<div className="font-medium text-sm">{auditLog.title}</div>
						<div className="text-xs text-neutral-500">
							{formatDistanceToNow(new Date(auditLog.createdAt), {
								addSuffix: true,
							})}
						</div>
					</div>
					<div className="text-sm text-neutral-500">{auditLog.description}</div>
				</div>
			</div>
		</div>
	);
}
