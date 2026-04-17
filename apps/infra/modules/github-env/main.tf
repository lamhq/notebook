# ============================================================================
# GitHub CI/CD Configuration Module
# ============================================================================
# This module manages GitHub Actions CI/CD configuration:
# - GitHub Actions environment
# - GitHub Actions environment variables

# GitHub provider configuration
terraform {
  required_providers {
    github = {
      source  = "integrations/github"
      version = ">= 6.11.0"
    }
  }
}

# ============================================================================
# GitHub Actions Environment & Variables
# ============================================================================

resource "github_repository_environment" "runtime_env" {
  environment = var.environment
  repository  = var.repository
}

resource "github_actions_environment_variable" "env_vars" {
  for_each = var.variables

  repository    = var.repository
  environment   = github_repository_environment.runtime_env.environment
  variable_name = each.key
  value         = each.value
}
