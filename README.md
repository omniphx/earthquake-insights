# Earthquake insights

**Data collection:**
This app will fetch earthquakes from a public USGS endpoint and store it in a postgres database.

**Data analyzer:**
It will then allow you to cluster the earthquakes by a specified number and determine that average magnitude of earthquakes that are clustered near a provided set of latitude and longitude.

## Getting started

1. Install dependencies: `npm install`
2. Spin up a postgres database: `docker-compose up`
3. In a new terminal, run migration: `npx prisma migrate dev --name init`
4. Fetch earthquakes and store in database: `npm run data:collector`
5. Run analytics server: `npm run data:analyzer`
6. Fetch results from server for a given latitude/longitude: `curl http://localhost:3001/api/earthquakes/cluster/10?lat=37.87&lon=-122.27`

TODOs

1. ~Implement postgres on vercel~
2. Unit tests
3. Documentation (README)

"B" Todos

3. Integration tests
4. Mocks/Spies
5. Github action for running unit tests
6. Production monitoring

"A" Todos

7. Event collaboration messaging
8. Continuous delivery
