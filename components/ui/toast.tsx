"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { useEffect } from "react";

export interface ToastProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
    duration?: number; // milliseconds
    type?: "success" | "error" | "info";
}

/**
 * Simple toast notification component for auth feedback.
 * 
 * Features:
 * - Auto-dismisses after specified duration (default: 1500ms)
 * - Animated entrance/exit with Framer Motion
 * - Positioned at top-right of screen
 * - Success/error/info variants
 * 
 * @example
 * ```typescript
 * const [showToast, setShowToast] = useState(false);
 * 
 * <Toast
 *   message="Signed in as Demo User (demo mode)"
 *   isVisible={showToast}
 *   onClose={() => setShowToast(false)}
 *   type="success"
 * />
 * ```
 */
export function Toast({
    message,
    isVisible,
    onClose,
    duration = 1500,
    type = "success",
}: ToastProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, onClose]);

    const variants = {
        hidden: {
            opacity: 0,
            y: -20,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
        },
        exit: {
            opacity: 0,
            y: -20,
            scale: 0.95,
        },
    };

    const typeStyles = {
        success: {
            bg: "bg-green-500/10 border-green-500/20",
            icon: "text-green-500",
            text: "text-green-100",
        },
        error: {
            bg: "bg-red-500/10 border-red-500/20",
            icon: "text-red-500",
            text: "text-red-100",
        },
        info: {
            bg: "bg-blue-500/10 border-blue-500/20",
            icon: "text-blue-500",
            text: "text-blue-100",
        },
    };

    const styles = typeStyles[type];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={variants}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="fixed top-4 right-4 z-[200] max-w-md"
                >
                    <div
                        className={`
              flex items-center gap-3 rounded-lg border backdrop-blur-sm
              px-4 py-3 shadow-lg ${styles.bg}
            `}
                    >
                        {/* Icon */}
                        <div className="flex-shrink-0">
                            <CheckCircle2 className={`h-5 w-5 ${styles.icon}`} />
                        </div>

                        {/* Message */}
                        <p className={`text-sm font-medium ${styles.text} flex-1`}>
                            {message}
                        </p>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
                            aria-label="Close notification"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/**
 * Hook for managing toast state.
 * 
 * @example
 * ```typescript
 * const { showToast, toastMessage, displayToast, hideToast } = useToast();
 * 
 * // Show toast
 * displayToast("Signed in successfully!");
 * 
 * // Render toast
 * <Toast
 *   message={toastMessage}
 *   isVisible={showToast}
 *   onClose={hideToast}
 * />
 * ```
 */
export function useToast() {
    const [showToast, setShowToast] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState("");
    const [toastType, setToastType] = React.useState<"success" | "error" | "info">("success");

    const displayToast = (
        message: string,
        type: "success" | "error" | "info" = "success"
    ) => {
        setToastMessage(message);
        setToastType(type);
        setShowToast(true);
    };

    const hideToast = () => {
        setShowToast(false);
    };

    return {
        showToast,
        toastMessage,
        toastType,
        displayToast,
        hideToast,
    };
}

// Fix missing React import for the hook
import React from "react";
