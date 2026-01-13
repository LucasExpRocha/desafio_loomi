import { toast } from 'sonner';

export const planSimulatorService = {
  getPlans: async (): Promise<SimulatorPlans> => {
    try {
      const res = await fetch('/api/simulador-planos');
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.message || 'Falha ao buscar simulador de planos'
        );
      }
      return res.json();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Erro ao buscar simulador de planos';
      toast.error(message);
      throw error;
    }
  },
};

export * from './plan-simulator.service';
