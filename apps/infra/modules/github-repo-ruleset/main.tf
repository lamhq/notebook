# ============================================================================
# GitHub Repository Ruleset Module
# ============================================================================
# This module manages GitHub repository branch protection rules using rulesets:
# - Restrict updates and deletions
# - Enforce linear history
# - Require pull requests with code reviews and status checks
# - Enforce code scanning and quality checks

terraform {
  required_providers {
    github = {
      source  = "integrations/github"
      version = ">= 6.11.0"
    }
  }
}

# ============================================================================
# GitHub Repository Ruleset
# ============================================================================

resource "github_repository_ruleset" "main" {
  name        = "Enforce branch protection"
  repository  = var.repository
  target      = "branch"
  enforcement = "active"

  # Define which branches this ruleset applies to
  conditions {
    ref_name {
      include = ["refs/heads/${var.branch}"]
      exclude = []
    }
  }

  # Define the rules
  rules {
    # Prevent deletions of matching branches
    deletion = true

    # Require linear history (prevent merge commits)
    required_linear_history = true

    # Require pull request before merging
    pull_request {
      dismiss_stale_reviews_on_push     = false
      require_code_owner_review         = false
      require_last_push_approval        = false
      required_approving_review_count   = 0
      required_review_thread_resolution = false
    }

    # Require status checks to pass before merging
    required_status_checks {
      strict_required_status_checks_policy = true
      do_not_enforce_on_create             = true

      required_check {
        context = "lint"
      }

      required_check {
        context = "unit-test"
      }

      required_check {
        context = "build"
      }
    }

    # Require code scanning results
    required_code_scanning {
      required_code_scanning_tool {
        tool                      = "CodeQL"
        alerts_threshold          = "errors"
        security_alerts_threshold = "high_or_higher"
      }
    }
  }
}
