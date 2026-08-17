# Use official lightweight Node.js 20 Alpine image
FROM node:20-alpine

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production || npm install --production

# Copy all application files
COPY . .

# Expose container port (Default 8080 for Google Cloud Run)
EXPOSE 8080

# Switch to non-root user for cloud security best practices
USER node

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/healthz || exit 1

# Start the web server
CMD ["node", "server.js"]
