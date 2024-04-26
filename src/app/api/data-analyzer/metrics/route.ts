import { dataAnalyzerRegistry } from "../[cluster]/route";

export async function GET() {
  try {
    const dataAnalyzerMetrics = await dataAnalyzerRegistry.metrics();

    return new Response(dataAnalyzerMetrics, {
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
