export async function GET() {
  try {
    return new Response("success", {
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
