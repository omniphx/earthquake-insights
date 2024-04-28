# Earthquake insights

**Data collection:**
This app will fetch earthquakes from a public USGS endpoint and store it in a postgres database.

**Data analyzer:**
It will then allow you to cluster the earthquakes by a specified number and determine that average magnitude of earthquakes that are clustered near a provided set of latitude and longitude.

## Requirements

Need at least v20 of Node. If you have nvm, you can use: `nvm use --lts`

## Getting started

1. Install dependencies: `npm install`
2. Spin up a local database: `docker-composer up`
3. Run database migration: `npm run migrate:db`
4. Run vercel: `npm run dev`
5. Seed earthquake data with the data collector: `curl http://localhost:3001/api/data-collector`
6. Open app in browser: `http://localhost:3001`

## Running unit/integration tests

1. Spin up a local database: `docker-composer up`
2. Run `npm run test`

> Note: this will use credentials inside `.env.test`. This assumes you use the docker command provided. Feel free to update if you plan on using a different postgres instance.

## Monitoring

1. `cd prometheus`
2. `docker build -t my-prometheus .`
3. `docker run -p 9090:9090 my-prometheus`

## Linking environment varialbes (optional)

If you plan to deploy to vercel, you can fetch env variables with the script below:

1. Link project with Vercel: `vercel link`
2. Fetch environment variables: `vercel env pull .env.development.local`
