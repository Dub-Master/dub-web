#!/bin/sh

# Replace placeholders in JavaScript files with environment variable values
sed -i 's,API_URL_PLACEHOLDER,'"$API_URL"',g' /usr/share/nginx/html/static/js/*.js

# Start Nginx to serve the React app
nginx -g 'daemon off;'
