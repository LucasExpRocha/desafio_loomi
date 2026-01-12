import { toast } from "sonner";
import { CheckCircle, AlertCircle, AlertTriangle, X } from "lucide-react";

const toastStyles = {
  success: {
    bg: "bg-[#1876D2]", 
    textMuted: "text-white",
    icon: CheckCircle,
  },
  error: {
    bg: "bg-red-600",
    textMuted: "text-red-50",
    icon: AlertCircle,
  },
  warning: {
    bg: "bg-amber-500", 
    textMuted: "text-amber-50",
    icon: AlertTriangle,
  },
  info: {
    bg: "bg-blue-600", 
    textMuted: "text-blue-50",
    icon: AlertCircle,
  },
};

type ToastType = keyof typeof toastStyles;

export const AppToast = (type: ToastType, title: string, message?: string) => {
  const style = toastStyles[type];
  const Icon = style.icon;

  return toast.custom(
    (t) => (
      <div
        className={`${style.bg} relative flex w-full items-start gap-3 rounded-lg p-4 text-white shadow-lg transition-all md:min-w-[356px]`}
      >
        <Icon className="mt-0.5 h-5 w-5 shrink-0" />

        <div className="flex-1 pr-6">
          <h3 className="text-sm font-semibold">{title}</h3>
          {message && (
            <p className={`mt-1 text-sm ${style.textMuted} leading-relaxed`}>
              {message}
            </p>
          )}
        </div>

        <button
          onClick={() => toast.dismiss(t)}
          className="absolute right-2 top-2 p-1 text-white/70 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    ),
    { unstyled: true, duration: 3000 } 
  );
};