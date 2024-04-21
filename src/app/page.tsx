import Main from "../components/Main";

async function getData() {
  const res = await fetch(
    "/api/earthquakes/10"
    // "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  // const data = await getData();

  return <Main data={{}} />;
}
