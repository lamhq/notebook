variable "github_repo" {
  description = "GitHub repository name"
  type        = string
}

variable "environment" {
  description = "GitHub Actions environment name (e.g., 'dev', 'staging', 'prod')"
  type        = string
}

variable "github_environment_variables" {
  description = "GitHub Actions environment variables"
  type        = map(string)
}
