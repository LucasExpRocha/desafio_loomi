"use client";

import { dashboardService } from "@/app/services/dashboard.service";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type KpiKey = keyof Omit<KpisTrend, "labels">;

export default function EvolucaoKpi() {
  const [selectedOption, setSelectedOption] = useState<KpiKey>("arpuTrend");
  const options: { name: string; kpiName: KpiKey }[] = [
    {
      name: "Retenção",
      kpiName: "retentionTrend",
    },
    {
      name: "Conversão",
      kpiName: "conversionTrend",
    },
    {
      name: "Churn",
      kpiName: "churnTrend",
    },
    {
      name: "ARPU",
      kpiName: "arpuTrend",
    },
  ];

  const { data, isLoading } = useQuery({
    queryKey: ["nortusVumDashboard"],
    queryFn: dashboardService.getDashboard,
    structuralSharing: true,
    retry: 2,
    retryDelay: 1000,
    staleTime: 10 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return (
    <div className="overflow-hidden relative">
      <span className="block rounded-full absolute w-[200px] h-[200px] bg-gradient-to-br from-[#BDDAFF] to-[#D3ABF440] blur-[150px] top-[-200px] right-[-150px]" />
      <span className="block rounded-full absolute w-[200px] h-[200px] bg-gradient-to-br from-[#BDDAFF] to-[#D3ABF440] blur-[150px] bottom-[-200px] right-[-150px]" />
      <div className="card pb-0">
        <div className="flex items-center justify-between gap-6 h-14 mb-2 2xl:mb-16">
          <h3 className="font-montserrat font-bold font-size-xl text-white">
            {"Evolução dos KPI's"}
          </h3>
          <ul className="flex px-3 py-2 gap-2 rounded-full bg-white/5">
            {options.map((item) => {
              const isActive = item.kpiName === selectedOption;
              return (
                <li
                  key={item.kpiName}
                  className={cn(
                    "bg-white/10 p-3 rounded-full cursor-pointer",
                    "font-montserrat font-semibold text-xs text-white",
                    isActive ? "bg-cyan-button" : "bg-white/10"
                  )}
                  onClick={() => setSelectedOption(item.kpiName)}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
        <ChartComp
          series={data?.kpisTrend?.[selectedOption]}
          labels={data?.kpisTrend?.labels}
          isArpu={selectedOption === "arpuTrend"}
        />
      </div>
    </div>
  );
}

const ChartComp = ({
  series,
  labels,
  isArpu,
}: {
  series?: { name: string; data: number[] };
  labels?: string[];
  isArpu?: boolean;
}) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const height = isDesktopOrLaptop ? 208 : 188;

  const chartData =
    isArpu && series
      ? { ...series, data: series.data.map((val) => val / 1000) }
      : series;

  const options: ApexOptions = {
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
        opacityFrom: 1,
        opacityTo: 0.5,
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
      categories: labels || [],
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
      max: chartData?.data?.length ? Math.max(...chartData.data) : 0,
      tickAmount: 4,
      labels: {
        offsetX: -16,
        style: {
          colors: "#FFFFFF",
          fontSize: "14px",
        },
        formatter: (val: number) =>
          isArpu ? `${val.toFixed(0)}k` : `${val.toFixed(0)}`,
      },
    },

    legend: {
      show: true,
      offsetY: 16,
    },

    tooltip: {
      enabled: true,
      custom: function ({
        series,
        seriesIndex,
        dataPointIndex,
      }: {
        series: number[][];
        seriesIndex: number;
        dataPointIndex: number;
      }) {
        const value = series[seriesIndex][dataPointIndex];

        return `
      <div 
        class="bg-[#3c4252] py-3 px-4 w-[100px] h-[40px] border-[#3c4252]"
      >
        <span class="font-montserrat font-semibold font-size-sm text-white">${
          isArpu ? `R$ ${value.toFixed(1)}k` : value
        }</span>
      </div>
    `;
      },
    },
  };

  return (
    <Chart
      options={options}
      series={chartData ? [chartData] : []}
      type="area"
      height={height}
    />
  );
};
