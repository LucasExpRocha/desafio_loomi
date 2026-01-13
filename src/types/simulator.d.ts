type SimulatorPlanIndicator = {
  name: string;
  conversion: number;
  roi: number;
  value: number;
};

type SimulatorPlans = {
  includedBenefits: string[];
  plansIndicators: SimulatorPlanIndicator[];
};
