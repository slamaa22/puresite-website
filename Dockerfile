# Multi-stage build for PureSite Vite React Application

# Stage 1: Build application
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build (accept optional Coolify build-time analytics variables)
COPY . .
ARG VITE_UMAMI_WEBSITE_ID=""
ARG VITE_UMAMI_SCRIPT_URL="https://cloud.umami.is/script.js"
ENV VITE_UMAMI_WEBSITE_ID=$VITE_UMAMI_WEBSITE_ID
ENV VITE_UMAMI_SCRIPT_URL=$VITE_UMAMI_SCRIPT_URL
RUN npm run build

# Stage 2: Production Nginx Server
FROM nginx:alpine

# Copy custom Nginx configuration for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output from Stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Generate /env-config.json at container startup so Coolify runtime env vars work without rebuilds
RUN printf '#!/bin/sh\ncat <<EOF > /usr/share/nginx/html/env-config.json\n{\n  "umamiWebsiteId": "%s",\n  "umamiScriptUrl": "%s"\n}\nEOF\n' \
  '${VITE_UMAMI_WEBSITE_ID:-${UMAMI_WEBSITE_ID:-}}' \
  '${VITE_UMAMI_SCRIPT_URL:-${UMAMI_SCRIPT_URL:-https://cloud.umami.is/script.js}}' \
  > /docker-entrypoint.d/40-puresite-env.sh && chmod +x /docker-entrypoint.d/40-puresite-env.sh

# Expose standard HTTP port (Coolify Traefik reverse proxy maps this to SSL)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
