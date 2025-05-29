import { VerifyResult } from "../verify-result";

export const metadata = {
	title: "Verification Result",
};

export default function VerifyResultPage() {
	return (
		<div className="mx-auto max-w-2xl px-6 md:px-0 h-screen w-screen flex items-center justify-center">
			<VerifyResult />
		</div>
	);
}
