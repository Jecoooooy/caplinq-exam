import { toast } from "vue-sonner";
import type { Action } from "vue-sonner";

export function useNotification() {
    const showSuccess = (text: string, duration?: number) => toast.success(text, duration ? { duration } : undefined);

    const showError = (text: string, duration?: number) => toast.error(text, duration ? { duration } : undefined);

    const showWarning = (text: string, duration?: number) => toast.warning(text, duration ? { duration } : undefined);

    const showInfo = (text: string, duration?: number) => toast.info(text, duration ? { duration } : undefined);

    const showSuccessWithAction = (text: string, action: Action, duration?: number) =>
        toast.success(text, {
            action,
            duration: duration || 3000,
        });

    const showErrorWithAction = (text: string, action: Action, duration?: number) =>
        toast.error(text, {
            action,
            duration: duration || 3000,
        });

    return {
        showSuccess,
        showError,
        showWarning,
        showInfo,
        showSuccessWithAction,
        showErrorWithAction,
    };
}
