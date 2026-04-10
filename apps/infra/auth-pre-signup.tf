# ============================================================================
# Cognito Pre-Sign-Up Trigger Lambda
# ============================================================================

# Deployment package for Lambda functions
data "archive_file" "pre_signup_trigger_archive" {
  type        = "zip"
  source_file = "assets/pre-signup-trigger.mjs"
  output_path = "${path.module}/assets/pre-signup-trigger.zip"
}

# Lambda function for pre-signup trigger
resource "aws_lambda_function" "pre_sign_up_lambda" {
  function_name = "${local.name_prefix}-pre-signup-trigger"
  handler       = "pre-signup-trigger.handler"
  role          = aws_iam_role.pre_sign_up_role.arn
  runtime       = "nodejs22.x"
  timeout       = 10
  memory_size   = 256
  architectures = ["arm64"]

  filename         = data.archive_file.pre_signup_trigger_archive.output_path
  source_code_hash = data.archive_file.pre_signup_trigger_archive.output_base64sha256

  environment {
    variables = {
      NODE_OPTIONS = "--enable-source-maps"
    }
  }
}

# IAM role for Cognito pre-signup trigger
resource "aws_iam_role" "pre_sign_up_role" {
  name = "${local.name_prefix}-pre-signup-trigger-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# IAM policy for pre-signup trigger (inline policy)
resource "aws_iam_role_policy" "pre_sign_up_policy" {
  name = "${local.name_prefix}-pre-signup-trigger-policy"
  role = aws_iam_role.pre_sign_up_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      # Cognito User Pool
      {
        Effect = "Allow"
        Action = [
          "cognito-idp:AdminGetUser",
          "cognito-idp:AdminLinkProviderForUser"
        ]
        Resource = "${aws_cognito_user_pool.user_pool.arn}"
      },
      # CloudWatch logging
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "${aws_cloudwatch_log_group.pre_sign_up_lambda_log_group.arn}:*"
      }
    ]
  })
}

# CloudWatch log group for pre-signup trigger Lambda
resource "aws_cloudwatch_log_group" "pre_sign_up_lambda_log_group" {
  name              = "/aws/lambda/${aws_lambda_function.pre_sign_up_lambda.function_name}"
  retention_in_days = 7
}
