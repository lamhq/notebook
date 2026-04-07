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
resource "aws_iam_policy" "ci_policy" {
  name        = "${local.name_prefix}-ci-policy"
  description = "Permissions to deploy API and Web applications"

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
          "${aws_s3_bucket.app_bucket.arn}",
          "${aws_s3_bucket.app_bucket.arn}/*"
        ]
      },
      # CloudFront invalidation
      {
        Effect   = "Allow"
        Action   = ["cloudfront:CreateInvalidation"]
        Resource = "${aws_cloudfront_distribution.web_distribution.arn}"
      },
      # Lambda function code updates
      {
        Effect = "Allow"
        Action = [
          "lambda:UpdateFunctionCode",
          "lambda:GetFunction",
          "lambda:GetFunctionConfiguration"
        ]
        Resource = "arn:aws:lambda:${var.aws_region}:${split(":", aws_lambda_function.api_handler.arn)[4]}:function:${local.name_prefix}-*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ci_deploy_policy_attachment" {
  role       = aws_iam_role.ci_role.name
  policy_arn = aws_iam_policy.ci_policy.arn
}
