import { Resend } from "resend";
import { VerifyEmail } from "@/emails/verify-email";
import { log, LogType } from "./log";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

type SendVerificationEmailObject = {
	email: string;
	verificationUrl: string;
	displayName: string;
};

export async function sendVerificationEmail({
	email,
	verificationUrl,
	displayName,
}: SendVerificationEmailObject) {
	try {
		await resend.emails.send({
			from: "Syntra <onboarding@resend.dev>",
			to: [email],
			subject: "Verify your email address.",
			react: VerifyEmail({ verificationUrl, displayName }),
		});
	} catch (error_) {
		const error = error_ as Error;
		log({
			logType: LogType.Error,
			category: "VERIFICATION_EMAIL_ERROR",
			details: { message: error.message, error },
			additionalData: { email, verificationUrl, displayName },
		});
	}
}
