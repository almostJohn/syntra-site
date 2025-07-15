import { ForgotPasswordStepTwoForm } from "../forgot-password-step-two-form";
import { cookies } from "next/headers";
import { db } from "@/data/db/client";
import { eq } from "drizzle-orm";
import { users, authChallenges } from "@/data/db/schema";
import { notFound } from "next/navigation";

export const metadata = {
	title: "Reset Password",
};

export default async function ForgotPasswordStepTwoPage() {
	const cookieStore = await cookies();
	const username = cookieStore.get("forgot-username")?.value;

	if (!username) {
		notFound();
	}

	const [user] = await db
		.select({ id: users.id })
		.from(users)
		.where(eq(users.username, username))
		.limit(1);

	if (!user) {
		notFound();
	}

	const [challenges] = await db
		.select({ id: authChallenges.id, question: authChallenges.question })
		.from(authChallenges)
		.limit(1);

	if (!challenges) {
		notFound();
	}

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<ForgotPasswordStepTwoForm securityQuestion={challenges} />
			</div>
		</div>
	);
}
