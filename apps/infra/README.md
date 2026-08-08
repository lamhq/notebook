# Notebook Infrastructure

This repository contains the infrastructure code for the Notebook project, using Terraform to provision and manage AWS resources, MongoDB Atlas clusters, Cloudflare DNS, GitHub repositories, and CI/CD pipelines.

## Project Structure

This Terraform codebase includes:

- `main.tf`: Defines the Terraform backend, providers, and local values.
- `variables.tf`: Contains all variables used in the project, with values from `*.tfvars`.
- `outputs.tf`: Lists all outputs for external systems (e.g., CI/CD pipelines) or applications (e.g., web app API endpoint URLs).
- `modules/`: Contains reusable Terraform modules, each with its own `main.tf`, `variables.tf`, and `outputs.tf`.
- `*.tf` files describing system components (e.g., `api-gateway.tf`, `cdn.tf`, `database.tf`) using local modules.
- `config/`: Environment-specific configuration files and Terraform backend configuration.
- `assets/`: Lambda function code and static assets (HTML, JavaScript).

```
infra/
├── .gitignore
├── main.tf                    # Backend config, providers, locals
├── variables.tf               # Input variables
├── outputs.tf                 # Outputs for external use
├── api-gateway.tf             # API Gateway resources
├── api-service.tf             # API service resources
├── cdn.tf                     # CDN/CloudFront resources
├── storage.tf                 # S3 and storage resources
├── database.tf                # MongoDB and database resources
├── domain.tf                  # Domain and Route53 resources
├── identity-provider.tf       # Identity provider resources
├── cicd.tf                    # CI/CD pipeline resources
├── pre-signup-trigger.tf      # Cognito pre-signup trigger resources
├── package.json               # Node.js package configuration
├── README.md                  # This file
├── config/                    # Environment-specific variable files
│   ├── tfvars.example         # Example variable definition file
│   ├── tfbackend.example      # Example backend configuration file
│   ├── dev.tfvars             # Variables for dev environment
│   ├── prod.tfvars            # Variables for production environment
│   └── s3.tfbackend           # S3 backend configuration
├── assets/                    # Lambda function code and static assets
│   ├── api-handler.js         # API handler Lambda function
│   ├── api-handler.zip        # Packaged API handler
│   ├── pre-signup-trigger.mjs # Cognito pre-signup trigger function
│   ├── pre-signup-trigger.zip # Packaged pre-signup trigger
│   └── index.html             # Static HTML asset
└── modules/                   # Reusable modules
    ├── cloudfront/            # CloudFront distribution module
    ├── cognito/               # Cognito user pool module
    ├── cognito-user/          # Cognito user creation module
    ├── domain/                # Domain management module
    ├── github-env/            # GitHub environment module
    ├── github-repo/           # GitHub repository module
    ├── github_idp/            # GitHub OIDC identity provider module
    ├── http-api/              # HTTP API Gateway module
    ├── idp_github/            # GitHub identity provider module (alternative)
    ├── lambda/                # Lambda function module
    ├── mongodb-cluster/       # MongoDB Atlas cluster module
    ├── rest-api/              # REST API Gateway module
    └── s3/                    # S3 bucket module
```

### Module Structure

A Terraform module includes `main.tf`, `variables.tf`, and `outputs.tf` (similar to the project root).

It describes reusable infrastructure resources (e.g., S3 bucket, Lambda function, Cognito user pool).

Each resource in a module is tightly coupled with each other. For examples:

- A Lambda function with its CloudWatch log group, IAM role, and role policy.
- An API Gateway with its stages, resources, methods, and integrations.
- A Cognito User Pool with its clients, identity providers, domain.

## Set up cloud services & Resources

Before you begin, ensure you have:

- An AWS account with configured credentials
- Terraform installed and configured
- `GITHUB_TOKEN` environment variable set (for managing GitHub resources)
- `CLOUDFLARE_API_TOKEN` environment variable set (for managing Cloudflare DNS)
- `MONGODB_ATLAS_PUBLIC_KEY` and `MONGODB_ATLAS_PRIVATE_KEY` environment variables set (for managing database credentials)

### 1. AWS Setup

- Create an AWS IAM OIDC provider for GitHub Actions (see `modules/github_idp/main.tf` for reference)

### 2. GitHub Setup

Create two GitHub Personal Access Tokens (PAT):

**For release-please-action:**

- Repository access: the current repository
- Permissions: Contents (read and write), Pull requests (read and write), Metadata (read), Issues (read and write)

**For Terraform:**

- Repository access: all repositories
- Permissions: Actions, Administration, Contents, Environments, Metadata, Secrets, Variables

Set the Terraform token as `GITHUB_TOKEN` environment variable.

### 3. Google Cloud Setup

- Create a Google Cloud project
- Create an OAuth 2.0 Client ID
- Note the client ID and secret for later use

### 4. Google Email Account

- Create a Google email account to be used as the first user account in the application (the app only supports Google login)

### 5. Cloudflare Setup

- Create a Cloudflare account and purchase a domain
- Generate an API token by:
  - Going to https://dash.cloudflare.com/profile/api-tokens
  - Click "Create Token" → "Edit zone DNS" template
  - Set permissions: `Zone: DNS: Edit`
  - Set zone resources: `Include: Specific zone` and select your domain
- Set the `CLOUDFLARE_API_TOKEN` environment variable with this token

### 6. MongoDB Atlas Setup

- Create a MongoDB Atlas account with Free plan
- Create an API key by:
  - Going to MongoDB Atlas dashboard
  - Under "Security" → "Project Identity & Access" → "Applications" tab
  - Click "Create Application", then "API Key"
  - In "Project Permissions", select: Project Cluster Creator, Project Network Access Manager, Project Owner, Project Cluster Manager, Project Database Access Admin
- Set `MONGODB_ATLAS_PUBLIC_KEY` and `MONGODB_ATLAS_PRIVATE_KEY` environment variables with the generated key pair

### 7. Terraform State Backend

- Create an S3 bucket to store Terraform state
- Create `config/s3.tfbackend` file with the S3 backend configuration (see `config/s3.tfbackend.example` for template)

### 8. GitHub Repository

- Create a GitHub repository using the `modules/github-repo` module (see module's README file for details)

### 9. Environment Configuration

- Create `config/prod.tfvars` with production variable values (see `apps/infra/config/tfvars.example` for template)
- Create `config/dev.tfvars` with development variable values

## Create/Update Infrastructure

All commands should be executed in the `apps/infra` directory:

```bash
cd apps/infra
```

### Initialize Terraform Backend

Initialize the Terraform backend with the S3 configuration:

```bash
terraform init -backend-config=config/s3.tfbackend
```

### Deploy to Development

```bash
terraform workspace select dev
terraform plan -var-file=config/dev.tfvars
terraform apply -var-file=config/dev.tfvars -auto-approve
```

### Deploy to Production

```bash
terraform workspace select prod
terraform plan -var-file=config/prod.tfvars
terraform apply -var-file=config/prod.tfvars -auto-approve
```

## Post-deployment setup

After creating the environment with `terraform apply`, complete these steps:

### Update Google Auth Platform

- Set **Authorized JavaScript origins** to `https://<cognito-domain>`
- Set **Authorized redirect URIs** to `https://<cognito-domain>/oauth2/idpresponse`

### Update GCP Branding

- In GCP, update Google Auth Platform / Branding
- Add the Cognito domain to the **Authorized domains** list
