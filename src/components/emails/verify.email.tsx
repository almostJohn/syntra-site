import * as React from "react";
import {
	Html,
	Head,
	Body,
	Container,
	Hr,
	Section,
	Font,
	Button,
	Preview,
	Text,
} from "@react-email/components";

type VerifyEmailProps = {
	verificationUrl: string;
	displayName: string;
};

export function VerifyEmail({
	verificationUrl,
	displayName,
}: VerifyEmailProps) {
	return (
		<Html>
			<Head>
				<Font
					fontFamily="Manrope"
					fallbackFontFamily="Arial"
					webFont={{
						url: "https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap",
						format: "woff2",
					}}
					fontWeight={400}
					fontStyle="normal"
				/>
			</Head>
			<Preview>Verify your account to complete your registration</Preview>
			<Body style={main}>
				<Container style={container}>
					<Section style={content}>
						<Text style={title}>Verify Your Account</Text>

						<Text style={greeting}>Hi there! 👋</Text>

						<Text style={paragraph}>
							Thanks for signing up, {displayName}! To complete your
							registration and start using your account, you&apos;ll need to
							verify your email address.
						</Text>

						<Text style={paragraph}>
							<strong>
								You must verify your account before you can log in.
							</strong>{" "}
							Click the button below to verify your email address.
						</Text>

						<Section style={buttonContainer}>
							<Button style={button} href={verificationUrl}>
								Verify My Account
							</Button>
						</Section>

						<Text style={paragraph}>
							If the button doesn&apos;t work, you can copy and paste this link
							into your browser:
						</Text>

						<Text style={linkText}>{verificationUrl}</Text>

						<Hr style={divider} />

						<Section style={securityNotice}>
							<Text style={securityTitle}>
								🔒 Didn&apos;t create an account?
							</Text>
							<Text style={securityText}>
								If you didn&apos;t create an account with us, you can safely
								ignore this email. No account will be created and no further
								emails will be sent.
							</Text>
						</Section>
					</Section>

					<Section style={footer}>
						<Hr style={divider} />

						<Section style={importantNotice}>
							<Text style={importantTitle}>
								⚠️ Important: This link expires in 30 minutes
							</Text>
							<Text style={importantText}>
								For security reasons, this verification link will expire 30
								minutes after this email was sent. If the link has expired, you
								can request a new verification email from our register page.
							</Text>
						</Section>

						<Text style={footerText}>
							© {new Date().getFullYear()} Syntra. All rights reserved.
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

const main = {
	backgroundColor: "#f6f9fc",
	fontFamily: "Inter, Arial, sans-serif",
};

const container = {
	backgroundColor: "#ffffff",
	margin: "0 auto",
	padding: "20px 0 48px",
	marginBottom: "64px",
	maxWidth: "600px",
};

const content = {
	padding: "32px 48px",
};

const title = {
	fontSize: "28px",
	fontWeight: "700",
	color: "#1a1a1a",
	textAlign: "center" as const,
	margin: "0 0 32px",
	lineHeight: "1.3",
};

const greeting = {
	fontSize: "18px",
	fontWeight: "500",
	color: "#1a1a1a",
	margin: "0 0 16px",
};

const paragraph = {
	fontSize: "16px",
	lineHeight: "1.6",
	color: "#374151",
	margin: "0 0 16px",
};

const buttonContainer = {
	textAlign: "center" as const,
	margin: "32px 0",
};

const button = {
	backgroundColor: "#3b82f6",
	borderRadius: "8px",
	color: "#ffffff",
	fontSize: "16px",
	fontWeight: "600",
	textDecoration: "none",
	textAlign: "center" as const,
	display: "inline-block",
	padding: "16px 32px",
	border: "none",
	cursor: "pointer",
};

const linkText = {
	fontSize: "14px",
	color: "#6b7280",
	backgroundColor: "#f9fafb",
	padding: "12px",
	borderRadius: "6px",
	border: "1px solid #e5e7eb",
	wordBreak: "break-all" as const,
	fontFamily: "monospace",
};

const divider = {
	borderColor: "#e5e7eb",
	margin: "32px 0",
};

const securityNotice = {
	backgroundColor: "#f0f9ff",
	padding: "24px",
	borderRadius: "8px",
	border: "1px solid #bae6fd",
	margin: "24px 0",
};

const securityTitle = {
	fontSize: "16px",
	fontWeight: "600",
	color: "#0369a1",
	margin: "0 0 8px",
};

const securityText = {
	fontSize: "14px",
	color: "#0369a1",
	margin: "0",
	lineHeight: "1.5",
};

const footer = {
	padding: "0 48px 32px",
};

const importantNotice = {
	backgroundColor: "#fef3c7",
	padding: "20px",
	borderRadius: "8px",
	border: "1px solid #f59e0b",
	margin: "0 0 24px",
};

const importantTitle = {
	fontSize: "16px",
	fontWeight: "600",
	color: "#92400e",
	margin: "0 0 8px",
};

const importantText = {
	fontSize: "14px",
	color: "#92400e",
	margin: "0",
	lineHeight: "1.5",
};

const footerText = {
	fontSize: "12px",
	color: "#6b7280",
	textAlign: "center" as const,
	margin: "8px 0 0",
};
