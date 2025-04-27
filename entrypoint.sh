#!/bin/bash

set -e  # jeśli coś pójdzie źle, kontener padnie

if [ ! -f .env ]; then
  echo "SECRET=$(head -c 32 /dev/urandom | base64)" > .env
  echo "PORT=9000" >> .env
  echo ".env file generated."
else
  echo ".env file already exists, skipping generation."
fi

exec "$@"