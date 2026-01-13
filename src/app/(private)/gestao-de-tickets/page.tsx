"use client";

import { Suspense, useEffect, useState } from "react";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import CardsHeader from "./_components/CardsHeader";
import ListaTickets from "./_components/ListaTickets";
import TicketFormModal from "./_components/TicketFormModal";
import { ticketsService } from "@/app/services/tickets.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AppToast } from "@/lib/toast";
import { toast } from "sonner";

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

  const { data: editingTicket } = useQuery({
    queryKey: ["ticket", itemId],
    queryFn: () => ticketsService.getTicket(itemId!),
    enabled: !!itemId,
    retry: 1,
  });

  const createMutation = useMutation({
    mutationFn: (data: TicketFormData) => ticketsService.createTicket(data),
    onSuccess: () => {
      AppToast(
        "success",
        "Ticket criado com sucesso!",
        "O ticket foi criado e já está na sua lista."
      );
      refetch();
      setOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: (vars: { id: string; data: TicketFormData }) =>
      ticketsService.updateTicket(vars.id, vars.data),
    onSuccess: () => {
      AppToast(
        "success",
        "Ticket editado com sucesso!",
        "O ticket foi editado e já está na sua lista."
      );
      refetch();
      setOpen(false);
      router.replace(`${pathname}?edit=${itemId}`);
    },
  });

  const handleSave = async (data: TicketFormData) => {
    if (itemId) {
      await updateMutation.mutateAsync({ id: itemId, data });
    } else {
      const toastId = toast.loading("Criando ticket... ");
      await createMutation.mutateAsync(data);
      toast.dismiss(toastId);
    }
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
          initial={!!itemId ? (editingTicket ?? null) : null}
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
