import { AppToast } from "@/lib/toast";

export const mapService = {
  getLocations: async (): Promise<MapLocationsReponse> => {
    try {
      const res = await fetch("/api/locations");
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Falha ao buscar locais");
      }
      return res.json();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao buscar locais";

      AppToast("error", message);
      throw error;
    }
  },
};

export * from "./map.service";

