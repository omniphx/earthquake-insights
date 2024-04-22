import { NextRequest } from "next/server";
import { EarthquakeClusterer } from "../../../../services/earthquakeClusterer";
import { EarthquakeDataGateway } from "../../../../services/earthquakeDataGateway";

const clusterer = new EarthquakeClusterer();
const service = new EarthquakeDataGateway();

async function clusterEarthquakeData(clusters: number = 25) {
  try {
    const earthquakes = await service.findAllMinMag(2);

    const inputs = earthquakes.map((d) => [d.latitude || 0, d.longitude || 0]);

    const kmeans = await clusterer.cluster(clusters, inputs);

    earthquakes.forEach(async (data, index) => {
      const cluster = kmeans.clusters[index];
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

    return { kmeans, earthquakeMarkers };
  } catch (error) {
    console.error("Error during model pretraining: ", error);
  }
}

type Params = {
  lat: string;
  lon: string;
  cluster: string;
};

export async function GET(req: NextRequest, context: { params: Params }) {
  try {
    const clusterSize = parseInt(context.params.cluster);

    const result = await clusterEarthquakeData(clusterSize);

    return new Response(
      JSON.stringify({
        status: "success",
        earthquakeMarkers: result?.earthquakeMarkers,
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
