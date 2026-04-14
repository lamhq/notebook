output "api_id" {
  description = "HTTP API ID"
  value       = aws_apigatewayv2_api.http_api.id
}

output "invoke_url" {
  description = "HTTP API invoke URL"
  value       = aws_apigatewayv2_stage.default.invoke_url
}
