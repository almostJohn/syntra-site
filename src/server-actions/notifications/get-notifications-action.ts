"use server";

import { getNotificationsPaginated } from "@/data/get-notification.data";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function getNotificationsAction(page: number, limit: number) {
	const loggedInUser = await auth.getCurrentUser();

	if (!loggedInUser) {
		redirect("/login");
	}

	return await getNotificationsPaginated({
		userId: loggedInUser.id,
		page,
		limit,
	});
}
