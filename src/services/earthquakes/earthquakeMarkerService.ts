import { IClusterer, IDataGateway } from "../../types";

export class EarthquakeMarkerService {
  private clusterer: IClusterer;
  private databaseGateway: IDataGateway;

  constructor(clusterer: IClusterer, databaseGateway: IDataGateway) {
    this.clusterer = clusterer;
    this.databaseGateway = databaseGateway;
  }

  public async generateMarkers(clusterSize: number) {
    const earthquakes = await this.databaseGateway.findAll();
    const inputs = earthquakes.map((d) => [d.latitude || 0, d.longitude || 0]);
    const clusters = await this.clusterer.cluster(clusterSize, inputs);

    earthquakes.forEach(async (data, index) => {
      const cluster = clusters[index];
      data.cluster = cluster;
    });

    const earthquakeMarkers = earthquakes.map((d) => ({
      id: d.id,
      latitude: d.latitude,
      longitude: d.longitude,
      cluster: d.cluster,
      title: d.title,
      mag: d.mag,
    }));

    return earthquakeMarkers;
  }
}
