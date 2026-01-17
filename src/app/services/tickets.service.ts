import { TicketSchema } from '@/validation/ticket';
import { fetchClient } from './fetch-client';

export const ticketsService = {
  getAllTickets: () => fetchClient<TicketsAllResponse>('/api/tickets'),

  createTicket: (data: TicketSchema) =>
    fetchClient<TicketItem>('/api/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }),

  updateTicket: (id: string, data: TicketSchema) =>
    fetchClient<TicketItem>(`/api/tickets/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }),

  getTicket: (id: string) => fetchClient<TicketItem>(`/api/tickets/${id}`),
};
