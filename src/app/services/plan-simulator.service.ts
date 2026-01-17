import { fetchClient } from './fetch-client';

export const planSimulatorService = {
  getPlans: () => fetchClient<SimulatorPlans>('/api/simulador-planos'),
};

export * from './plan-simulator.service';
