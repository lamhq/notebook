# ============================================================================
# GitHub OIDC Provider and Deployment Role
# ============================================================================

module "github_oidc" {
  source = "./modules/github-oidc"

  github_owner = var.github_owner
  github_repo  = var.github_repo

  github_actions_role = "${local.name_prefix}-ci-role"

  # GitHub Actions permissions for deployment
  github_actions_permissions = [
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
        module.app_storage.bucket_arn,
        "${module.app_storage.bucket_arn}/*"
      ]
    },
    # CloudFront invalidation
    {
      Effect   = "Allow"
      Action   = ["cloudfront:CreateInvalidation"]
      Resource = [module.cloudfront.distribution_arn]
    },
    # Lambda function code updates
    {
      Effect = "Allow"
      Action = [
        "lambda:UpdateFunctionCode",
        "lambda:GetFunction",
        "lambda:GetFunctionConfiguration"
      ]
      Resource = ["${join(":", slice(split(":", module.api_handler.function_arn), 0, 6))}:${local.name_prefix}-*"]
    }
  ]
}

# ============================================================================
# GitHub CI/CD Configuration
# ============================================================================

locals {
  # .env file content for building the web app
  web_env_vars = "VITE_API_URL=/api\nVITE_OIDC_AUTHORITY=${module.cognito.user_pool_endpoint}\nVITE_OIDC_CLIENT_ID=${module.cognito.user_pool_client_id}"
}

module "github_env" {
  source = "./modules/github-env"

  repository  = var.github_repo
  environment = local.env

  variables = {
    AWS_REGION          = var.aws_region
    DEPLOYMENT_ROLE_ARN = module.github_oidc.ci_role_arn
    API_HANDLER_LAMBDA  = module.api_handler.function_name
    APP_BUCKET          = module.app_storage.bucket_name
    CF_DIST_ID          = module.cloudfront.distribution_id
    WEB_ENV_VARS        = local.web_env_vars
  }
}
