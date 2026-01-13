"use client";

import { Suspense, useEffect, useState } from "react";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import CardsHeader from "./_components/CardsHeader";
import ListaTickets from "./_components/ListaTickets";
import TicketFormModal from "./_components/TicketFormModal";
import { ticketsService } from "@/app/services/tickets.service";
import { useQuery } from "@tanstack/react-query";

function GestaoDeTicketsContent() {
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const itemId = searchParams.get("edit") || null;
  const viewId = searchParams.get("view") || null;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["ticketsList"],
    queryFn: ticketsService.getAllTickets,
    refetchInterval: 20 * 1000,
    structuralSharing: true,
    retry: 2,
    retryDelay: 1000,
    staleTime: 10 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  const handleSave = async () => {
    console.log("Criando ticket... ");
  };

  useEffect(() => {
    const handler = () => {
      setOpen(true);
    };
    window.addEventListener("open-ticket-modal", handler as EventListener);
    return () => {
      window.removeEventListener("open-ticket-modal", handler as EventListener);
    };
  }, []);

  const isOpen = open || !!itemId || viewId !== null;

  return (
    <div className="flex flex-col gap-4 2xl:gap-6">
      <CardsHeader ticketsList={data?.data} />
      <ListaTickets ticketsList={data?.data} />
      {isOpen && (
        <TicketFormModal
          open={isOpen}
          mode={!!itemId ? "edit" : viewId ? "view" : "create"}
          onClose={() => {
            const params = new URLSearchParams(
              Array.from(searchParams.entries())
            );
            params.delete("view");
            params.delete("edit");
            const queryString = params.toString();
            const url = queryString ? `${pathname}?${queryString}` : pathname;
            setOpen(false);
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
