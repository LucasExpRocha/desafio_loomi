"use client";

import { cn } from "@/lib/utils";
import PlanosPersonalizados from "./_components/PlanosPersonalizados";
import { formatCurrency } from "@/lib/formatCurrency";
import { planSimulatorService } from "@/app/services/plan-simulator.service";
import { useQuery } from "@tanstack/react-query";

export default function SimuladorDePlano() {
  const { data } = useQuery({
    queryKey: ["planSimulator"],
    queryFn: planSimulatorService.getPlans,
    structuralSharing: true,
    retry: 2,
    retryDelay: 1000,
    staleTime: 10 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  const benefits = ["Tudo do básico", "Carro reserva", "Vidros"];
  const indicators = [
    {
      name: "Básico",
      value: 89.9,
      conversion: 75,
      ROI: 80,
    },
    {
      name: "Intermediário",
      value: 145.9,
      conversion: 48,
      ROI: 114,
    },
    {
      name: "Premium",
      value: 225.9,
      conversion: 100,
      ROI: 100,
    },
  ];

  return (
    <div className="flex flex-col gap-6 pr">
      <div className="grid grid-cols-[62fr_35fr] gap-6 2xl:gap-8">
        <PlanosPersonalizados plansIndicators={data?.plansIndicators || []} />
        <section className="flex flex-col gap-6 2xl:gap-8">
          <div className="card p-4 py-10">
            <h3 className="font-montserrat font-bold font-size-xl text-white mb-8">
              Benefícios Inclusos
            </h3>
            <div className="flex gap-2.5">
              {benefits.map((benefit, index) => (
                <span
                  key={benefit}
                  className={cn(
                    "inline-flex items-center justify-center text-xs gap-2 rounded-4xl border border-white/10 px-3 py-3 text-primary-color",
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
          <div className="card text-white flex flex-col gap-4 xl:gap-8 p-4 xl:p-8">
            <h3 className="font-montserrat font-bold font-size-xl text-white">
              Indicadores
            </h3>
            {indicators.map((e) => (
              <div
                key={e.name}
                className="flex items-center justify-between card w-full p-4 xl:p-6 2xl:p-8"
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
                        {e.ROI}%
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
      </div>
    </div>
  );
}
