import { NextRequest } from "next/server";
import { EarthquakeDataGateway } from "../../../services/earthquakeDataGateway";
import { EarthquakeAPIService } from "../../../services/earthquakeAPIService";

const earthquakeAPIService = new EarthquakeAPIService();
const service = new EarthquakeDataGateway();

export async function GET() {
  try {
    const earthquakes = await earthquakeAPIService.getEarthquakeData();

    earthquakes.forEach(async (earthquake) => {
      service.create(earthquake);
    });

    return new Response(
      JSON.stringify({
        status: "success",
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
