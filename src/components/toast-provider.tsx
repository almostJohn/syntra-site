"use client";

import {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
	type PropsWithChildren,
} from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";

export type Toast = {
	id: string;
	description?: string;
	type?: "success" | "error" | "info" | "warning";
	duration?: number;
};

type ToastContextType = {
	toasts: Toast[];
	addToast(toast: Omit<Toast, "id">): void;
	removeToast(id: string): void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used within a ToastProvider");
	}
	return context;
}

function ToastComponent({
	toast,
	onRemove,
}: {
	toast: Toast;
	onRemove(id: string): void;
}) {
	const [isVisible, setIsVisible] = useState(false);
	const [isLeaving, setIsLeaving] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 10);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (toast.duration !== 0) {
			const timer = setTimeout(() => {
				handleRemove();
			}, toast.duration || 4000);
			return () => clearTimeout(timer);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [toast.duration]);

	function handleRemove() {
		setIsLeaving(true);
		setTimeout(() => {
			onRemove(toast.id);
		}, 200);
	}

	return (
		<div
			className={cn(
				"relative flex items-center gap-3 px-4 py-3 mb-1 rounded-md bg-transparent border border-neutral-200 dark:border-neutral-700 shadow-sm backdrop-blur-sm transition-all duration-200 ease-out",
				isVisible && !isLeaving
					? "translate-y-0 opacity-100 scale-100"
					: "translate-y-2 opacity-0 scale-95",
			)}
		>
			{toast.type === "success" && (
				<Icons.circleSuccess className="size-5 shrink-0 text-green-500" />
			)}
			{toast.type === "error" && (
				<Icons.circleX className="size-5 shrink-0 text-red-500" />
			)}
			{toast.type === "info" && (
				<Icons.circleInfo className="size-5 shrink-0 text-blue-500" />
			)}
			{toast.type === "warning" && (
				<Icons.circleAlert className="size-5 shrink-0 text-orange-500" />
			)}
			<div className="flex-1 min-w-0">
				{toast.description && (
					<div
						className={cn(
							"text-sm",
							toast.type === "success" && "text-green-500",
							toast.type === "error" && "text-red-500",
							toast.type === "info" && "text-blue-500",
							toast.type === "warning" && "text-orange-500",
						)}
					>
						{toast.description}
					</div>
				)}
			</div>
			<Button
				type="button"
				variant="ghost"
				size="icon"
				className="cursor-pointer"
				onClick={handleRemove}
			>
				<Icons.x className="size-6 shrink-0" />
			</Button>
		</div>
	);
}

export function ToastProvider({ children }: PropsWithChildren) {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const addToast = useCallback((toast: Omit<Toast, "id">) => {
		const id = Math.random().toString(36).substring(2, 9);
		setToasts((prev) => [...prev, { ...toast, id }]);
	}, []);

	const removeToast = useCallback((id: string) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	}, []);

	return (
		<ToastContext.Provider value={{ toasts, addToast, removeToast }}>
			{children}
			<div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg px-4">
				{toasts.map((toast) => (
					<ToastComponent key={toast.id} toast={toast} onRemove={removeToast} />
				))}
			</div>
		</ToastContext.Provider>
	);
}
