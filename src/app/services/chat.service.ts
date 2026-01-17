import { fetchClient } from './fetch-client';

export const chatService = {
  getChat: () => fetchClient<ChatIA>('/api/nortus-v1/chat'),
};

export * from './chat.service';
