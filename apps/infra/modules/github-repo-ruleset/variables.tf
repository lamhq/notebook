# ============================================================================
# GitHub Repository Ruleset Module - Variables
# ============================================================================

variable "repository" {
  description = "The name of the repository to apply the ruleset to"
  type        = string
}

variable "branch" {
  description = "Branch name or pattern to apply the ruleset to (e.g., 'main', '~DEFAULT_BRANCH', '~ALL')"
  type        = string
}
