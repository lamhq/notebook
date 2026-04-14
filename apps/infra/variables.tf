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

variable "github_repo_id" {
  description = "GitHub repository the project. Required for CI/CD"
  type        = string
  default     = "github-username/repository-name"
}

variable "github_oidc_provider_arn" {
  type        = string
  description = "ARN of GitHub OIDC provider"
  default     = "arn:aws:iam::{account-id}:oidc-provider/token.actions.githubusercontent.com"
}
