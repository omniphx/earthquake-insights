import { collectDefaultMetrics, register } from "prom-client";

collectDefaultMetrics({});

export async function GET() {
  const metrics = await register.metrics();
  return new Response(metrics, {
    status: 200,
    headers: {
      "content-type": register.contentType,
    },
  });
}
