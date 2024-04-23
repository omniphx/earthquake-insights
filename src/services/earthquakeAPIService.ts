import { EarthquakeData, Feature } from "../types";

export class EarthquakeAPIService {
  public async getEarthquakeData(): Promise<Feature[]> {
    const response = await fetch(
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"
    );
    const data: EarthquakeData = await response.json();
    return data.features;
  }
}
