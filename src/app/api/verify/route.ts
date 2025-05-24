import { prisma } from "@/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const token = request.nextUrl.searchParams.get("token");

		if (!token) {
			return NextResponse.json(
				{ success: false, message: "No token provided." },
				{ status: 400 },
			);
		}

		const session = await prisma.userSession.findUnique({
			where: { token },
			include: { user: true },
		});

		if (!session) {
			return NextResponse.json(
				{ success: false, message: "Invalid or expired token." },
				{ status: 400 },
			);
		}

		if (session.expires_at < new Date()) {
			await prisma.userSession.delete({ where: { id: session.id } });

			await prisma.user.delete({ where: { id: session.user_id } });

			return NextResponse.json(
				{ success: false, message: "Token expired. Please register again." },
				{ status: 400 },
			);
		}

		await prisma.user.update({
			where: { id: session.user_id },
			data: { email_verified: true },
		});

		await prisma.userSession.delete({ where: { id: session.id } });

		return NextResponse.json(
			{ success: true, message: "Email verified successfully." },
			{ status: 200 },
		);
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return NextResponse.json(
			{ success: false, message: "Internal Server Error." },
			{ status: 500 },
		);
	}
}
