"use client";

import { useShowPassword } from "@/hooks/use-show-password";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

type TextFieldProps = {
	id: string;
	name: string;
	label: string;
	type?: "text" | "password" | "number" | "email";
	placeholder?: string;
	defaultValue?: string;
	minLength?: number;
	maxLength?: number;
	disabled?: boolean;
	required?: boolean;
	error?: boolean;
	errorMessage?: string;
};

export function TextField({
	id,
	name,
	label,
	type = "text",
	placeholder,
	defaultValue,
	minLength,
	maxLength,
	disabled,
	required,
	error,
	errorMessage,
}: TextFieldProps) {
	const { show, toggle } = useShowPassword();

	const isPassword = type === "password";

	return (
		<div className="flex flex-col gap-1.5">
			<Label htmlFor={id}>
				{label} <span className="text-red-600">*</span>
			</Label>
			<div className="relative">
				<Input
					type={isPassword && show ? "text" : type}
					id={id}
					name={name}
					defaultValue={defaultValue}
					placeholder={placeholder}
					minLength={minLength}
					maxLength={maxLength}
					disabled={disabled}
					required={required}
					autoComplete="off"
					className={cn(
						"h-10 rounded focus-visible:border-blue-600/60 focus-visible:ring-blue-600/30",
						error && "border-red-600/60 ring-[3px] ring-red-600/30",
					)}
				/>

				{/* Password Show */}
				{isPassword && (
					<button
						type="button"
						className="text-muted-foreground hover:text-foreground absolute top-1/2 right-4 -translate-y-1/2 transform cursor-pointer"
						onClick={toggle}
					>
						{show ? (
							<EyeOff className="size-4 shrink-0" />
						) : (
							<Eye className="size-4 shrink-0" />
						)}
					</button>
				)}
			</div>

			{/* Error Message */}
			{errorMessage && (
				<span className="text-sm text-red-600">{errorMessage}</span>
			)}
		</div>
	);
}
