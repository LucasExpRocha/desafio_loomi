"use client";

import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
  onSend?: (message: string) => void;
  placeholder?: string;
}

export default function ChatInput({
  onSend,
  placeholder = "Escreva aqui...",
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && onSend) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={cn(
        "max-w-[942px] w-full h-10 xl:h-14 2xl:h-20 px-5 py-8 mx-auto",
        "flex items-center",
        "bg-white/10 border border-white/50 rounded-full text-white"
      )}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 placeholder:text-white/80 text-sm outline-none"
      />
      <button
        onClick={handleSend}
        className={cn(
          "w-10 h-10 rounded-full bg-[#1876D2]",
          "flex items-center justify-center",
          "transition-all hover:scale-105 hover:shadow-lg"
        )}
        style={{ boxShadow: "var(--shadow-button)" }}
      >
        <Send className="w-3 h-3" />
      </button>
    </div>
  );
}
