"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AppToast } from "@/lib/toast";
import { useEffect, useRef, useState, useMemo } from "react";
import AISuggestion from "./_components/AISuggestion";
import ChatInput from "./_components/ChatInput";
import ChatMessage from "./_components/ChatMessage";
import { useQuery } from "@tanstack/react-query";
import { chatService } from "@/app/services/chat.service";

interface Message extends ChatIAMessage {
  read?: boolean;
  actions?: ChatIAActionItem[];
}

export default function ChatAssistenteVirtual() {
  const [localMessages, setLocalMessages] = useState<Message[]>([]);

  const { data, isLoading } = useQuery<ChatIA>({
    queryKey: ["chat-ia"],
    queryFn: chatService.getChat,
    structuralSharing: true,
    retry: 2,
    retryDelay: 1000,
    refetchInterval: 5 * 1000,
  });

  const messages = useMemo(() => {
    if (isLoading || !data?.messages || data.messages.length === 0) {
      return [];
    }

    const actions = data.conversationAnalysis.futureSteps.actions || [];

    const apiMessages = data.messages.map((msg) => ({
      id: msg.id,
      type: msg.type,
      author: msg.author,
      content: msg.content,
      timestamp: msg.timestamp,
      read: msg.type === "user_message",
      actions: msg.type === "ai_suggestion" ? actions : undefined,
    }));

    return [...apiMessages, ...localMessages];
  }, [data, isLoading, localMessages]);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "assistant_message",
      author: "Assistente",
      content: text,
      timestamp: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setLocalMessages((prev) => [...prev, newMessage]);
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col">
      <div className="h-[calc(100vh-328px)] bg-white/5 rounded-2xl border border-white/10 overflow-hidden flex flex-col text-white mb-10">
        <ScrollArea className="h-full px-6 py-8">
          <div className="space-y-4">
            <div className="flex justify-center mb-6">
              <span className="font-montserrat text-xs uppercase">
                Hoje, 16:40
              </span>
            </div>

            {messages.map((msg) =>
              msg.type === "ai_suggestion" ? (
                <AISuggestion
                  key={msg.id}
                  suggestion={msg.content}
                  timestamp={msg.timestamp}
                  actions={
                    msg.actions?.map((a) => ({
                      id: a.id,
                      action: a.action,
                      priority: a.priority,
                    })) || []
                  }
                />
              ) : (
                <ChatMessage
                  key={msg.id}
                  type={msg.type}
                  author={msg.author}
                  content={msg.content}
                  timestamp={msg.timestamp}
                  read={msg.read}
                />
              )
            )}

            <div ref={scrollRef} />
          </div>
        </ScrollArea>
      </div>

      <ChatInput onSend={handleSendMessage} />
    </div>
  );
}