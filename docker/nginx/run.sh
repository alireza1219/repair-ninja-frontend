#!/bin/sh

set -e

check_file() {
    if [ ! -f "$1" ]; then
        return 1
    fi
    return 0
}

echo "🔍 Searching for dhparams.pem..."
if ! check_file "/vol/webserver/ssl-dhparams.pem"; then
    echo "🛠️ Creating dhparams.pem..."
    echo "☕️ This can take a while, so sit back, grab a coffee, and relax while I work on it..."
    openssl dhparam -out /vol/webserver/ssl-dhparams.pem 2048
    echo "✅ dhparams.pem created successfully."
else
    echo "✅ dhparams.pem found."
fi

export host=\$host
export request_uri=\$request_uri
export uri=\$uri

echo "🔍 Searching for fullchain.pem..."
if ! check_file "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem"; then
    echo "❌ No SSL certificate found."
    envsubst </etc/nginx/default.conf.tpl >/etc/nginx/conf.d/default.conf
    echo "❌ Defaulting to HTTP."
else
    echo "✅ SSL certificate found. Enabling HTTPS..."
    envsubst </etc/nginx/default.ssl.conf.tpl >/etc/nginx/conf.d/default.conf
    echo "✅ HTTPS enabled successfully."
fi

# Start Nginx in debug mode
echo "🚀 Starting Nginx in debug mode..."
nginx-debug -g 'daemon off;'
