import { Earthquake } from "@prisma/client";
import { KMeansResult } from "ml-kmeans/lib/KMeansResult";

export type EarthquakeData = {
  type: "FeatureCollection";
  features: Feature[];
  bbox: Number[];
};

export type Feature = {
  id: string;
  type: "Feature";
  properties: Property;
  geometry: Geometry;
};

type Property = {
  id: string;
  mag: number;
  place: string;
  time: number;
  updated: number;
  tz: number;
  url: string;
  detail: string;
  felt: number;
  cdi: number;
  mmi: number;
  alert: string;
  status: string;
  tsunami: number;
  sig: number;
  net: string;
  code: string;
  ids: string;
  sources: string;
  types: string;
  nst: number;
  dmin: number;
  rms: number;
  gap: number;
  magType: string;
  type: string;
  title: string;
};

type Geometry = {
  type: "Point";
  coordinates: [number, number, number];
};

export type EarthquakeMarker = {
  id: string;
  latitude: number;
  longitude: number;
  cluster: number;
  title: string;
  mag: number;
};

export interface IClusterer {
  cluster(clusters: number, data: number[][]): number[];
}

export interface IMarkerService {
  generateMarkers(clusters: number): Promise<EarthquakeMarker[]>;
}

export interface IDataGateway {
  bulkCreate(earthquakes: Feature[]): Promise<void>;
  deleteAll(): Promise<void>;
  findAll(): Promise<Earthquake[]>;
}
