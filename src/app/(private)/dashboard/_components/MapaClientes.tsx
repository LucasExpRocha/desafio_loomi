"use client";

import { Map as OlMap, View } from "ol";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import "ol/ol.css";
import { fromLonLat } from "ol/proj";
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
import { Style } from "ol/style";
import Icon from "ol/style/Icon";
import { useEffect, useMemo, useRef, useState } from "react";

import { mapService } from "@/app/services/map.service";
import Overlay from "ol/Overlay";
import { renderToStaticMarkup } from "react-dom/server";
import {
  FaDumbbell,
  FaGraduationCap,
  FaHospital,
  FaLandmark,
  FaPlane,
  FaStore,
  FaTree,
  FaUtensils,
} from "react-icons/fa";
import { FiFilm, FiMapPin } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

export default function MapaClientes() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<OlMap | null>(null);
  const vectorSourceRef = useRef<VectorSource | null>(null);
  const vectorLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
  const overlayRef = useRef<Overlay | null>(null);
  const overlayElRef = useRef<HTMLDivElement | null>(null);

  const { data, isLoading: isLoadingMapLocations } = useQuery({
    queryKey: ["mapLocations"],
    queryFn: mapService.getLocations,
    structuralSharing: true,
    retry: 2,
    retryDelay: 1000,
    staleTime: 10 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  const allLocations = useMemo(() => {
    const locations = data?.data?.locations ?? [];
    return locations.map((location) => {
      const address = location.address ?? "";
      const state = address.match(/-\s*([A-Z]{2})\s*$/);
      return {
        ...location,
        stateCode: state ? state[1] : "ND",
      };
    });
  }, [data]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const location of allLocations) set.add(location.category);
    return ["Todos os tipos", ...Array.from(set)];
  }, [allLocations]);

  const placeOptions = useMemo(() => {
    const set = new Set<string>();
    for (const location of allLocations) {
      set.add(location.stateCode);
    }
    return ["Todos os locais", ...Array.from(set)];
  }, [allLocations]);

  const [category, setCategory] = useState<string>("Todos os tipos");
  const [place, setPlace] = useState<string>("Todos os locais");

  const filtered = useMemo(() => {
    return allLocations.filter((location) => {
      const isCategoryMatch =
        category === "Todos os tipos" || location.category === category;
      const isPlaceMatch =
        place === "Todos os locais" || location.stateCode === place;
      return isCategoryMatch && isPlaceMatch;
    });
  }, [allLocations, category, place]);

  const iconCacheRef = useRef<Map<string, string>>(new Map());

  function normalizeInputCoords(coords?: number[]): [number, number] {
    if (!coords || coords.length < 2) return [0, 0];
    const a = Number(coords[1]);
    const b = Number(coords[0]);
    if (Number.isNaN(a) || Number.isNaN(b)) return [0, 0];

    if (a >= -180 && a <= 180 && b >= -90 && b <= 90) return [a, b];

    if (a >= -90 && a <= 90 && b >= -180 && b <= 180) return [b, a];

    return [a, b];
  }

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const base = new TileLayer({
      source: new XYZ({
        url: "https://{a-d}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      }),
    });

    vectorSourceRef.current = new VectorSource();
    vectorLayerRef.current = new VectorLayer({
      source: vectorSourceRef.current,
    });

    mapRef.current = new OlMap({
      target: containerRef.current,
      layers: [base, vectorLayerRef.current],
      view: new View({ center: fromLonLat([-51.9253, -14.235]), zoom: 4 }),
      controls: [],
    });

    overlayElRef.current = document.createElement("div");
    overlayElRef.current.className = [
      "pointer-events-auto",
      "rounded-2xl",
      "border",
      "border-white/10",
      "bg-[#141a2f]",
      "text-white",
      "px-3",
      "py-2",
      "text-xs",
      "shadow-[0_12px_12px_0_#0000001A,0_5px_5px_0_#0000000D]",
    ].join(" ");
    overlayRef.current = new Overlay({
      element: overlayElRef.current,
      autoPan: true,
      offset: [0, -15],
      positioning: "bottom-center",
    });
    mapRef.current.addOverlay(overlayRef.current);

    mapRef.current.on("pointermove", (evt) => {
      const el = mapRef.current?.getTargetElement() as HTMLElement | undefined;
      if (!el) return;
      const hit = !!mapRef.current?.hasFeatureAtPixel(evt.pixel);
      el.style.cursor = hit ? "pointer" : "";
    });

    mapRef.current.on("click", (evt) => {
      const feature = mapRef.current?.forEachFeatureAtPixel(
        evt.pixel,
        (f) => f
      ) as Feature<Point> | undefined;
      if (!feature) {
        overlayRef.current?.setPosition(undefined);
        return;
      }
      const data = feature.get("data") as MapLocation | undefined;
      const geom = feature.getGeometry() as Point | undefined;
      if (!geom) return;

      if (data) {
        const color = data.color ?? "#2DB3C8";
        const html = `
          <div>
            <div class="font-semibold" style="color:${color}">${data.name}</div>
            ${data.category ? `<div class="opacity-80">${data.category}</div>` : ""}
            ${data.address ? `<div class="opacity-60 mt-1">${data.address}</div>` : ""}
          </div>
        `;
        if (overlayElRef.current) overlayElRef.current.innerHTML = html;
      }
      overlayRef.current?.setPosition(geom.getCoordinates());
    });
  }, []);

  useEffect(() => {
    if (!vectorSourceRef.current || !mapRef.current) return;
    vectorSourceRef.current.clear(true);

    const iconMap: Record<
      string,
      React.ComponentType<{ color?: string; size?: number }>
    > = {
      "map-pin": FiMapPin,
      film: FiFilm,
      plane: FaPlane,
      tree: FaTree,
      store: FaStore,
      "graduation-cap": FaGraduationCap,
      landmark: FaLandmark,
      dumbbell: FaDumbbell,
      utensils: FaUtensils,
      hospital: FaHospital,
    };

    const makeIconSrc = (name: string, color: string, size = 22) => {
      const key = `${name}-${color}-${size}`;
      if (iconCacheRef.current.has(key)) {
        return iconCacheRef.current.get(key)!;
      }
      const Cmp = iconMap[name] ?? FiMapPin;
      const svg = renderToStaticMarkup(<Cmp color={color} size={size} />);
      const src = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
      iconCacheRef.current.set(key, src);
      return src;
    };

    const featuresPoint: Feature<Point>[] = [];
    for (const location of filtered) {
      const [lon, lat] = normalizeInputCoords(location.coordinates);
      if (!isFinite(lon) || !isFinite(lat)) continue;
      const f = new Feature({
        geometry: new Point(fromLonLat([lon, lat])),
        data: location,
      });
      const color = location.color ?? "#2DB3C8";
      const src = makeIconSrc(location.icon, color, 22);
      f.setStyle(
        new Style({
          image: new Icon({ src, scale: 1 }),
        })
      );
      featuresPoint.push(f);
    }

    if (featuresPoint.length > 0)
      vectorSourceRef.current.addFeatures(featuresPoint);

    const srcForFit = vectorSourceRef.current;
    if (srcForFit && srcForFit.getFeatures().length > 0) {
      const extent = srcForFit.getExtent();
      if (extent && isFinite(extent[0])) {
        mapRef.current!.getView().fit(extent, {
          padding: [40, 40, 40, 40],
          duration: 250,
          maxZoom: 11,
        });
      }
    }
  }, [filtered]);

  return (
    <div className="overflow-hidden relative">
      <span className="block rounded-full absolute w-[200px] h-[200px] bg-gradient-to-br from-[#BDDAFF] to-[#D3ABF440] blur-[150px] top-[-250px] right-[400px]" />
      <span className="block rounded-full absolute w-[200px] h-[200px] bg-gradient-to-br from-[#BDDAFF] to-[#D3ABF440] blur-[150px] bottom-[-200px] left-[-150px]" />
      <div className="card">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-montserrat font-bold font-size-xl text-white">
            Mapa de Clientes
          </h3>

          <div className="flex gap-2">
            <select
              className="select-filter"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            >
              {placeOptions.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            <select
              className="select-filter"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {isLoadingMapLocations ? (
          <div className="relative h-[200px] 2xl:h-[260px] rounded-xl overflow-hidden">
            <Skeleton className="w-full h-full bg-white/10" />
          </div>
        ) : (
          <div
            ref={containerRef}
            className="h-[200px] 2xl:h-[260px] w-full rounded-xl overflow-hidden shadow-inner bg-[#0a0f1c] relative"
          >
            <div className="absolute inset-0 pointer-events-none bg-blue-900/10 mix-blend-overlay" />
          </div>
        )}
      </div>
    </div>
  );
}
