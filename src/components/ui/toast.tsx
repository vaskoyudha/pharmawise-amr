"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

interface ToastProps {
    id: string;
    type: ToastType;
    title: string;
    description?: string;
    onClose: (id: string) => void;
}

const iconMap = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertTriangle,
};

const colorMap = {
    success: "from-emerald-500/20 to-emerald-600/20 border-emerald-400/30",
    error: "from-red-500/20 to-red-600/20 border-red-400/30",
    info: "from-aurora-500/20 to-aurora-600/20 border-aurora-400/30",
    warning: "from-amber-500/20 to-amber-600/20 border-amber-400/30",
};

const iconColorMap = {
    success: "text-emerald-400",
    error: "text-red-400",
    info: "text-aurora-400",
    warning: "text-amber-400",
};

export function Toast({ id, type, title, description, onClose }: ToastProps) {
    const Icon = iconMap[type];

    return (
        <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            className={`glass-panel relative flex items-start gap-3 rounded-2xl border p-4 shadow-xl ${colorMap[type]}`}
        >
            <Icon className={`h-5 w-5 flex-shrink-0 ${iconColorMap[type]}`} />
            <div className="flex-1">
                <h4 className="font-semibold text-white">{title}</h4>
                {description && <p className="mt-1 text-sm text-white/70">{description}</p>}
            </div>
            <button
                onClick={() => onClose(id)}
                className="flex-shrink-0 text-white/50 transition-colors hover:text-white"
            >
                <X className="h-4 w-4" />
            </button>
        </motion.div>
    );
}

interface ToastContainerProps {
    children: ReactNode;
}

export function ToastContainer({ children }: ToastContainerProps) {
    return (
        <div className="pointer-events-none fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4">
            <AnimatePresence mode="popLayout">{children}</AnimatePresence>
        </div>
    );
}
