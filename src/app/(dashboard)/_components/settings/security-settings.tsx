import { CreateSecurityQuestion } from "./create-security-question";
import { UpdateSecurityQuestion } from "./update-security-question";

type SecurityQuestion = {
	id: string;
	userId: string;
	question: string;
	answer: string;
};

type SecuritySettingsProps = {
	securityQuestion: SecurityQuestion;
};

export function SecuritySettings({ securityQuestion }: SecuritySettingsProps) {
	return (
		<>
			{!securityQuestion && (
				<div className="rounded-sm bg-transparent flex items-center justify-center border border-neutral-200 dark:border-neutral-700 p-6">
					<CreateSecurityQuestion />
				</div>
			)}
			{securityQuestion && (
				<UpdateSecurityQuestion securityQuestion={securityQuestion} />
			)}
		</>
	);
}
