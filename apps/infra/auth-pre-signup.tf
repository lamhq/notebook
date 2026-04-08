# ============================================================================
# Cognito Pre-Sign-Up Trigger Lambda
# ============================================================================

# Deployment package for Lambda functions
data "archive_file" "pre_signup_trigger_archive" {
  type        = "zip"
  source_file = "pre-signup-trigger.mjs"
  output_path = "pre-signup-trigger.zip"
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

# IAM policy for pre-signup trigger
resource "aws_iam_policy" "pre_sign_up_policy" {
  name = "${local.name_prefix}-pre-signup-trigger-policy"

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

resource "aws_iam_role_policy_attachment" "pre_sign_up_lambda_policy_attachment" {
  role       = aws_iam_role.pre_sign_up_role.name
  policy_arn = aws_iam_policy.pre_sign_up_policy.arn
}

# CloudWatch log group for pre-signup trigger Lambda
resource "aws_cloudwatch_log_group" "pre_sign_up_lambda_log_group" {
  name = "/aws/lambda/${aws_lambda_function.pre_sign_up_lambda.function_name}"
}

# Lambda permission to allow Cognito to invoke pre-signup trigger
resource "aws_lambda_permission" "cognito_invoke_pre_sign_up" {
  statement_id  = "AllowCognitoInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.pre_sign_up_lambda.function_name
  principal     = "cognito-idp.amazonaws.com"
  source_arn    = aws_cognito_user_pool.user_pool.arn
}
