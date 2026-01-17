"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

export type TicketModalMode = "create" | "edit" | "view";

interface TicketContextType {
  isModalOpen: boolean;
  modalMode: TicketModalMode;
  selectedTicketId: string | null;
  openModal: (mode: TicketModalMode, ticketId?: string) => void;
  closeModal: () => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export function TicketProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<TicketModalMode>("create");
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const openModal = useCallback((mode: TicketModalMode, ticketId?: string) => {
    setModalMode(mode);
    if (ticketId) setSelectedTicketId(ticketId);
    else setSelectedTicketId(null);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedTicketId(null);
    setModalMode("create");
  }, []);

  return (
    <TicketContext.Provider
      value={{
        isModalOpen,
        modalMode,
        selectedTicketId,
        openModal,
        closeModal,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export function useTicket() {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error("useTicket must be used within a TicketProvider");
  }
  return context;
}
