#!/usr/bin/env bash

echo "Sourcing .env file"
source .env

echo $POSTGRES_URL
echo $POSTGRES_URL_NON_POOLING

export POSTGRES_URL
export POSTGRES_URL_NON_POOLING

npx prisma migrate dev --name init