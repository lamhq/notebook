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
