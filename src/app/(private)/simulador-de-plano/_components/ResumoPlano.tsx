"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/formatCurrency";
import { cn } from "@/lib/utils";
import { useSimulatorStore } from "@/store/plan-simulator-zust";

interface ResumoPlanoProps {
  includedBenefits?: string[];
  plansIndicators?: SimulatorPlanIndicator[];
  isLoading?: boolean;
}

export default function ResumoPlano({
  includedBenefits = [],
  plansIndicators = [],
  isLoading = false,
}: ResumoPlanoProps) {
  const { selectedPlan } = useSimulatorStore();

  return (
    <section className="flex flex-col gap-6 2xl:gap-8">
      <div className="card px-8 3xl:py-10">
        <h3 className="font-montserrat font-bold font-size-xl text-white mb-8">
          Benefícios Inclusos
        </h3>
        <div className="flex gap-2.5 flex-wrap">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-10 w-32 rounded-4xl bg-white/10"
                />
              ))
            : includedBenefits.map((benefit, index) => (
                <span
                  key={benefit}
                  className={cn(
                    "inline-flex items-center justify-center text-xs 2xl:gap-2 rounded-4xl border border-white/10 p-1 2:xl:p-3 text-primary-color",
                    "bg-[rgba(255,255,255,0.08)] border-[#FFFFFF1A] before:content-[''] before:inline-block before:w-2 before:h-2 before:rounded-full before:mr-2",
                    index % 2 === 0
                      ? "before:bg-[#006FFF] before:shadow-[0_0_4px_#006FFF]"
                      : "before:bg-[#53A9FD] before:shadow-[0_0_4px_#53A9FD]"
                  )}
                >
                  {benefit}
                </span>
              ))}
        </div>
      </div>
      <div className="card text-white flex flex-col gap-4 3xl:gap-8 p-4 3xl:p-8">
        <h3 className="font-montserrat font-bold font-size-xl text-white">
          Indicadores
        </h3>
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between card w-full p-4 xl:p-6 2xl:p-8"
              >
                <div className="space-y-2">
                  <Skeleton className="h-8 w-32 bg-white/10" />
                  <div className="flex gap-6">
                    <Skeleton className="h-4 w-24 bg-white/10" />
                    <Skeleton className="h-4 w-24 bg-white/10" />
                  </div>
                </div>
                <div>
                  <Skeleton className="h-8 w-24 bg-white/10" />
                </div>
              </div>
            ))
          : plansIndicators.map((e) => (
              <div
                key={e.name}
                className={cn(
                  "flex items-center justify-between card w-full p-4 xl:p-6 2xl:p-8 border transition-colors",
                  selectedPlan === e.name
                    ? "border-[#1876D2] bg-[#1876D2]/5"
                    : "border-transparent"
                )}
              >
                <div className="space-y-2">
                  <h5 className="font-montserrat font-bold font-size-xl text-white h-8">
                    {e.name}
                  </h5>
                  <div className="flex gap-6">
                    <span className="font-montserrat font-normal font-size-sm">
                      Conversão{" "}
                      <span className="font-montserrat font-normal font-size-sm text-[#00DC04]">
                        {e.conversion}%
                      </span>
                    </span>
                    <span className="font-montserrat font-normal font-size-sm">
                      ROI{" "}
                      <span className="font-montserrat font-normal font-size-sm text-[#00DC04]">
                        {e.roi}%
                      </span>
                    </span>
                  </div>
                </div>
                <div>
                  <h5 className="font-montserrat font-bold font-size-xl text-white">
                    {formatCurrency(e.value)}
                  </h5>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
}
