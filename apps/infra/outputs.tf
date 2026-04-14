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
