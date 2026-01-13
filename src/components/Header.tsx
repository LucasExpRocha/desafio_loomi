"use client";

import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";

type HeaderAction = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type HeaderConfig = {
  title: string;
  action?: HeaderAction;
};

const configs: Record<string, HeaderConfig> = {
  "/dashboard": { title: "Dashboard" },
  "/gestao-de-tickets": {
    title: "Gestão de Tickets",
    action: { label: "Novo ticket" },
  },
  "/simulador-de-plano": { title: "Simulador de Planos" },
  "/chat-assistente-virtual": { title: "Chat & Assistente Virtual" },
};

export default function Header() {
  const pathname = usePathname();
  const cfg = configs[pathname] ?? { title: "Dashboard" };
  return (
    <header className={cn("w-full h-[64px] 2xl:h-[72px] 3xl:h-[88px]  bg-secondary-background flex items-center justify-between px-6 md:px-10 fixed z-10")}>
      <h1 className="font-montserrat text-ternary-color margin-left-layout font-size-lg font-semibold ">
        {cfg.title}
      </h1>
      {cfg.action && (
        <div className="flex items-center gap-3">
          <button
            className={cn(
              "h-9 md:h-10 px-4 py-2 rounded-full",
              "flex items-center justify-center",
              "text-white", 
              "bg-button-active cursor-pointer"
            )}
            onClick={() => {
              if (pathname === "/gestao-de-tickets") {
                const event = new CustomEvent("open-ticket-modal", {
                  detail: { mode: "create" },
                });
                window.dispatchEvent(event);
              }
            }}
          >
            <Plus className="mr-2" /> <span className="text-xs font-montserrat font-semibold">{cfg.action.label}</span>
          </button>
        </div>
      )}
    </header>
  );
}
