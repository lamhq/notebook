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

variable "admin_email" {
  type        = string
  description = "Email address for the initial user"
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

variable "cloudflare_zone_id" {
  type        = string
  description = "Cloudflare zone ID for the domain"
}

# ============================================================================
# MongoDB Atlas Configuration Variables
# ============================================================================

variable "mongodb_atlas_project_id" {
  type        = string
  description = "MongoDB Atlas project ID"
}


