import { db } from "../db/client";
import { eq, desc } from "drizzle-orm";
import { auditLogs } from "../db/schema";

export async function getAuditLogs(userId: string) {
	return await db
		.select({
			id: auditLogs.id,
			title: auditLogs.title,
			description: auditLogs.description,
			userId: auditLogs.userId,
			createdAt: auditLogs.createdAt,
		})
		.from(auditLogs)
		.where(eq(auditLogs.userId, userId))
		.orderBy(desc(auditLogs.createdAt))
		.limit(10);
}
