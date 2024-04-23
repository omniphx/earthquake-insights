import { Earthquake, PrismaClient } from "@prisma/client";
import { Feature, IDataGateway } from "../../types";

const prisma = new PrismaClient();

export class EarthquakeDataGateway implements IDataGateway {
  public async bulkCreate(earthquakes: Feature[]): Promise<void> {
    try {
      await prisma.earthquake.createMany({
        data: earthquakes.map((earthquake) => ({
          id: earthquake.id,
          mag: earthquake.properties.mag,
          place: earthquake.properties.place,
          time: earthquake.properties.time,
          updated: earthquake.properties.updated,
          tz: earthquake.properties.tz,
          url: earthquake.properties.url,
          detail: earthquake.properties.detail,
          felt: earthquake.properties.felt,
          cdi: earthquake.properties.cdi,
          mmi: earthquake.properties.mmi,
          alert: earthquake.properties.alert,
          status: earthquake.properties.status,
          tsunami: earthquake.properties.tsunami,
          sig: earthquake.properties.sig,
          net: earthquake.properties.net,
          code: earthquake.properties.code,
          ids: earthquake.properties.ids,
          sources: earthquake.properties.sources,
          types: earthquake.properties.types,
          nst: earthquake.properties.nst,
          dmin: earthquake.properties.dmin,
          rms: earthquake.properties.rms,
          gap: earthquake.properties.gap,
          magType: earthquake.properties.magType,
          type: earthquake.properties.type,
          title: earthquake.properties.title,
          longitude: earthquake.geometry.coordinates[0],
          latitude: earthquake.geometry.coordinates[1],
          depth: earthquake.geometry.coordinates[2],
          createdAt: new Date(),
          updatedAt: new Date(),
        })),
      });
    } catch (error) {
      console.error(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  public async deleteAll(): Promise<void> {
    try {
      await prisma.earthquake.deleteMany();
    } catch (error) {
      console.error(error);
    } finally {
      await prisma.$disconnect();
    }
  }

  public async findAll(): Promise<Earthquake[]> {
    let earthquakes: Earthquake[] = [];
    try {
      earthquakes = await prisma.earthquake.findMany();
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch earthquakes");
    } finally {
      await prisma.$disconnect();
      return earthquakes;
    }
  }
}
