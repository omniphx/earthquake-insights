import { EarthquakeAPIService } from "../../services/earthquakeAPIService";
import { EarthquakeDataGateway } from "../../services/earthquakeDataGateway";

export async function main() {
  const earthquakeAPIService = new EarthquakeAPIService();
  const earthquakeDataGateway = new EarthquakeDataGateway();

  const earthquakes = await earthquakeAPIService.getEarthquakeData();

  earthquakes.forEach(async (earthquake) => {
    earthquakeDataGateway.create(earthquake);
  });
}
