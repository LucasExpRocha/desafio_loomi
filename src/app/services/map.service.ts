import { fetchClient } from "./fetch-client";

export const mapService = {
  getLocations: () => fetchClient<MapLocationsReponse>("/api/locations"),
};

export * from "./map.service";
