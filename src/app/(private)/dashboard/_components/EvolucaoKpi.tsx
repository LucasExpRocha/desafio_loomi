"use client";

import { cn } from "@/lib/utils";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useMediaQuery } from 'react-responsive'

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function EvolucaoKpi() {
  const options = ["Retenção", "Conversão", "Churn", "ARPU"]
  return (
    <div
      className="card pb-0"
    >
      <div className="flex items-center justify-between gap-6 h-14 mb-2 2xl:mb-16">
        <h3 className="font-montserrat font-bold font-size-xl text-white">
          {"Evolução dos KPI's"}
        </h3>
        <ul className="flex px-3 py-2 gap-2 rounded-full bg-white/5">
          {
            options.map((item) => {
              const isActive = item === "ARPU";
              return (
                <li key={item} className={cn(
                  "bg-white/10 p-3 rounded-full cursor-pointer",
                  "font-montserrat font-semibold text-xs text-white",
                  isActive ? "bg-button-active" : "bg-white/10",
                )}>
                  {item}
                </li>
              )
            })
          }
        </ul>
      </div>
      <ChartComp />
    </div>
  );
}

const ChartComp = () => {
   const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)'
  })
  
  const height = isDesktopOrLaptop ? 208 : 188;
  
  const series = [
    {
      name: "ARPU",
      data: [95, 120, 160, 190, 150, 110, 95, 120, 170, 220, 240, 200],
    },
  ];

  const options = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
      fontFamily: "Montserrat, sans-serif",
      background: "transparent",
    },

    stroke: {
      curve: "smooth",
      width: 1,
    },

    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 1,
        opacityTo: 0.05,
        stops: [0, 100],
      },
    },

    colors: ["#00EAFF"],

    dataLabels: {
      enabled: false,
    },

    grid: {
      borderColor: "rgba(255,255,255,0.25)",
      strokeDashArray: 6,
    },

    xaxis: {
      categories: [
        "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
        "Jul", "Ago", "Set", "Out", "Nov", "Dez",
      ],
      labels: {
        style: {
          colors: "#FFFFFF",
          fontSize: "14px",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },

    yaxis: {
      min: 0,
      max: 285,
      tickAmount: 4,
      labels: {
        offsetX: -16,
        style: {
          colors: "#FFFFFF",
          fontSize: "14px",
        },
        formatter: (val: unknown) => `${val}`,
      },
    },

    legend: {
      show: true,
      offsetY: 16,
    },

    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex, dataPointIndex, }: { series: number[][]; seriesIndex: number; dataPointIndex: number; }) {
        const value = series[seriesIndex][dataPointIndex];

        return `
      <div 
        class="bg-white/15 py-3 px-4 font-montserrat font-semibold text-sm w-[100px] h-[40px]"
      >
        R$ ${value.toFixed(1)}k
      </div>
    `;
      }
    }
  };

  return (
    <Chart
      options={options as ApexOptions}
      series={series}
      type="area"
      height={height}
    />
  );
};