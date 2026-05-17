# Stage 1: Build the React application
FROM node:20-alpine AS build

# Set working directory inside build container
WORKDIR /app

# Copy package dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Build the production-ready static assets (output will be in /app/dist)
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the compiled production assets from Stage 1 to Nginx's public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration for React SPA routing fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (HTTP standard)
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
