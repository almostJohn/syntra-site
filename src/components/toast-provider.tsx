"use client";

import {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
	type PropsWithChildren,
} from "react";
import { X, CircleAlert, CheckCircle, Info, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

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

const toastIcons = {
	success: CheckCircle,
	error: CircleAlert,
	info: Info,
	warning: AlertTriangle,
};

const toastColors = {
	success:
		"border-green-500 bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100",
	error:
		"border-red-500 bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100",
	info: "border-blurple bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100",
	warning:
		"border-amber-500 bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100",
};

const toastIconColors = {
	success: "text-green-500",
	error: "text-red-500",
	info: "text-blurple",
	warning: "text-amber-500",
};

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

	const Icon = toast.type ? toastIcons[toast.type] : Info;
	const colorClass = toast.type
		? toastColors[toast.type]
		: "border-neutral-500 bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100";
	const iconColorClass = toast.type
		? toastIconColors[toast.type]
		: "text-neutral-400";

	return (
		<div
			className={cn(
				"relative flex items-center gap-3 p-4 mb-2 rounded-sm border shadow-sm backdrop-blur-sm transition-all duration-200 ease-out",
				colorClass,
				isVisible && !isLeaving
					? "translate-y-0 opacity-100 scale-100"
					: "translate-y-2 opacity-0 scale-95",
			)}
		>
			<Icon className={`size-5 shrink-0 mt-0.5 ${iconColorClass}`} />
			<div className="flex-1 min-w-0">
				{toast.description && (
					<div className="text-sm text-neutral-900 dark:text-neutral-100">
						{toast.description}
					</div>
				)}
			</div>
			<Button
				type="button"
				variant="ghost"
				size="icon"
				className="size-6 shrink-0 rounded-sm"
				onClick={handleRemove}
			>
				<X className="size-4" />
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
