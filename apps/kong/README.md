# Kong Gateway Configuration

This directory contains the Kong API Gateway configuration and runtime files.

## Contents

- **declarative/** - Kong declarative configuration files (kong.yml)
- **tmp/** - Temporary files (generated at runtime, ignored by git)
- **prefix/** - Kong runtime prefix files (generated at runtime, ignored by git)

## How It Works

Kong runs in DB-less mode using declarative configuration. When the container starts, it loads the configuration from `declarative/kong.yml` and proxies requests according to the defined services and routes. There is no database—all configuration is stateless and file-based.

## Configuration

Kong is configured in DB-less mode using declarative configuration files. Edit `declarative/kong.yml` to define:

- **Services**: Upstream services to proxy requests to
- **Routes**: URL paths that map to services
- **Plugins**: Global or service-specific middleware (authentication, rate limiting, etc.)

## Accessing Kong

- **Admin API**: `http://localhost:8001`
- **Admin Manager UI**: `http://localhost:8002`
- **Proxy**: `http://localhost:8000` (HTTPS: `https://localhost:8443`)
