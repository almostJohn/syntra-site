import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { NotepadText } from "lucide-react";

export const metadata: Metadata = {
	title: "About",
};

export default function AboutPage() {
	return (
		<div className="container min-h-screen max-w-5xl flex justify-center pt-24 pb-28">
			<div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between w-full md:space-y-0">
				<div className="flex flex-col space-y-4 mt-8 md:mt-0">
					<div className="flex flex-col space-y-0.5">
						<h1 className="text-2xl font-bold tracking-tight md:text-5xl">
							simplynote
						</h1>
						<span className="font-light italic text-neutral-500">
							&quot;Simple tools for everyday tasks.&quot;
						</span>
					</div>
					<p className="text-balance">
						Welcome to simplynote, simplynote is your go-to utility website
						designed to simplify your daily tasks. Whether you need a quick and
						easy place to jot down notes or calculate important dates with
						precision, simplynote has you covered. Our goal is to provide a
						seamless and efficient experience, helping you stay organized and
						productive with minimal effort.
					</p>
					<p className="text-balance">
						simplynote is an open-source project available on{" "}
						<Link
							href="https://github.com/almostJohn/simplynote"
							className="text-blue-600 hover:underline"
						>
							GitHub
						</Link>
						, created by{" "}
						<Link
							href="https://almostjohn.vercel.app"
							className="text-blue-600 hover:underline"
						>
							almostJohn
						</Link>
						. This online utility website serves as a platform designed to
						assist you with your everyday needs.
					</p>
				</div>
				<div className="flex">
					<NotepadText className="size-40 shrink-0" />
				</div>
			</div>
		</div>
	);
}
