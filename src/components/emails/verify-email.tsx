import * as React from "react";
import {
	Html,
	Head,
	Body,
	Container,
	Text,
	Link,
	Button,
	Heading,
	Hr,
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
			<Head />
			<Body style={{ backgroundColor: "#f4f4f4", padding: "20px" }}>
				<Container
					style={{
						backgroundColor: "#ffffff",
						padding: "40px",
						borderRadius: "8px",
						fontFamily: "Helvetica, Arial, sans-serif",
					}}
				>
					<Heading as="h2">Verify your email</Heading>
					<Text>Hi {displayName},</Text>
					<Text>
						Thanks for signing up. Please click the button below to verify your
						email address and activate your account:
					</Text>

					<Button
						href={verificationUrl}
						style={{
							backgroundColor: "#2563eb",
							color: "#ffffff",
							padding: "12px 20px",
							borderRadius: "6px",
							textDecoration: "none",
							display: "inline-block",
							margin: "16px 0",
						}}
					>
						Verify Email
					</Button>

					<Text>
						If the button doesn’t work, copy and paste this link into your
						browser:
					</Text>
					<Link href={verificationUrl}>{verificationUrl}</Link>

					<Hr style={{ margin: "24px 0" }} />
					<Text style={{ fontSize: "12px", color: "#999999" }}>
						This link will expire in 30 minutes. If you didn’t create an
						account, please ignore this email.
					</Text>
				</Container>
			</Body>
		</Html>
	);
}
