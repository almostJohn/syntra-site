"use client";

import {
	useState,
	type PropsWithChildren,
	type SetStateAction,
	type Dispatch,
} from "react";
import { Button } from "./ui/button";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
} from "./ui/alert-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ScrollArea } from "./ui/scroll-area";

type NonDisclosureAgreementDialogProps = PropsWithChildren & {
	interacted: boolean;
	setInteracted: Dispatch<SetStateAction<boolean>>;
};

function NonDisclosureAgreementDialog({
	interacted,
	setInteracted,
	children,
}: NonDisclosureAgreementDialogProps) {
	return (
		<AlertDialog open={interacted} onOpenChange={setInteracted}>
			<AlertDialogTrigger className="text-sm font-medium cursor-pointer text-blue-500 transition-colors hover:text-blue-400">
				non-disclosure agreement
			</AlertDialogTrigger>
			<AlertDialogContent className="w-full p-0 sm:max-w-xl">
				<VisuallyHidden>
					<AlertDialogTitle>Non-Disclosure Agreement Title</AlertDialogTitle>
					<AlertDialogDescription>
						Non-Disclosure Agreement Description
					</AlertDialogDescription>
				</VisuallyHidden>
				{children}
			</AlertDialogContent>
		</AlertDialog>
	);
}

export function NonDisclosureAgreement() {
	const [interacted, setInteracted] = useState(false);

	function onClose() {
		setInteracted((prev) => !prev);
	}

	return (
		<NonDisclosureAgreementDialog
			interacted={interacted}
			setInteracted={setInteracted}
		>
			<div className="flex flex-col">
				<div className="px-6 py-4 border-b border-neutral-300 dark:border-neutral-700">
					<div className="flex flex-col gap-2">
						<div className="text-sm font-medium">
							Non-Disclosure Agreement (NDA)
						</div>
						<div className="text-sm text-neutral-500">
							Please read this agreement carefully before proceeding with
							registration.
						</div>
					</div>
				</div>
				<ScrollArea className="overflow-y-auto max-h-[calc(100vh-220px)] px-6 py-4">
					<div className="flex flex-col gap-4">
						<div className="space-y-2">
							<div className="font-semibold leading-snug">
								1. Introduction and Definitions
							</div>
							<div className="text-sm text-left">
								This Non-Disclosure Agreement (“Agreement”) outlines the
								confidentiality terms between you (“User”) and Syntra (“We”,
								“Us”, or “Our”).
							</div>
						</div>
						<div className="space-y-2">
							<div className="font-semibold leading-snug">
								2. Confidential Information
							</div>
							<div className="text-sm text-left">
								By using Syntra, you may have access to confidential or
								proprietary information, including but not limited to:
							</div>
							<ul className="space-y-1">
								<li className="text-sm list-disc list-inside list-item">
									Features under development.
								</li>
								<li className="text-sm list-disc list-inside list-item">
									Business strategies and technical processes.
								</li>
								<li className="text-sm list-disc list-inside list-item">
									Internal tools, designs, or content not publicly available.
								</li>
								<li className="text-sm list-disc list-inside list-item">
									Any non-public information related to Syntra’s product or
									operations.
								</li>
							</ul>
							<div className="text-sm text-left">
								You agree not to share, distribute, reproduce, or misuse any
								such information.
							</div>
						</div>
						<div className="space-y-2">
							<div className="font-semibold leading-snug">
								3. Your Responsibilities
							</div>
							<ul className="space-y-1">
								<li className="text-sm list-disc list-inside list-item">
									You must keep all confidential information strictly private
									and secure.
								</li>
								<li className="text-sm list-disc list-inside list-item">
									You will not disclose or allow others to access any Syntra
									data that is not yours or is not publicly available.
								</li>
								<li className="text-sm list-disc list-inside list-item">
									You must notify us immediately if you become aware of any
									unauthorized disclosure or misuse of confidential information.
								</li>
							</ul>
						</div>
						<div className="space-y-2">
							<div className="font-semibold leading-snug">4. Exceptions</div>
							<div className="text-sm text-left">
								This agreement does not apply to information that:
							</div>
							<ul className="space-y-1">
								<li className="text-sm list-disc list-inside list-item">
									Becomes publicly known through no fault of your own.
								</li>
								<li className="text-sm list-disc list-inside list-item">
									Is disclosed with our written permission.
								</li>
								<li className="text-sm list-disc list-inside list-item">
									Is independently developed without use of Syntra’s
									confidential information.
								</li>
								<li className="text-sm list-disc list-inside list-item">
									Is required to be disclosed by law or legal order (you must
									notify us if possible).
								</li>
							</ul>
						</div>
						<div className="space-y-2">
							<div className="font-semibold leading-snug">5. Duration</div>
							<div className="text-sm text-left">
								This Agreement remains in effect while you use Syntra and for 2
								years after your access ends, unless otherwise released in
								writing by us.
							</div>
						</div>
						<div className="space-y-2">
							<div className="font-semibold leading-snug">6. Termination</div>
							<div className="text-sm text-left">
								We reserve the right to suspend or terminate your access if you
								violate this agreement. Upon termination, you must delete all
								confidential materials in your possession.
							</div>
						</div>
						<div className="space-y-2">
							<div className="font-semibold leading-snug">7. No License</div>
							<div className="text-sm text-left">
								Nothing in this agreement gives you ownership or license to any
								Syntra intellectual property, software, or confidential
								materials.
							</div>
						</div>
						<div className="space-y-2">
							<div className="font-semibold leading-snug">8. Questions?</div>
							<div className="text-sm text-left">
								For inquiries about this agreement, contact:{" "}
								<a
									href="mailto:garcia.johngale@gmail.com"
									rel="noreferrer"
									target="_blank"
									className="font-medium text-blue-500 transition-colors hover:text-blue-400"
								>
									garcia.johngale@gmail.com
								</a>
								.
							</div>
						</div>
					</div>
				</ScrollArea>
				<div className="mt-auto px-6 py-4 border-t border-neutral-300 dark:border-neutral-700">
					<div className="flex items-center justify-end">
						<Button
							type="button"
							onClick={onClose}
							className="h-10 cursor-pointer"
						>
							Close
						</Button>
					</div>
				</div>
			</div>
		</NonDisclosureAgreementDialog>
	);
}
