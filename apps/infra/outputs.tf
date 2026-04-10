# ============================================================================
# General Outputs
# ============================================================================

output "environment" {
  description = "Runtime environment (e.g., dev, prod)"
  value       = local.env
}

# ============================================================================
# Application Outputs
# ============================================================================

output "web_url" {
  description = "Web app URL"
  value       = aws_cloudfront_distribution.web_distribution.domain_name
}

output "api_url" {
  description = "API endpoint URL"
  value       = aws_api_gateway_stage.api_stage.invoke_url
}

output "oidc_client_id" {
  description = "OIDC Client ID"
  value       = aws_cognito_user_pool_client.user_pool_client.id
}

output "oidc_authority" {
  description = "OIDC Authority"
  value       = aws_cognito_user_pool_domain.user_pool_domain.domain
}

# ============================================================================
# For deployment (web, api)
# ============================================================================

output "ci_role_arn" {
  description = "IAM role ARN for CI/CD deployment (GitHub Actions)"
  value       = aws_iam_role.ci_role.arn
}

output "api_lambda_function" {
  description = "API Lambda function name"
  value       = module.api_handler.function_name
}

output "app_bucket" {
  description = "S3 bucket for application storage"
  value       = aws_s3_bucket.app_bucket.bucket
}

output "web_distribution" {
  description = "CloudFront distribution for web application"
  value       = aws_cloudfront_distribution.web_distribution.id
}

