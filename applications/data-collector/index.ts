import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const earthquakes = await fetch(
    "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2024-01-01&endtime=2024-04-14&latitude=37.774929&longitude=-122.419418&maxradiuskm=13"
  ).then((res) => res.json());

  earthquakes.features.forEach(async (earthquake: any) => {
    await prisma.earthquake.upsert({
      where: {
        id: earthquake.id,
      },
      update: {},
      create: {
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
      },
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
