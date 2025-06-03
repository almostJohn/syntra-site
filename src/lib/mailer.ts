import { Resend } from "resend";
import { VerifyEmail } from "@/components/verification/email";
import { log, LogType } from "./log";

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

type SendVerificationEmailObject = {
	email: string;
	verificationUrl: string;
	name: string;
};

export async function sendVerificationEmail({
	email,
	verificationUrl,
	name,
}: SendVerificationEmailObject) {
	try {
		await resend.emails.send({
			from: "Syntra <onboarding@resend.dev>",
			to: [email],
			subject: "Verify your email address.",
			react: VerifyEmail({ verificationUrl, name }),
		});
	} catch (error_) {
		const error = error_ as Error;
		log({
			logType: LogType.Error,
			category: "VERIFICATION_EMAIL_ERROR",
			details: { message: error.message },
			additionalData: { email, verificationUrl, name },
		});
	}
}
