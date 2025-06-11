import crypto from "node:crypto";
import { prisma } from "@/data/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
	try {
		const token = request.nextUrl.searchParams.get("token");

		if (!token) {
			return NextResponse.redirect(
				new URL("/verification/result?status=missing", request.url),
			);
		}

		const session = await prisma.userSession.findUnique({
			where: { token },
			include: { user: true },
		});

		if (!session) {
			return NextResponse.redirect(
				new URL("/verification/result?status=invalid", request.url),
			);
		}

		if (session.expires_at < new Date()) {
			await prisma.userSession.delete({ where: { id: session.id } });

			await prisma.user.delete({ where: { id: session.user_id } });

			return NextResponse.redirect(
				new URL("/verification/result?status=expired", request.url),
			);
		}

		await prisma.user.update({
			where: {
				id: session.user_id,
			},
			data: {
				is_email_verified: true,
			},
		});

		await prisma.userSession.delete({ where: { id: session.id } });

		const sessionToken = crypto.randomBytes(32).toString("hex");

		const cookieStore = await cookies();

		cookieStore.set(process.env.NEXT_REQUEST_STATUS_NAME!, sessionToken, {
			maxAge: 10,
			path: "/",
		});

		return NextResponse.redirect(
			new URL("/verification/result?status=success", request.url),
		);
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return NextResponse.redirect(
			new URL("/verification/result?status=error", request.url),
		);
	}
}
