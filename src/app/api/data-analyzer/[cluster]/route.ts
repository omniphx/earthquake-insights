import { NextRequest } from "next/server";
import { EarthquakeDataGateway } from "../../../../services/earthquakes/earthquakeDataGateway";
import { EarthquakeMarkerService } from "../../../../services/earthquakes/earthquakeMarkerService";
import { KMeansClusterer } from "../../../../services/clustering-support/kMeansClusterer";
import { Counter, Registry } from "prom-client";

const clusterer = new KMeansClusterer();
const dataGateway = new EarthquakeDataGateway();
const markerService = new EarthquakeMarkerService(clusterer, dataGateway);

type Params = {
  lat: string;
  lon: string;
  cluster: string;
};

export const dataAnalyzerRegistry = new Registry();

const counter = new Counter({
  name: "data_analyzer_name",
  help: "data_analyzer_help",
  registers: [dataAnalyzerRegistry],
});

export async function GET(req: NextRequest, context: { params: Params }) {
  try {
    counter.inc();
    const clusterSize = parseInt(context.params.cluster);
    const result = await markerService.generateMarkers(clusterSize);

    return new Response(
      JSON.stringify({
        status: "success",
        earthquakeMarkers: result,
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
