# ============================================================================
# GitHub CI/CD Configuration Module
# ============================================================================
# This module manages GitHub Actions CI/CD configuration:
# - GitHub Actions environment
# - GitHub Actions environment variables
# - Deployment protection rules (branch and tag restrictions)

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

# ============================================================================
# Deployment Branch & Tag Restrictions
# ============================================================================

resource "github_repository_environment_deployment_policy" "deployment_policy" {
  for_each = {
    for idx, policy in var.deployment_policies :
    "${policy.type}-${idx}" => policy
  }

  repository     = var.repository
  environment    = github_repository_environment.runtime_env.environment
  branch_pattern = each.value.type == "branch" ? each.value.name_pattern : null
  tag_pattern    = each.value.type == "tag" ? each.value.name_pattern : null
}
