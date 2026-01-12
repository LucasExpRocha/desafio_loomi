import { Check, CheckCheck } from "lucide-react";

interface ChatMessageProps {
  type: "customer" | "assistant";
  sender?: string;
  subtitle?: string;
  message: string;
  time: string;
  read?: boolean;
}

export default function ChatMessage({
  type,
  sender,
  subtitle,
  message,
  time,
  read = true,
}: ChatMessageProps) {
  const isCustomer = type === "customer";

  return (
    <div
      className={`flex ${isCustomer ? "justify-start" : "justify-end"} animate-fade-in`}
    >
      <div
        className={`max-w-2xl border-2 border-white/20 ${
          isCustomer
            ? "bg-blue-button p-2 rounded-2xl rounded-bl-none"
            : "bg-[#E1F2FD]/20 px-3 py-2 rounded-2xl rounded-br-none border-2 "
        }`}
      >
        {sender && (
          <div className="font-montserrat font-semibold text-white/50 font-size-sm mb-1">
            <span>{sender}</span>
            {subtitle && <span> - {subtitle}</span>}
          </div>
        )}
        <p className="font-montserrat font-normal font-size-sm break-words whitespace-pre-wrap">
          {message}
        </p>
        <div className="flex items-center justify-end gap-1 mt-2">
          <span className="font-montserrat font-normal text-xs">{time}</span>
          {isCustomer &&
            (read ? (
              <CheckCheck strokeWidth={1.5} className="w-4 h-4" />
            ) : (
              <Check className="w-4 h-4 " />
            ))}
        </div>
      </div>
    </div>
  );
}
