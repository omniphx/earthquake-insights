import { NextRequest } from "next/server";
import { EarthquakeClusterer } from "../../../../services/earthquakeClusterer";
import { EarthquakeDataGateway } from "../../../../services/earthquakeDataGateway";

const clusterer = new EarthquakeClusterer();
const service = new EarthquakeDataGateway();

async function clusterEarthquakeData(clusters: number = 25) {
  try {
    const earthquakes = await service.findAll();

    const inputs = earthquakes.map((d) => [d.latitude || 0, d.longitude || 0]);

    const result = await clusterer.cluster(clusters, inputs);

    earthquakes.map(async (data, index) => {
      const cluster = result.clusters[index];
      data.cluster = cluster;
      // TODO - might be faster to perform in a bulk update
      await service.update(data);
    });

    return result;
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
    const searchParams = req.nextUrl.searchParams; // Assuming latitude, longitude, and magnitude are passed as query parameters.
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const clusterSize = parseInt(context.params.cluster);

    // Validate the input or provide default values
    const latitude = parseFloat(lat as string) || 60.6323;
    const longitude = parseFloat(lon as string) || -144.3453;

    const result = await clusterEarthquakeData(clusterSize);

    const computedCluster = result?.computeInformation([[latitude, longitude]]);

    const computedClusterIndex = computedCluster?.findIndex(
      (cluster) => cluster.size > 0
    );

    if (computedClusterIndex === undefined || computedClusterIndex === -1) {
      return new Response(
        JSON.stringify({
          status: "failed",
          message: "No cluster found",
        }),
        {
          status: 400,
          headers: {
            "content-type": "application/json",
          },
        }
      );
    } else {
      const earthquakes = await service.findByCluster(computedClusterIndex);

      const averageMagnitude = earthquakes.reduce(
        (acc, curr) => acc + (curr.mag || 0),
        0
      );

      return new Response(
        JSON.stringify({
          status: "success",
          cluster:
            "The average magnitude of earthquakes in your cluster is " +
            (averageMagnitude / earthquakes.length).toFixed(2),
        }),
        {
          status: 200,
          headers: {
            "content-type": "application/json",
          },
        }
      );
    }
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
