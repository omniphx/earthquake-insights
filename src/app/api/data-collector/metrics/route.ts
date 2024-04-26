import { dataCollectorRegistry } from "../route";

export async function GET() {
  try {
    const dataCollectorMetrics = await dataCollectorRegistry.metrics();

    return new Response(dataCollectorMetrics, {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    });
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
