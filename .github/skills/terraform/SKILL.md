---
name: terraform
description: Use when working with Terraform, IaC, managing infrastructure, writing or refactoring Terraform code, deploying applications.
---

## Deployment

Follow this step‑by‑step workflow to apply infrastructure changes:

1. Initialize Terraform by following the section **Initializing Terraform**. Do this once per project (or after adding new providers/modules).

2. Ask the user about the environment to deploy to (e.g., `dev`, `prod`). Switch to the workspace of that environment (for production environment `prod`, use the `default` workspace):

   ```bash
   terraform workspace select dev
   ```

3. Create the variable definition file for that environment (e.g., `config/dev.tfvars`) if it does not exist by copying from the example file `config/tfvars.example` and ask user to fill in the required values.

4. Preview the changes (plan):

   ```bash
   terraform plan -var-file=config/dev.tfvars
   ```

5. Summarize the changes to be applied. Ask for user confirmation before applying the changes:
   ```bash
   terraform apply -var-file=config/dev.tfvars
   ```

## Initializing Terraform

Follow these steps to initialize Terraform:

1. Create a backend configuration file `config/s3.tfbackend` if it does not exist by copying from the example file `config/tfbackend.example` and ask user to fill in the required values.

2. Run init command to initialize Terraform in the working directory. .
   ```bash
   terraform init -backend-config=config/s3.tfbackend -reconfigure -upgrade
   ```

## Project Structure

A Terraform codebase includes:

- `main.tf`: Defines the Terraform backend, providers, and local values.
- `variables.tf`: Contains all variables used in the project, with values from `*.tfvars`.
- `outputs.tf`: Lists all outputs for external systems (e.g., CI/CD pipelines) or applications (e.g., web app API endpoint URLs).
- `modules/`: Contains reusable Terraform modules, each with its own `main.tf`, `variables.tf`, and `outputs.tf`.
- Other `*.tf` files describing system components (e.g., `api-gateway.tf`, `load-balancer.tf`, `cdn.tf`) using local modules.

Here's an example of a Terraform project structure:

```
infra/
├── .gitignore
├── main.tf                # backend config, providers, locals
├── variables.tf           # Input variables
├── outputs.tf             # Outputs for external use (e.g., CI/CD pipeline, web app)
├── api-gateway.tf         # API Gateway resources
├── load-balancer.tf       # Load balancer resources
├── cdn.tf                 # CDN resources
├── storage.tf             # Object storage resources
├── database.tf            # Database resources
├── config/                # Environment-specific variable files
│   ├── tfvars.example     # Example variable definition file
│   ├── tfbackend.example  # Example backend configuration file
│   ├── staging.tfvars     # Variables for staging environment
│   └── prod.tfvars        # Variables for production environment
└── modules/               # Reusable modules
    ├── cloudfront/
    │   ├── main.tf
    │   ├── variables.tf
    │   └── outputs.tf
    ├── ec2/
    │   ├── main.tf
    │   ├── variables.tf
    │   └── outputs.tf
    ├── s3/
    │   ├── main.tf
    │   ├── variables.tf
    │   └── outputs.tf
    └── vpc/
        ├── main.tf
        ├── variables.tf
        └── outputs.tf
```

## Module Structure

A Terraform module includes `main.tf`, `variables.tf`, and `outputs.tf` (similar to the project root).

It describes reusable infrastructure resources (e.g., VPC, EC2, S3).

Each resource in a module is tightly coupled with each other. For examples:

- A Lambda function with its CloudWatch log group, IAM role, and role policy.
- An API Gateway with its stages, resources, methods, and integrations.
- A Cognito User Pool with its clients, identity providers, domain.

## Managing Environments

This project uses Terraform workspaces to manage infrastructure across multiple environments (e.g., `dev`, `staging`, `prod`).

Each environment corresponds to a workspace.

The `default` workspace is for production.

## Configuration Files

Environment-specific values are defined in `.tfvars` files (e.g., `config/dev.tfvars`).

Terraform backend configuration (e.g., S3 bucket name, DynamoDB table name) is defined in `.tfbackend` files (e.g., `config/s3.tfbackend`).

These may contain sensitive data, so exclude them from version control.

## Conventions

### File name

Name Terraform files by the system component they describe, not the technology.

Examples:

- ✅ `cdn.tf`, not ❌ `cloudfront.tf`.
- ✅ `report-storage.tf`, not ❌ `s3.tf`.
- ✅ `presignup-trigger.tf`, not ❌ `presignup-lambda.tf`.
- ✅ `user-db.tf`, not ❌ `rds.tf`.

### Resource block local name

Follow the format `{name}_{type}`:

- `name`: resource name, should reflect the resource's purpose or role (e.g., `report`, `log`, `user-api`).
- `type`: resource type, should be a single word that indicates the kind of resource (e.g., `bucket`, `role`, `lambda`, `apigtw`, `db`).

Example:

```hcl
# S3 bucket for storing reports
resource "aws_s3_bucket" "report_bucket" {
  bucket = "acme-dev-report-bucket"
}
```

### Cloud resource name

A cloud resource name is the resource's identifier in the cloud provider, assigned to a resource when it's created, and shown in the provider's console, CLI, or API.

Follow the format `{project}-{env}-{name}-{type}` to ensure uniqueness:

- `project`: short project name (e.g., `acme`, `myapp`, `ecommerce`).
- `env`: deployment environment (e.g., `dev`, `staging`, `prod`).
- `name`: resource name, should reflect the resource's purpose or role (e.g., `report`, `log`, `user-api`).
- `type`: resource type (e.g., `bucket`, `role`, `lambda`, `apigtw`, `db`).

Example:

```hcl
# S3 bucket for storing reports
resource "aws_s3_bucket" "report_bucket" {
  bucket = "acme-dev-report-bucket"
}
```

### Terraform Arguments Ordering

Order arguments in a Terraform resource block as follows:

- Put arguments that define the resource’s identity first (e.g., `name`, `bucket`, `function_name`, `role`).
- Next, list required properties for the resource to exist (e.g., `ami`, `instance_type`, `runtime`, `handler`).
- Then add arguments that connect this resource to others (e.g., `vpc_security_group_ids`, `subnet_id`, `role = aws_iam_role.lambda_role.arn`).
- Follow with optional arguments that affect behavior or configuration (e.g., `retention_in_days`, `memory_size`, `timeout`).
- Place structured blocks after simple arguments (e.g., `tags {}`, `ingress {}`, `lifecycle {}`).
- Finally, include Terraform’s special meta‑arguments (e.g., `depends_on`, `count`, `for_each`, `lifecycle`).
