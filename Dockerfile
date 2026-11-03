# Multi-stage build for PureSite Vite React Application

# Stage 1: Build application
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# Stage 2: Production Nginx Server
FROM nginx:alpine

# Copy custom Nginx configuration for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output from Stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose standard HTTP port (Coolify Traefik reverse proxy maps this to SSL)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
