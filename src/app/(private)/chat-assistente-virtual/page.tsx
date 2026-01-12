"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AppToast } from "@/lib/toast";
import { useEffect, useRef, useState } from "react";
import AISuggestion from "./_components/AISuggestion";
import ChatInput from "./_components/ChatInput";
import ChatMessage from "./_components/ChatMessage";

interface Message {
  id: string;
  type: "customer" | "assistant" | "ai-suggestion";
  sender?: string;
  subtitle?: string;
  message: string;
  time: string;
  read?: boolean;
  actions?: { label: string }[];
}

const initialMessages: Message[] = [
  {
    id: "1",
    type: "customer",
    sender: "Ricardo Leite",
    subtitle: "Seguro Automóvel",
    message: "Oi! Tudo certo? Gostaria de saber sobre o seguro automóvel",
    time: "12:23",
    read: true,
  },
  {
    id: "2",
    type: "assistant",
    sender: "Assistente",
    message:
      "Oi, Ricardo! Tudo ótimo e com você? Claro que sim, posso te ajudar com o que precisar. Vi aqui que você tá com a gente há 6 meses com o seguro de automóvel, é isso mesmo?",
    time: "12:23",
  },
  {
    id: "3",
    type: "customer",
    sender: "Ricardo Leite",
    subtitle: "Seguro Automóvel",
    message:
      "Isso! Mas agora fiquei pensando... tem alguma coisa além disso? Tipo, pros meus equipamentos",
    time: "12:23",
    read: true,
  },
  {
    id: "4",
    type: "ai-suggestion",
    message:
      "Baseado no perfil do cliente, recomendo a oferta Premium com desconto de 15%. Cliente tem histórico positivo.",
    time: "12:23",
    actions: [
      { label: "Enviar proposta" },
      { label: "Fazer ligação" },
      { label: "Ver histórico" },
    ],
  },
];

export default function ChatAssistenteVirtual() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: "assistant",
      sender: "Assistente",
      message: text,
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, newMessage]);
  };

  const handleAction = (action: string) => {
    AppToast("info", "Ação executada", `Você clicou em: ${action}`);
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
              msg.type === "ai-suggestion" ? (
                <AISuggestion
                  key={msg.id}
                  suggestion={msg.message}
                  time={msg.time}
                  actions={
                    msg.actions?.map((a) => ({
                      label: a.label,
                      onClick: () => handleAction(a.label),
                    })) || []
                  }
                />
              ) : (
                <ChatMessage
                  key={msg.id}
                  type={msg.type}
                  sender={msg.sender}
                  subtitle={msg.subtitle}
                  message={msg.message}
                  time={msg.time}
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
