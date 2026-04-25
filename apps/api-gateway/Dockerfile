FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies using pnpm
RUN npm install -g pnpm && pnpm install

# Copy application code
COPY index.mjs .

# Expose the port
EXPOSE 4068

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4068', (r) => {if (r.statusCode !== 404) throw new Error(r.statusCode)})"

# Start the application
CMD ["node", "index.mjs"]
