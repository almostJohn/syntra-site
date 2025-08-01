import { formatDistanceToNow } from "date-fns";
import { Icons } from "@/components/icons";

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
		<div className="p-6 border border-neutral-300 dark:border-neutral-700 shadow-sm rounded-md">
			<div className="flex items-start gap-3.5">
				<Icons.history className="size-6 shrink-0" />
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2.5">
						<h3 className="font-medium">{auditLog.title}</h3>
						<span className="text-xs text-neutral-500">
							{formatDistanceToNow(new Date(auditLog.createdAt), {
								addSuffix: true,
							})}
						</span>
					</div>
					<p className="text-neutral-500 whitespace-pre-wrap">
						{auditLog.description}
					</p>
				</div>
			</div>
		</div>
	);
}
