import { Resend } from "resend";
import { VerifyEmail } from "@/components/emails/verify-email";

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
		console.error(error.message, error);
		throw new Error(
			"Verification email failed to send to the approriate email address due to: ",
			{ cause: error },
		);
	}
}
