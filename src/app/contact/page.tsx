import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/util/cn";

export const metadata: Metadata = {
	title: "Contact",
};

export default function AboutPage() {
	return (
		<div className="container min-h-screen max-w-5xl flex items-center justify-center">
			<div className="flex flex-col space-y-8 mt-8 md:mt-0">
				<div className="flex flex-col space-y-2">
					<h1 className="text-4xl text-center font-bold text-teal-500 tracking-tight md:text-6xl">
						Get In Touch
					</h1>
					<span className="text-lg font-light text-center italic">
						We would love to hear from you.
					</span>
					<p className="text-lg text-center">
						If you have any questions, please feel free to reach out.
					</p>
				</div>
				<div className="flex flex-col space-y-4">
					<div className="flex items-center justify-center space-x-2">
						<Mail className="size-8 shrink-0" />
						<p className="text-lg">garcia.johngale@gmail.com</p>
					</div>
					<div className="flex items-center justify-center">
						<Link
							href="mailto:garcia.johngale@gmail.com"
							className={cn(buttonVariants({}))}
						>
							Send a Mail
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
