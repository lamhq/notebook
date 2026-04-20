# GitHub Repository Module

## Description

Create a GitHub repository with branch protection, merge strategies, GitHub Actions secrets and variables.

## How it works

This module creates the following GitHub resources:

- **`github_repository`** - Creates a GitHub repository with configured pull request settings:
  - Merge commits and rebase merges are disabled to maintain a clean commit history.
  - Allow squash merging with PR title as commit message
  - Always suggest updating pull request branches
  - Allow auto-merge
  - Automatically delete head branches after merge
  - Suggest updating PR when new changes in the base branch
- **`github_branch_default`** - Sets the default branch for the repository
- **`github_repository_ruleset`** - Creates a branch protection ruleset that enforces:
  - **Restrict deletions**: Prevents deletion of the default branch
  - **Linear History**: Requires a linear commit history (prevents merge commits)
  - **Pull Request Required**: All changes must go through a pull request
  - **Status Checks Required**:
    - `lint` - Code linting checks must pass
    - `unit-test` - Unit tests must pass
    - `build` - Build must succeed
  - **Require code scanning results**: Ensures code scanning results are required before merging
  - **Auto-merge Enabled**: Allows automatic merging when all status checks pass
- **`github_actions_secret`** (optional) - Creates repository secrets for GitHub Actions
- **`github_actions_variable`** (optional) - Creates repository variables for GitHub Actions

## Example Usage

How to create the repository for this project:

```hcl
module "github_repo" {
  source = "./modules/github-repo"

  name            = "notebook"
  description     = "Notebook repository"
  default_branch  = "main"
  private         = false

  secrets = [
    {
      name  = "RELEASE_ACTION_TOKEN"
      value = var.github_release_token
    }
  ]

  variables = [
  ]
}
```
