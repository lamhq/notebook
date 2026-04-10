variable "aws_region" {
  description = "AWS region where resources will be created"
  type        = string
  default     = "us-east-1"
}

variable "project" {
  description = "Project name"
  type        = string
  default     = "notebook"
}

variable "github_repo_id" {
  description = "GitHub repository the project. Required for CI/CD"
  type        = string
  default     = "github-username/repository-name"
}

# ============================================================================
# API Configuration Variables
# ============================================================================

variable "api_env_vars" {
  description = "Environment variables for the API application"
  type = object({
    DB_URI = string
  })
}

variable "google_client_id" {
  type        = string
  description = "Google OAuth 2.0 Client ID"
}

variable "google_client_secret" {
  type        = string
  description = "Google OAuth 2.0 Client Secret"
}

variable "web_url" {
  description = "URL of the web application (used for Cognito redirects)"
  type        = string
}

# ============================================================================
# CloudFront Configuration Variables
# ============================================================================

variable "web_domain" {
  type        = string
  description = "Custom domain name for the website"
}

variable "acm_certificate_arn" {
  type        = string
  description = "ARN of the SSL certificate for the web domain (stored in AWS Certificate Manager, must be in us-east-1)"
}

# ============================================================================
# Optional: External OIDC Provider (if not creating one locally)
# ============================================================================

variable "github_oidc_provider_arn" {
  type        = string
  description = "ARN of GitHub OIDC provider"
  default     = ""
}
