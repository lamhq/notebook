FROM node:22-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy configuration files to /app
COPY ./package.json ./nest-cli.json ./tsconfig.json ./

# Copy the src/ directory into /app/src
COPY ./src ./src

# Install all dependencies
RUN pnpm install --config.dangerouslyAllowAllBuilds=true

# Expose the dev port
EXPOSE 4069

# Start the app in dev mode
CMD ["pnpm", "run", "dev"]
