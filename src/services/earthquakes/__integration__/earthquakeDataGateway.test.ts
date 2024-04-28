import { Feature } from "../../../types";
import { EarthquakeDataGateway } from "../earthquakeDataGateway";

const testRecord: Feature = {
  id: "earthquake-id",
  type: "Feature",
  properties: {
    id: "earthquake-id",
    mag: 2.5,
    place: "Location 1",
    time: 0,
    updated: 0,
    tz: 0,
    url: "url",
    detail: "detail",
    felt: 0,
    cdi: 0,
    mmi: 0,
    alert: "alert",
    status: "status",
    tsunami: 0,
    sig: 0,
    net: "net",
    code: "code",
    ids: "ids",
    sources: "sources",
    types: "types",
    nst: 0,
    dmin: 0,
    rms: 0,
    gap: 0,
    magType: "magType",
    type: "type",
    title: "title",
  },
  geometry: {
    type: "Point",
    coordinates: [0, 0, 0],
  },
};

describe(EarthquakeDataGateway.name, () => {
  const service = new EarthquakeDataGateway();

  beforeAll(async () => {
    await service.deleteAll();
  });

  it("should create a record", async () => {
    await service.bulkCreate([testRecord]);

    const result = await service.findAll();
    expect(result).toHaveLength(1);
  });

  it("should should delete all records", async () => {
    await service.deleteAll();
    const result = await service.findAll();
    expect(result).toHaveLength(0);
  });
});
