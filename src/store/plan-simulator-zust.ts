import { create } from 'zustand'

interface Benefits {
  rouboFurto: boolean
  colisao: boolean
  incendio: boolean
  fenomenos: boolean
  [key: string]: boolean
}

interface SimulatorState {
  selectedPlan: string
  vehicleValue: number
  clientAge: number
  benefits: Benefits
  
  setSelectedPlan: (plan: string) => void
  setVehicleValue: (value: number) => void
  setClientAge: (age: number) => void
  toggleBenefit: (key: string, value: boolean) => void
  
  calculateAdditionalCost: () => number
}

const BENEFIT_PRICES: Record<string, number> = {
  rouboFurto: 25,
  colisao: 35,
  incendio: 20,
  fenomenos: 30
}

export const useSimulatorStore = create<SimulatorState>((set, get) => ({
  selectedPlan: "Intermediário",
  vehicleValue: 50000,
  clientAge: 28,
  benefits: {
    rouboFurto: true,
    colisao: true,
    incendio: true,
    fenomenos: false,
  },

  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
  setVehicleValue: (value) => set({ vehicleValue: value }),
  setClientAge: (age) => set({ clientAge: age }),
  toggleBenefit: (key, value) => set((state) => ({
    benefits: { ...state.benefits, [key]: value }
  })),

  calculateAdditionalCost: () => {
    const { benefits } = get()
    return Object.entries(benefits).reduce((total, [key, isActive]) => {
      if (isActive && BENEFIT_PRICES[key]) {
        return total + BENEFIT_PRICES[key]
      }
      return total
    }, 0)
  }
}))
