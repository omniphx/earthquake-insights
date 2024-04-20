export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-900 text-white py-4 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Earthquake Map</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium" htmlFor="longitude">
                Longitude:
              </label>
              <input
                className="bg-gray-700 text-white px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="longitude"
                placeholder="-122.4194"
                type="number"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium" htmlFor="latitude">
                Latitude:
              </label>
              <input
                className="bg-gray-700 text-white px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="latitude"
                placeholder="37.7749"
                type="number"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium" htmlFor="coordinates">
                Coordinates:
              </label>
              <input
                className="bg-gray-700 text-white px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="coordinates"
                placeholder="37.7749, -122.4194"
                type="text"
              />
            </div>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md">
              Refresh
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
              Toggle Layers
            </button>
          </div>
        </div>
      </header>
      <div className="flex-1 relative" />
    </div>
  );
}
