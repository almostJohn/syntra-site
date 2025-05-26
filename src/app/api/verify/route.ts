import { prisma } from "@/db/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const cookieStore = await cookies();

		const token = request.nextUrl.searchParams.get("token");

		if (!token) {
			return NextResponse.redirect(
				new URL("/verify-result?status=missing", request.url),
			);
		}

		const session = await prisma.userSession.findUnique({
			where: { token },
			include: { user: true },
		});

		if (!session) {
			return NextResponse.redirect(
				new URL("/verify-result?status=invalid", request.url),
			);
		}

		if (session.expires_at < new Date()) {
			await prisma.userSession.delete({ where: { id: session.id } });

			await prisma.user.delete({ where: { id: session.user_id } });

			return NextResponse.redirect(
				new URL("/verify-result?status=expired", request.url),
			);
		}

		await prisma.user.update({
			where: { id: session.user_id },
			data: { email_verified: true },
		});

		await prisma.userSession.delete({ where: { id: session.id } });

		cookieStore.set("verify-status", "success", { maxAge: 10, path: "/" });

		return NextResponse.redirect(
			new URL("/verify-result?status=success", request.url),
		);
	} catch (error_) {
		const error = error_ as Error;
		console.error(error.message, error);
		return NextResponse.redirect(
			new URL("/verify-result?status=error", request.url),
		);
	}
}
