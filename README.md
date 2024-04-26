# Earthquake insights

**Data collection:**
This app will fetch earthquakes from a public USGS endpoint and store it in a postgres database.

**Data analyzer:**
It will then allow you to cluster the earthquakes by a specified number and determine that average magnitude of earthquakes that are clustered near a provided set of latitude and longitude.

## Getting started

1. Install dependencies: `npm install`
2. Link project with Vercel: `vercel link`
3. Fetch environment variables: `vercel env pull .env.development.local`
4. In a new terminal, run database migration: `npm run vercel-build`
5. Fetch earthquakes and store in database: `curl http://localhost:3001/api/data-collector`
6. Open app: `[npm run data:analyzer](http://localhost:3001)`

# Monitoring

1. `cd prometheus`
2. `docker build -t my-prometheus .`
3. `docker run -p 9090:9090 my-prometheus`

TODOs

1. ~Implement postgres on vercel~
2. ~Unit tests~

"B" TODOs

3. Integration tests
4. ~Mocks/Spies~
5. ~Github action for running unit tests~
6. Production monitoring

"A" TODOs

7. Event collaboration messaging
8. ~Continuous delivery~
