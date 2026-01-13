import { toast } from 'sonner';

export const chatService = {
  getChat: async (): Promise<ChatIA> => {
    try {
      const res = await fetch('/api/nortus-v1/chat');
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Falha ao buscar chat');
      }
      return res.json();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao buscar chat';
      toast.error(message);
      throw error;
    }
  },
};

export * from './chat.service';
