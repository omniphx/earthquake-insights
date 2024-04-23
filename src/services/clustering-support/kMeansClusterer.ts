import { kmeans } from "ml-kmeans";
import { IClusterer } from "../../types";

export class KMeansClusterer implements IClusterer {
  private getCenters(n: number, data: number[][]) {
    if (data.length < n) throw new Error("Not enough data to cluster");

    let centers = [];
    let usedIndices = new Set<number>();

    while (centers.length < n) {
      let randomIndex = Math.floor(Math.random() * data.length);
      if (!usedIndices.has(randomIndex)) {
        centers.push(data[randomIndex]);
        usedIndices.add(randomIndex);
      }
    }

    return centers;
  }

  public cluster(clusters: number, data: number[][]) {
    const result = kmeans(data, clusters, {
      initialization: this.getCenters(clusters, data),
    });

    return result;
  }
}
