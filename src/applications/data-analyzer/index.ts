import express, { Request, Response } from "express";
import { EarthquakeDataGateway } from "../../services/earthquakeDataGateway";
import { EarthquakeClusterer } from "../../services/earthquakeClusterer";

const app = express();

// This is a workaround to make BigInt serializable to JSON.
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const port = 3001;

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

app.get("/api/earthquakes", async (_: Request, res: Response) => {
  try {
    const earthquakes = await service.findAll();

    res.send({ earthquakes });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.get(
  "/api/earthquakes/cluster/:clusterSize",
  async (request: Request, res: Response) => {
    try {
      const { lat, lon } = request.query; // Assuming latitude, longitude, and magnitude are passed as query parameters.
      const clusterSize = parseInt(request.params.clusterSize);

      // Validate the input or provide default values
      const latitude = parseFloat(lat as string) || 60.6323;
      const longitude = parseFloat(lon as string) || -144.3453;

      const result = await clusterEarthquakeData(clusterSize);

      const computedCluster = result?.computeInformation([
        [latitude, longitude],
      ]);

      const computedClusterIndex = computedCluster?.findIndex(
        (cluster) => cluster.size > 0
      );

      if (computedClusterIndex === undefined || computedClusterIndex === -1) {
        res.json({
          status: "failed",
          message: "No cluster found",
        });
      } else {
        const earthquakes = await service.findByCluster(computedClusterIndex);

        const averageMagnitude = earthquakes.reduce(
          (acc, curr) => acc + (curr.mag || 0),
          0
        );

        res.json({
          status: "success",
          cluster:
            "The average magnitude of earthquakes in your cluster is " +
            (averageMagnitude / earthquakes.length).toFixed(2),
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  }
);

async function startServer() {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
