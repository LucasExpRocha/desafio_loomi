import { toast } from 'sonner';

import { TicketSchema } from '@/validation/ticket';

export const ticketsService = {
  getAllTickets: async (): Promise<TicketsAllResponse> => {
    try {
      const res = await fetch('/api/tickets');
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Falha ao buscar tickets');
      }
      return res.json();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao buscar tickets';

      toast.error(message);
      throw error;
    }
  },

  createTicket: async (data: TicketSchema): Promise<TicketItem> => {
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Falha ao criar ticket');
      }
      return res.json();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao criar ticket';

      toast.error(message);
      throw error;
    }
  },

  updateTicket: async (id: string, data: TicketSchema): Promise<TicketItem> => {
    try {
      const res = await fetch(`/api/tickets/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Falha ao atualizar ticket');
      }
      return res.json();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao atualizar ticket';

      toast.error(message);
      throw error;
    }
  },

  getTicket: async (id: string): Promise<TicketItem> => {
    try {
      const res = await fetch(`/api/tickets/${id}`);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Falha ao obter ticket');
      }
      return res.json();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao obter ticket';

      toast.error(message);
      throw error;
    }
  },
};

export * from './map.service';
