# ============================================================================
# CI/CD Role & Permissions
# ============================================================================

# IAM role for CI/CD deployment
resource "aws_iam_role" "ci_role" {
  name = "${local.name_prefix}-ci-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Principal = {
          Federated = var.github_oidc_provider_arn
        },
        Action = "sts:AssumeRoleWithWebIdentity",
        Condition = {
          StringEquals = {
            "token.actions.githubusercontent.com:aud" = "sts.amazonaws.com",
          },
          StringLike = {
            "token.actions.githubusercontent.com:sub" = "repo:${var.github_repo_id}:*"
          }
        }
      }
    ]
  })
}

# IAM policy for CI/CD deployment
resource "aws_iam_role_policy" "ci_policy" {
  name = "${local.name_prefix}-ci-policy"
  role = aws_iam_role.ci_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      # S3 artifact management
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ]
        Resource = [
          "${module.app_storage.bucket_arn}",
          "${module.app_storage.bucket_arn}/*"
        ]
      },
      # CloudFront invalidation
      {
        Effect   = "Allow"
        Action   = ["cloudfront:CreateInvalidation"]
        Resource = module.cloudfront.distribution_arn
      },
      # Lambda function code updates
      {
        Effect = "Allow"
        Action = [
          "lambda:UpdateFunctionCode",
          "lambda:GetFunction",
          "lambda:GetFunctionConfiguration"
        ]
        Resource = "${join(":", slice(split(":", module.api_handler.function_arn), 0, 6))}:${local.name_prefix}-*"
      }
    ]
  })
}
