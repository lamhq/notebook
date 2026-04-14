# ============================================================================
# General Outputs
# ============================================================================

output "environment" {
  description = "Runtime environment (e.g., dev, prod)"
  value       = local.env
}

output "api_url" {
  description = "API endpoint URL"
  value       = module.api_gateway.api_endpoint
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
