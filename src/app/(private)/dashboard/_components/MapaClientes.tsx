'use client'

import { useEffect, useRef } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'
import { Style, Circle as CircleStyle, Fill, Stroke } from 'ol/style'
import XYZ from 'ol/source/XYZ'
import 'ol/ol.css'

type Client = {
  id: number
  name: string
  lat: number
  lng: number
  color: string
}

const clients: Client[] = [
  { id: 1, name: 'Cliente A', lat: -23.5505, lng: -46.6333, color: 'green' },
  { id: 2, name: 'Cliente B', lat: -23.563, lng: -46.65, color: 'blue' },
  { id: 3, name: 'Cliente C', lat: -23.57, lng: -46.62, color: 'orange' },
]

export default function MapaClientes() {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const mapInstanceRef = useRef<Map | null>(null) 

  useEffect(() => {
    if (!mapRef.current) return

    if (mapInstanceRef.current) return

    const baseLayer = new TileLayer({
      source: new XYZ({
        url: 'https://{a-d}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        attributions: '&copy; CARTO',
      }),
    })

    const vectorSource = new VectorSource()

    const colorMap: Record<string, string> = {
      green: '#10b981',
      blue: '#3b82f6',
      orange: '#f97316'
    }

    clients.forEach(client => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([client.lng, client.lat])),
        name: client.name,
      })

      feature.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 8,
            fill: new Fill({ color: colorMap[client.color] || '#cbd5e1' }),
            stroke: new Stroke({ color: '#ffffff', width: 2 }),
          }),
        })
      )

      vectorSource.addFeature(feature)
    })

    const markersLayer = new VectorLayer({
      source: vectorSource,
      zIndex: 10,
    })

    const map = new Map({
      target: mapRef.current,
      layers: [baseLayer, markersLayer],
      view: new View({
        center: fromLonLat([-46.6333, -23.5505]),
        zoom: 12,
      }),
      controls: [],
    })

    mapInstanceRef.current = map

    return () => {
      map.setTarget(undefined)
      mapInstanceRef.current = null
    }
  }, [])

  return (
    <div className="card">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-montserrat font-bold font-size-xl text-white">
          Mapa de Clientes
        </h3>

        <div className="flex gap-2">
          <select className="rounded-md bg-background px-2 py-1 text-xs text-slate-300 outline-none focus:border-blue-500">
            <option>Todos os locais</option>
          </select>
          <select className="rounded-md bg-background px-2 py-1 text-xs text-slate-300 outline-none focus:border-blue-500">
            <option>Todos os tipos</option>
          </select>
        </div>
      </div>

      <div
        ref={mapRef}
        className="h-[200px] 2xl:h-[260px] w-full rounded-xl overflow-hidden shadow-inner bg-[#0a0f1c] relative"
      >
        <div className="absolute inset-0 pointer-events-none bg-blue-900/10 mix-blend-overlay" />
      </div>
    </div>
  )
}