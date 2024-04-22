"use Client";

import { Marker } from "react-map-gl/maplibre";
import { EarthquakeMarker as EarthquakeMarkerType } from "../types";
import { useMemo, useRef } from "react";
import { Popup, Marker as MapLibreMarker } from "maplibre-gl";

type EarthquakeMarkerProps = {
  marker: EarthquakeMarkerType;
};

function generatePrettyColor(index: number): string {
  const hue = (index * 137) % 360; // Using 137 degrees to distribute colors evenly
  const saturation = 70; // Set saturation to 70%
  const lightness = 50; // Set lightness to 50%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export default function EarthquakeMarker({ marker }: EarthquakeMarkerProps) {
  const markerRef = useRef<MapLibreMarker>(null);

  const popup = useMemo(() => {
    return new Popup().setText(marker.title);
  }, [marker.title]);

  return (
    <Marker
      key={marker.id}
      longitude={marker.longitude || 0}
      latitude={marker.latitude || 0}
      anchor="top"
      popup={popup}
      ref={markerRef}
    >
      <div
        className="bg-blue-500 w-4 h-4 rounded-full border-2 border-white cursor-pointer"
        style={{
          backgroundColor: generatePrettyColor(marker.cluster || 0),
        }}
      />
    </Marker>
  );
}
