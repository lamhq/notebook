output "api_id" {
  description = "The REST API ID"
  value       = aws_api_gateway_rest_api.api_gateway.id
}

output "invoke_url" {
  description = "The URL to invoke the API endpoint"
  value       = aws_api_gateway_stage.api_stage.invoke_url
}
