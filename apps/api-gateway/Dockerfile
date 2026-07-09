FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package.json ./

# Install dependencies using pnpm
RUN npm install -g pnpm && pnpm install

# Copy application code
COPY index.mjs healthcheck.mjs ./

# Expose the port
EXPOSE 4068

# Start the application
CMD ["node", "index.mjs"]
