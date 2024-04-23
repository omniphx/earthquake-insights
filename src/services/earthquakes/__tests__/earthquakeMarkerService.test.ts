import { IClusterer, IDataGateway } from "../../../types";
import { EarthquakeMarkerService } from "../earthquakeMarkerService";

const mockClusterer: jest.Mocked<IClusterer> = {
  cluster: jest.fn(),
};

const mockDataGateway: jest.Mocked<IDataGateway> = {
  bulkCreate: jest.fn(),
  deleteAll: jest.fn(),
  findAll: jest.fn(),
};

describe(EarthquakeMarkerService.name, () => {
  describe("Initialization", () => {
    it("should initialize with clusterer and databaseGateway", () => {
      const service = new EarthquakeMarkerService(
        mockClusterer,
        mockDataGateway
      );
      expect(service).toBeDefined();
    });
  });

  describe("generateMarkers", () => {
    it("should fetch data and cluster it", async () => {
      // Mock data
      const earthquakes = [
        {
          id: "earthquake-id",
          mag: 2.5,
          place: "Location 1",
          // todo make time and updated a big int
          time: BigInt(0),
          updated: BigInt(0),
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
          longitude: 0,
          latitude: 0,
          depth: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          cluster: 0,
        },
        {
          id: "earthquake-id",
          mag: 2.5,
          place: "Location 1",
          // todo make time and updated a big int
          time: BigInt(0),
          updated: BigInt(0),
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
          longitude: 0,
          latitude: 0,
          depth: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          cluster: 0,
        },
      ];
      mockDataGateway.findAll.mockResolvedValue(earthquakes);
      mockClusterer.cluster.mockResolvedValue([0, 1] as never);

      const service = new EarthquakeMarkerService(
        mockClusterer,
        mockDataGateway
      );
      const markers = await service.generateMarkers(2);

      // Validate response
      expect(markers.length).toEqual(2);
      expect(markers[0].cluster).toEqual(0);
      expect(markers[1].cluster).toEqual(1);
    });
  });
});
