# ============================================================================
# CI/CD Role & Permissions
# ============================================================================

# IAM role Deployment
resource "aws_iam_role" "ci_role" {
  name = "${local.name_prefix}-ci-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Federated = var.github_oidc_provider_arn
        },
        Action = "sts:AssumeRoleWithWebIdentity",
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com",
          },
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:${var.github_owner}/${var.github_repo}:*"
          }
        }
      }
    ]
  })
}

# IAM policy for Deployment
resource "aws_iam_role_policy" "ci_policy" {
  name = "${local.name_prefix}-ci-policy"
  role = aws_iam_role.ci_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      # S3 artifact management
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ]
        Resource = [
          "${module.app_storage.bucket_arn}",
          "${module.app_storage.bucket_arn}/*"
        ]
      },
      # CloudFront invalidation
      {
        Effect   = "Allow"
        Action   = ["cloudfront:CreateInvalidation"]
        Resource = module.cloudfront.distribution_arn
      },
      # Lambda function code updates
      {
        Effect = "Allow"
        Action = [
          "lambda:UpdateFunctionCode",
          "lambda:GetFunction",
          "lambda:GetFunctionConfiguration"
        ]
        Resource = "${join(":", slice(split(":", module.api_handler.function_arn), 0, 6))}:${local.name_prefix}-*"
      }
    ]
  })
}

# ============================================================================
# GitHub Actions Environment & Variables
# ============================================================================

# Create GitHub Actions environment for deployment
resource "github_repository_environment" "runtime_env" {
  environment = local.env
  repository  = var.github_repo
}

# Build web app environment variables string
locals {
  web_env_vars = "VITE_API_URL=/api\nVITE_OIDC_AUTHORITY=${module.cognito.user_pool_endpoint}\nVITE_OIDC_CLIENT_ID=${module.cognito.user_pool_client_id}"
}

# AWS Region
resource "github_actions_environment_variable" "aws_region" {
  repository    = var.github_repo
  environment   = github_repository_environment.runtime_env.environment
  variable_name = "AWS_REGION"
  value         = var.aws_region
}

# Deployment Role ARN
resource "github_actions_environment_variable" "deployment_role_arn" {
  repository    = var.github_repo
  environment   = github_repository_environment.runtime_env.environment
  variable_name = "DEPLOYMENT_ROLE_ARN"
  value         = aws_iam_role.ci_role.arn
}

# API Handler Lambda Function Name
resource "github_actions_environment_variable" "api_handler_lambda" {
  repository    = var.github_repo
  environment   = github_repository_environment.runtime_env.environment
  variable_name = "API_HANDLER_LAMBDA"
  value         = module.api_handler.function_name
}

# Web App S3 Bucket
resource "github_actions_environment_variable" "app_bucket" {
  repository    = var.github_repo
  environment   = github_repository_environment.runtime_env.environment
  variable_name = "APP_BUCKET"
  value         = module.app_storage.bucket_name
}

# CloudFront Distribution ID
resource "github_actions_environment_variable" "cf_dist_id" {
  repository    = var.github_repo
  environment   = github_repository_environment.runtime_env.environment
  variable_name = "CF_DIST_ID"
  value         = module.cloudfront.distribution_id
}

# Web App Environment Variables
resource "github_actions_environment_variable" "web_env_vars" {
  repository    = var.github_repo
  environment   = github_repository_environment.runtime_env.environment
  variable_name = "WEB_ENV_VARS"
  value         = local.web_env_vars
}
