"use client";

import { useMutation } from "@tanstack/react-query";
import Map from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { EarthquakeMarker as EarthquakeMarkerType } from "../types";
import EarthquakeMarker from "./EarthquakeMarker";
import { useState } from "react";

export default function Main() {
  const [clusters, setClusters] = useState(10);
  const { data, mutate, isPending } = useMutation({
    mutationKey: ["earthquakes"],
    mutationFn: async () => {
      const result = await fetch(`/api/data-analyzer/${clusters}`);
      return result.json();
    },
  });

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-900 text-white py-4 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            Cluster Recent Earthquakes with KMeans (min. 3 magnitude)
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium" htmlFor="coordinates">
                Number of clusters:
              </label>
              <input
                className="bg-gray-700 text-white px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="coordinates"
                placeholder="10"
                type="text"
                value={clusters}
                onChange={(e) => {
                  setClusters(parseInt(e.target.value));
                }}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={() => mutate()}
            >
              {isPending ? "Clusterizing..." : "Clusterize"}
            </button>
          </div>
        </div>
      </header>
      <div className="flex-1 relative">
        <Map
          initialViewState={{
            longitude: -122.4,
            latitude: 37.8,
            zoom: 1,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="https://api.maptiler.com/maps/streets/style.json?key=lSbCSmszdnWZB1HfjEl5"
        >
          {data?.earthquakeMarkers?.map((marker: EarthquakeMarkerType) => (
            <EarthquakeMarker key={marker.id} marker={marker} />
          ))}
        </Map>
      </div>
    </div>
  );
}
