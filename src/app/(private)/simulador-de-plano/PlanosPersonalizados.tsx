import Checkbox from "@/components/Checkbox";
import { formatCurrency } from "@/lib/formatCurrency";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function PlanosPersonalizados() {
  const [selectedPlan, setSelectedPlan] = useState<string>("Intermediário");
  const [vehicleValue, setVehicleValue] = useState<number>(50000);
  const [clientAge, setClientAge] = useState<number>(28);
  const [benefits, setBenefits] = useState<Record<string, boolean>>({
    rouboFurto: true,
    colisao: true,
    incendio: true,
    fenomenos: false,
  });

  const plans = [
    {
      name: "Plano Básico",
      price: 89.9,
    },
    {
      name: "Intermediário",
      price: 145.9,
    },
    {
      name: "Premium",
      price: 225.9,
      recommended: true,
    },
  ];

  const aditional = [
    {
      label: "Cobertura contra roubo e furto",
      price: 25.0,
      key: "rouboFurto",
    },
    {
      label: "Danos por colisão",
      price: 35.0,
      key: "colisao",
    },
    {
      label: "Cobertura contra incêndio",
      price: 20.0,
      key: "incendio",
    },
    {
      label: "Fenômenos naturais (granizo, enchente)",
      price: 30.0,
      key: "fenomenos",
    },
  ];

  return (
    <section className="card flex flex-col gap-10">
      <div className="flex flex-col gap-6 w-full">
        <h3 className="font-montserrat font-bold font-size-xl text-white">
          Planos Personalizados
        </h3>
        <div className="flex gap-6 w-full">
          {plans.map((plan) => (
            <div
              key={plan.name}
              onClick={() => setSelectedPlan(plan.name)}
              className={cn(
                "card w-full space-x-2 xl:space-y-4 2xl:space-y-8 cursor-pointer",
                selectedPlan === plan.name && "border-[#1876D2]"
              )}
            >
              <div className="flex justify-between items-end">
                <h4 className="font-montserrat font-bold font-size-sm text-white">
                  {plan.name}
                </h4>
                {plan.recommended && (
                  <span
                    className={cn(
                      "font-montserrat text-[#0B1125] font-medium text-xs",
                      "bg-[#43D2CB] px-2 py-1 rounded-full"
                    )}
                  >
                    Recomendado
                  </span>
                )}
              </div>
              <p className="font-montserrat font-bold font-size-2xl text-white">
                R$ {formatCurrency(plan.price)}
              </p>
              <p className="font-montserrat font-size-sm text-white/60">
                Por mês
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-montserrat font-semibold font-size-base text-white">
          Valor do veículo: {formatCurrency(vehicleValue)}
        </h3>

        <input
          type="range"
          min={10000}
          max={500000}
          step={1000}
          value={vehicleValue}
          onChange={(e) => setVehicleValue(Number(e.target.value))}
          aria-label="Valor do veículo"
          className="w-full h-2 rounded-full accent-[##1876D]"
        />
        <div className="flex items-center justify-between">
          <span className="font-montserrat font-normal font-size-sm">
            R$ 10.000
          </span>
          <span className="font-montserrat font-normal font-size-sm">
            R$ 500.000
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-montserrat font-semibold font-size-base text-white">
          Idade do Cliente: {clientAge} anos
        </h3>
        <input
          type="range"
          min={18}
          max={90}
          step={1}
          value={clientAge}
          onChange={(e) => setClientAge(Number(e.target.value))}
          aria-label="Idade do cliente"
          className="w-full h-2 rounded-full accent-[##1876D]"
        />
        <div className="flex items-center justify-between">
          <span className="font-montserrat font-normal font-size-sm">
            18 anos
          </span>
          <span className="font-montserrat font-normal font-size-sm">
            90 anos
          </span>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <h5 className="font-montserrat font-bold font-size-base text-white">
          Coberturas Adicionais
        </h5>

        {aditional.map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between gap-3"
          >
            <Checkbox
              label={item.label}
              checked={benefits[item.key]}
              onCheckedChange={(checked) =>
                setBenefits((prev: Record<string, boolean>) => ({
                  ...prev,
                  [item.key]: checked,
                }))
              }
              inputClassName="w-4 h-4 checked:bg-[#1876D2] checked:border-[#1876D2] checked:after:content-['✓'] after:text-[#F7F7F7] after:text-xs"
              labelClassName="font-inter font-size-sm font-normal"
            />

            <span className="font-montserrat text-xs text-white font-bold">
              R$ {formatCurrency(item.price)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
