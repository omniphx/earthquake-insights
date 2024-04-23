import { IClusterer } from "../../../types";
import { KMeansClusterer } from "../kMeansClusterer";

describe("KMeansClusterer", () => {
  let clusterer: IClusterer;

  beforeEach(() => {
    clusterer = new KMeansClusterer();
  });

  describe("cluster", () => {
    it("returns the result of the kmeans function", () => {
      const result = clusterer.cluster(2, [
        [1, 2],
        [3, 4],
      ]);
      expect(result.length).toEqual(2);
    });
  });
});
