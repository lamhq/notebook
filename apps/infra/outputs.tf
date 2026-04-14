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

output "api_handler_function" {
  description = "The Lambda function where API app is deployed"
  value       = module.api_handler.function_name
}

output "s3_bucket" {
  description = "S3 bucket where the SPA web app is deployed"
  value       = module.app_storage.bucket_name
}

output "cf_dist_id" {
  description = "CloudFront distribution ID that serves the web app"
  value       = module.cloudfront.distribution_id
}

# ============================================================================
# DNS Validation for ACM Certificate
# ============================================================================

output "certificate_validation_record_name" {
  description = "Name of the DNS record to create to validate the certificate"
  value       = module.cloudfront.resource_record_name
}

output "certificate_validation_record_value" {
  description = "Value the DNS record needs to have"
  value       = module.cloudfront.resource_record_value
}
