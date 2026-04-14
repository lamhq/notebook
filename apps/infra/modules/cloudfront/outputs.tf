output "distribution_id" {
  description = "CloudFront distribution ID"
  value       = aws_cloudfront_distribution.cdn_distribution.id
}

output "distribution_arn" {
  description = "CloudFront distribution ARN"
  value       = aws_cloudfront_distribution.cdn_distribution.arn
}

output "distribution_domain" {
  description = "CloudFront distribution domain name"
  value       = aws_cloudfront_distribution.cdn_distribution.domain_name
}

output "resource_record_name" {
  description = "Name of the DNS record to create to validate the certificate"
  value       = one(aws_acm_certificate.domain_cert.domain_validation_options[*].resource_record_name)
}

output "resource_record_value" {
  description = "Value the DNS record needs to have"
  value       = one(aws_acm_certificate.domain_cert.domain_validation_options[*].resource_record_value)
}
