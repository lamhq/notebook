variable "name_prefix" {
  description = "Prefix for resource names"
  type        = string
}

variable "domain" {
  description = "Custom domain name for the website"
  type        = string
}

variable "domain_cert" {
  description = "ARN of the SSL certificate for the web domain (must be in us-east-1)"
  type        = string
}

variable "s3_bucket_domain" {
  description = "S3 bucket regional domain name"
  type        = string
}

variable "s3_bucket_id" {
  description = "S3 bucket ID"
  type        = string
}

variable "s3_bucket_arn" {
  description = "S3 bucket ARN"
  type        = string
}

variable "s3_bucket_path" {
  description = "S3 bucket path for web static files"
  type        = string
  default     = "web"
}

variable "api_domain" {
  description = "API Gateway domain name (e.g., xxx.execute-api.region.amazonaws.com)"
  type        = string
}
