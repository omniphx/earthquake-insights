# Earthquake insights

This app will fetch earthquakes from a public USGS endpoint and store it in a postgres database.

## Getting started

1. Install dependencies: `npm install`
2. Spin up a postgres database: `docker-composer up`
3. In a new terminal, run migration: `npx prisma migrate dev --name init`
4. Fetch earthquakes and store in database: `npx ts-node ./applications/data-collector/index.ts`
5. Verify earthquakes were stored: `npx ts-node ./applications/data-analyzer/index.t`
