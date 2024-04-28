import { EarthquakeAPIService } from "../earthquakeAPIService";

global.fetch = jest.fn();

describe(EarthquakeAPIService.name, () => {
  it("should fetch earthquake data and return features", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        type: "FeatureCollection",
        features: [
          {
            id: "1",
            properties: { mag: 2.5, place: "Location 1" },
            geometry: { coordinates: [0, 0, 0] },
          },
          {
            id: "2",
            properties: { mag: 3.0, place: "Location 2" },
            geometry: { coordinates: [1, 1, 1] },
          },
        ],
      }),
    });

    const mockFeatures = [
      {
        id: "1",
        properties: { mag: 2.5, place: "Location 1" },
        geometry: { coordinates: [0, 0, 0] },
      },
      {
        id: "2",
        properties: { mag: 3.0, place: "Location 2" },
        geometry: { coordinates: [1, 1, 1] },
      },
    ];

    const service = new EarthquakeAPIService();
    const data = await service.getEarthquakeData();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson"
    );
    expect(data).toEqual(mockFeatures);
  });
});
