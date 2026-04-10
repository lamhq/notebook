---
name: terraform
description: Knowledge when working with Terraform. Use when managing infrastructure, writing Terraform code, creating modules, and deploying applications.
---

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

## Terraform Modules

A Terraform module includes `main.tf`, `variables.tf`, and `outputs.tf` (similar to the project root).

It describes reusable infrastructure resources (e.g., VPC, EC2, S3).

Each resource in a module is tightly coupled with each other. For examples:

- A Lambda function with its CloudWatch log group, IAM role, and role policy.
- An API Gateway with its stages, resources, methods, and integrations.
- A Cognito User Pool with its clients, identity providers, domain.

## Conventions

### File name

Name Terraform files by the system component they describe, not the technology.

Examples:

- ✅ `cdn.tf`, not ❌ `cloudfront.tf`.
- ✅ `report-storage.tf`, not ❌ `s3.tf`.
- ✅ `presignup-trigger.tf`, not ❌ `presignup-lambda.tf`.
- ✅ `user-db.tf`, not ❌ `rds.tf`.

### Resource local name

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

### Infrastructure object's name

An infrastructure object's name is the resource's identifier in the cloud provider, assigned to a resource when it's created, and shown in the provider's console, CLI, or API.

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

### Arguments Ordering

Order arguments in a Terraform resource block as follows:

- Put arguments that define the resource’s identity first (e.g., `name`, `bucket`, `function_name`, `role`).
- Next, list required properties for the resource to exist (e.g., `ami`, `instance_type`, `runtime`, `handler`).
- Then add arguments that connect this resource to others (e.g., `vpc_security_group_ids`, `subnet_id`, `role = aws_iam_role.lambda_role.arn`).
- Follow with optional arguments that affect behavior or configuration (e.g., `retention_in_days`, `memory_size`, `timeout`).
- Place structured blocks after simple arguments (e.g., `tags {}`, `ingress {}`, `lifecycle {}`).
- Finally, include Terraform’s special meta‑arguments (e.g., `depends_on`, `count`, `for_each`, `lifecycle`).

## Managing Environments

Use separate Terraform workspaces to manage infrastructure across multiple environments (e.g., `dev`, `staging`, `prod`) by creating a workspace for each environment.

The `default` workspace is for production.

## Config

Environment-specific values are defined in `.tfvars` files (e.g., `config/dev.tfvars`).

Terraform back

These may contain sensitive data, so exclude them from version control.

Always switch to the correct workspace and use the matching `.tfvars` file before applying changes to the infrastructure.

## Making Changes to Infrastructure

Follow this step‑by‑step workflow for making changes to infrastructure:

1. Initialize the working directory. Run this once per project (or after adding new providers/modules).

   ```bash
   terraform init
   ```

2. Format and validate your code

   ```bash
   terraform fmt
   terraform validate
   ```

3. Ask the user about the environment to deploy to (e.g., `dev`, `staging`, `prod`). Switch to the workspace of that environment (for production environment `prod`, use the `default` workspace):

   ```bash
   terraform workspace select dev
   ```

4. Preview the changes (plan):

   ```bash
   terraform plan -var-file=config/dev.tfvars
   ```

5. Summarize the changes to be applied. Ask for user confirmation before applying the changes:
   ```bash
   terraform apply -var-file=config/dev.tfvars
   ```
