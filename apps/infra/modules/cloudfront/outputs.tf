output "distribution_id" {
  description = "CloudFront distribution ID"
  value       = aws_cloudfront_distribution.web_distribution.id
}

output "distribution_arn" {
  description = "CloudFront distribution ARN"
  value       = aws_cloudfront_distribution.web_distribution.arn
}
