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
