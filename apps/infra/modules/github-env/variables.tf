variable "repository" {
  description = "GitHub repository name"
  type        = string
}

variable "environment" {
  description = "GitHub Actions environment name (e.g., 'dev', 'staging', 'prod')"
  type        = string
}

variable "variables" {
  description = "GitHub Actions environment variables"
  type        = map(string)
}

variable "deployment_policies" {
  description = "Branch and tag patterns allowed to deploy to this environment (e.g., 'main', 'api-v*')"
  type = optional(list(object({
    name_pattern = string
    type         = optional(string, "branch")  # or "tag" for release tags
  })), [])
  default = []
