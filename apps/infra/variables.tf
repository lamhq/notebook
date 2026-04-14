# ============================================================================
# Common Configuration Variables
# ============================================================================

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

# ============================================================================
# API Configuration Variables
# ============================================================================

variable "api_env_vars" {
  description = "Environment variables for the API application"
  type = object({
    DB_URI = string
  })
}

# ============================================================================
# Web Configuration Variables
# ============================================================================

variable "domain" {
  type        = string
  description = "Custom domain for the website"
}

variable "google_client_id" {
  type        = string
  description = "Google OAuth 2.0 Client ID"
}

variable "google_client_secret" {
  type        = string
  description = "Google OAuth 2.0 Client Secret"
}

# ============================================================================
# CI/CD Configuration Variables
# ============================================================================

variable "github_oidc_provider_arn" {
  type        = string
  description = "ARN of GitHub OIDC provider"
  default     = "arn:aws:iam::{account-id}:oidc-provider/token.actions.githubusercontent.com"
}

variable "github_owner" {
  type        = string
  description = "GitHub repository owner/organization"
}

variable "github_repo" {
  description = "GitHub repository name (without owner)"
  type        = string
}

# ============================================================================
# Cloudflare Configuration Variables
# ============================================================================

variable "cloudflare_api_token" {
  type        = string
  sensitive   = true
  description = "Cloudflare API token"
}

variable "cloudflare_zone_id" {
  type        = string
  description = "Cloudflare zone ID for the domain"
}
