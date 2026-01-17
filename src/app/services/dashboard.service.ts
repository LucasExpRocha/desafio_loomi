import { fetchClient } from "./fetch-client";

export const dashboardService = {
  getDashboard: () => fetchClient<NortusResponse>("/api/nortus-v1/dashboard"),
};

export * from "./dashboard.service";
