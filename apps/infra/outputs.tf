# ============================================================================
# General Outputs
# ============================================================================

output "environment" {
  description = "Runtime environment (e.g., dev, prod)"
  value       = local.env
}

output "api_url" {
  description = "API endpoint URL"
  value       = module.api_gateway.invoke_url
}

# ============================================================================
# Environment for Web Application
# ============================================================================

output "oidc_client_id" {
  description = "OIDC Client ID"
  value       = module.cognito.user_pool_client_id
}

output "oidc_authority" {
  description = "OIDC Authority"
  value       = "https://${module.cognito.user_pool_endpoint}"
}

# ============================================================================
# For CI/CD Pipelines
# ============================================================================

output "ci_role_arn" {
  description = "IAM role to assume for deployment"
  value       = aws_iam_role.ci_role.arn
}

output "api_lambda_function" {
  description = "API Lambda function name"
  value       = module.api_handler.function_name
}

output "app_bucket" {
  description = "S3 bucket to deploy web application artifacts"
  value       = module.app_storage.bucket_name
}

output "web_distribution" {
  description = "CloudFront distribution for web application"
  value       = aws_cloudfront_distribution.web_distribution.id
}

