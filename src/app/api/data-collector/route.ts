import { EarthquakeDataGateway } from "../../../services/earthquakes/earthquakeDataGateway";
import { EarthquakeAPIService } from "../../../services/earthquakes/earthquakeAPIService";
import { Counter, Registry } from "prom-client";

const earthquakeAPIService = new EarthquakeAPIService();
const service = new EarthquakeDataGateway();

export const dataCollectorRegistry = new Registry();

const counter = new Counter({
  name: "data_collector_name",
  help: "data_collector_help",
  registers: [dataCollectorRegistry],
});

export async function GET() {
  try {
    counter.inc();

    const earthquakes = await earthquakeAPIService.getEarthquakeData();

    await service.deleteAll();
    await service.bulkCreate(earthquakes);

    return new Response(
      JSON.stringify({
        status: "success",
      }),
      {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);

    return new Response(JSON.stringify(error), {
      status: 400,
      headers: {
        "content-type": "application/json",
      },
    });
  }
}
