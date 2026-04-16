# Terraform Coding Conventions

## File name

Name Terraform files in the root module by the system component they describe, not the technology.

Examples:

- ✅ `cdn.tf`, not ❌ `cloudfront.tf`.
- ✅ `report-storage.tf`, not ❌ `s3.tf`.
- ✅ `presignup-trigger.tf`, not ❌ `presignup-lambda.tf`.
- ✅ `user-db.tf`, not ❌ `rds.tf`.

## Resource block name

Follow the format `{name}_{type}`:

- `name`: resource name, should reflect the resource's purpose or role (e.g., `report`, `log`, `user-api`).
- `type`: resource type, should be a single word that indicates the kind of resource (e.g., `bucket`, `role`, `lambda`, `apigtw`, `db`).

In below example, `report_bucket` is the name of the S3 resource block:

```hcl
# S3 bucket for storing reports
resource "aws_s3_bucket" "report_bucket" {
  bucket = "acme-dev-report-bucket"
}
```

## Cloud resource name

A cloud resource name is the resource's identifier in the cloud provider, assigned to a resource when it's created, and shown in the provider's console, CLI, or API.

Follow the format `{project}-{env}-{name}-{type}` to ensure uniqueness:

- `project`: short project name (e.g., `acme`, `myapp`, `ecommerce`).
- `env`: deployment environment (e.g., `dev`, `staging`, `prod`).
- `name`: resource name, should reflect the resource's purpose or role (e.g., `report`, `log`, `user-api`).
- `type`: resource type (e.g., `bucket`, `role`, `lambda`, `apigtw`, `db`).

In below example, `acme-dev-report-bucket` is the name of the S3 bucket:

```hcl
# S3 bucket for storing reports
resource "aws_s3_bucket" "report_bucket" {
  bucket = "acme-dev-report-bucket"
}
```

## Arguments Order in a Resource Block

Order arguments in a Terraform resource block as follows:

- Put arguments that define the resource’s identity first (e.g., `name`, `bucket`, `function_name`, `role`).
- Next, list required properties for the resource to exist (e.g., `ami`, `instance_type`, `runtime`, `handler`).
- Then add arguments that connect this resource to others (e.g., `vpc_security_group_ids`, `subnet_id`, `role = aws_iam_role.lambda_role.arn`).
- Follow with optional arguments that affect behavior or configuration (e.g., `retention_in_days`, `memory_size`, `timeout`).
- Place structured blocks after simple arguments (e.g., `tags {}`, `ingress {}`, `lifecycle {}`).
- Finally, include Terraform’s special meta‑arguments (e.g., `depends_on`, `count`, `for_each`, `lifecycle`).
