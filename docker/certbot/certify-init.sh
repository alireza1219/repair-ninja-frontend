#!/bin/sh

set -e

until nc -z webserver 80; do
    echo "⏳ Waiting for the webserver to be available..."
    sleep 5s
done

echo "🧩 Retrieving the certificate (ACME Challenge)..."

certbot certonly \
    --webroot \
    --webroot-path "/vol/acme/" \
    -d "$DOMAIN" \
    --email $EMAIL \
    --rsa-key-size 4096 \
    --agree-tos \
    --noninteractive
