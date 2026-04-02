# Keycloak Configuration

This folder contains the Keycloak realm configuration for local development.

## Contents

- `notebook-realm.json` - Keycloak realm definition with users and clients

## How It Works

When the Keycloak container starts with the `--import-realm` flag, it automatically imports the realm configuration from this directory. This sets up:

1. **Realm**: `notebook`
2. **Admin User**: `admin` / `admin`
3. **Test User**: `testuser` / `password123`
4. **OAuth Client**: `notebook-web`

## Realm Configuration

### notebook-web Client

The client is configured for local development with:

- **Client ID**: `notebook-web`
- **Client Secret**: `notebook-local-secret-dev` (use for server-side auth flows)
- **Protocol**: OpenID Connect
- **Client Type**: Confidential (requires client secret)
- **Redirect URIs**:
  - `http://localhost:5173/*` (Vite dev server)
  - `http://localhost:3000/*` (Alternative dev server)
- **Web Origins**:
  - `http://localhost:5173`
  - `http://localhost:3000`
- **Flows**: Standard, Implicit, and Direct Access Grant flows enabled

## Usage

### Test User Credentials

- **Username**: `testuser`
- **Password**: `password123`

### Client Credentials (for server-to-server auth)

- **Client ID**: `notebook-web`
- **Client Secret**: `notebook-local-secret-dev`

## Accessing Keycloak

- **Admin Console**: `http://localhost:8080/admin`
- **Realm**: `http://localhost:8080/realms/notebook`

## Modifying Configuration

To change the realm configuration, edit `notebook-realm.json` and restart the container:

```bash
docker-compose down -v
docker-compose up -d
```

The `-v` flag removes volumes to ensure a fresh import of the realm configuration.
