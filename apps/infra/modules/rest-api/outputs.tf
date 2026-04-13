output "api_id" {
  description = "API ID"
  value       = aws_api_gateway_rest_api.api_gateway.id
}

output "invoke_url" {
  description = "API invoke URL"
  value       = aws_api_gateway_stage.api_stage.invoke_url
}
