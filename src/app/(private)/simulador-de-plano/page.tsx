"use client";

import { cn } from "@/lib/utils";
import PlanosPersonalizados from "./_components/PlanosPersonalizados";
import ResumoPlano from "./_components/ResumoPlano";
import { formatCurrency } from "@/lib/formatCurrency";
import { planSimulatorService } from "@/app/services/plan-simulator.service";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export default function SimuladorDePlano() {
  const { data, isLoading } = useQuery({
    queryKey: ["planSimulator"],
    queryFn: planSimulatorService.getPlans,
    structuralSharing: true,
    retry: 2,
    retryDelay: 1000,
    staleTime: 10 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return (
    <div className="flex flex-col gap-6 pr">
      <div className="grid grid-cols-[62fr_35fr] gap-6 2xl:gap-8">
        <PlanosPersonalizados
          plansIndicators={data?.plansIndicators || []}
          isLoading={isLoading}
        />
        <ResumoPlano
          includedBenefits={data?.includedBenefits}
          plansIndicators={data?.plansIndicators}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
