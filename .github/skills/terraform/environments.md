# Managing Environments

## Workspaces

Terraform workspaces are used to manage infrastructure for different environments (e.g., `dev`, `staging`, `prod`). Each environment corresponds to a workspace.

The `default` workspace is for production.

## Variable Definition Files

Variable definition files (`config/*.tfvars`) are used to provide environment-specific values for deployment.

Each environment should have its own variable definition file (e.g., `config/dev.tfvars`).

Look at `config/tfvars.example` for all required variables.

## Backend Configuration

Terraform backend configuration is defined in `config/*.tfbackend` file (e.g., `config/s3.tfbackend`).

Look at `config/tfbackend.example` for all required backend configuration.

`tfvars` and `tfbackend` files should be excluded from version control because they may contain sensitive data.
