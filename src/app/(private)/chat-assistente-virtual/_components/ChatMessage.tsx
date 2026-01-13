import { Check, CheckCheck } from "lucide-react";

interface ChatMessageProps  {
  type: "user_message" | "assistant_message";
  author?: string;
  content: string;
  timestamp: string;
  read?: boolean;
}

export default function ChatMessage({
  type,
  author,
  content,
  timestamp,
  read = true,
}: ChatMessageProps) {
  const isCustomer = type === "user_message";

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
        {author && (
          <div className="font-montserrat font-semibold text-white/50 font-size-sm mb-1">
            <span>{author}</span>
          </div>
        )}
        <p className="font-montserrat font-normal font-size-sm break-words whitespace-pre-wrap">
          {content}
        </p>
        <div className="flex items-center justify-end gap-1 mt-2">
          <span className="font-montserrat font-normal text-xs">{timestamp}</span>
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
