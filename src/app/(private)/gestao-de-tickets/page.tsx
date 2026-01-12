"use client";

import { Suspense, useEffect, useState } from "react";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import CardsHeader from "./_components/CardsHeader";
import ListaTickets from "./_components/ListaTickets";
import TicketFormModal from "./_components/TicketFormModal";

function GestaoDeTicketsContent() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "view">("create");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const itemId = searchParams.get("edit") || null;

  const handleSave = async () => {
    console.log("Criando ticket... ");
  };

  useEffect(() => {
    const handler = () => {
      setMode("create");
      setOpen(true);
    };
    window.addEventListener("open-ticket-modal", handler as EventListener);
    return () => {
      window.removeEventListener("open-ticket-modal", handler as EventListener);
    };
  }, []);

  return (
    <div className="flex flex-col gap-4 2xl:gap-6">
      <CardsHeader />
      <ListaTickets />
      {open && (
        <TicketFormModal
          open={open || !!itemId}
          mode={!!itemId ? "view" : mode}
          onClose={() => {
            const params = new URLSearchParams(
              Array.from(searchParams.entries())
            );
            params.delete("view");
            const queryString = params.toString();
            const url = queryString ? `${pathname}?${queryString}` : pathname;
            setOpen(false);
            setMode("create");
            router.replace(url);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default function GestaoDeTickets() {
  return (
    <Suspense fallback={<div className="card">Carregando...</div>}>
      <GestaoDeTicketsContent />
    </Suspense>
  );
}
