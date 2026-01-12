"use client";

import { dashboardService } from "@/app/services/dashboard.service";
import { useQuery } from "@tanstack/react-query";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useMediaQuery } from "react-responsive";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function TaxaConversao() {
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
    <div className="card pb-0">
      <div className="flex items-center justify-between gap-6 h-14 mb-2 2xl:mb-6">
        <h3 className="font-montserrat font-bold font-size-xl text-white">
          {"Taxa de conversão"}
        </h3>
      </div>
      <ChartComp
        series={data?.kpisTrend?.conversionTrend}
        labels={data?.kpisTrend?.labels}
      />
    </div>
  );
}

const ChartComp = ({
  series,
  labels,
}: {
  series?: { name: string; data: number[] };
  labels?: string[];
}) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const height = isDesktopOrLaptop ? 248 : 188;
  const options = {
    chart: {
      type: "bar",
      height: 320,
      toolbar: { show: false },
      fontFamily: "Montserrat, sans-serif",
      background: "transparent",
    },

    plotOptions: {
      bar: {
        borderRadius: 6,
        borderRadiusApplication: "end",
        columnWidth: "40%",
      },
    },

    colors: ["#7DE3FF"],

    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.2,
        opacityFrom: 1,
        opacityTo: 0.6,
        stops: [0, 100],
      },
    },

    dataLabels: {
      enabled: false,
    },

    grid: {
      borderColor: "rgba(255,255,255,0.25)",
      strokeDashArray: 6,
    },

    xaxis: {
      categories: labels || [],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: "#FFFFFF",
          fontSize: "14px",
          fontWeight: 500,
        },
      },
    },

    yaxis: {
      min: 0,
      max: series?.data?.length ? Math.max(...series.data) + 10 : 0,
      tickAmount: 5,
      labels: {
        offsetX: -8,
        style: {
          colors: "#FFFFFF",
          fontSize: "14px",
        },
      },
    },

    tooltip: {
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
            class="bg-[#3c4252] py-3 px-4 w-[150px] h-[40px] border-none"
          >
            <p class="font-montserrat font-semibold font-size-sm text-white">${value} novos clientes</p>
          </div>
        `;
      },
    },

    legend: {
      show: false,
    },
  };

  return (
    <Chart
      options={options as ApexOptions}
      series={series ? [series] : []}
      type="bar"
      height={height}
    />
  );
};
