"use client";

import {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
	type PropsWithChildren,
} from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X, Check } from "lucide-react";

export type Toast = {
	id: string;
	description?: string;
	type?: "success" | "error";
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
				"relative mb-1 flex items-center gap-3 rounded-md border border-neutral-800 bg-neutral-900 px-6 py-3 text-neutral-100 shadow-sm backdrop-blur-sm transition-all duration-200 ease-out",
				isVisible && !isLeaving
					? "translate-y-0 scale-100 opacity-100"
					: "translate-y-2 scale-95 opacity-0",
			)}
		>
			{toast.type === "success" && (
				<Check className="size-6 shrink-0 text-emerald-600" />
			)}
			{toast.type === "error" && <X className="size-6 shrink-0 text-red-600" />}
			{toast.description && (
				<div className="min-w-0 flex-1 text-sm">
					<p>{toast.description}</p>
				</div>
			)}
			<Button
				type="button"
				variant="ghost"
				size="icon"
				className="cursor-pointer"
				onClick={handleRemove}
			>
				<X className="size-6 shrink-0" />
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
			<div className="fixed bottom-4 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 transform px-4">
				{toasts.map((toast) => (
					<ToastComponent key={toast.id} toast={toast} onRemove={removeToast} />
				))}
			</div>
		</ToastContext.Provider>
	);
}
