# ============================================================================
# API Application Lambda Function
# ============================================================================

# IAM role for API Lambda function
resource "aws_iam_role" "api_lambda_role" {
  name = "${local.name_prefix}-lambda-role"

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

# IAM policy for API Lambda function (inline policy)
resource "aws_iam_role_policy" "api_lambda_policy" {
  name = "${local.name_prefix}-lambda-policy"
  role = aws_iam_role.api_lambda_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "${aws_cloudwatch_log_group.api_log_group.arn}:*"
      }
    ]
  })
}

# Deployment package for the API
data "archive_file" "api_archive" {
  type        = "zip"
  source_file = "${path.module}/assets/api-handler.js"
  output_path = "${path.module}/assets/api-handler.zip"
}

# Lambda function for API
resource "aws_lambda_function" "api_handler" {
  function_name = "${local.name_prefix}-api-handler"
  handler       = "lambda.handler"
  role          = aws_iam_role.api_lambda_role.arn
  runtime       = "nodejs22.x"
  timeout       = 10
  memory_size   = 256

  filename         = data.archive_file.api_archive.output_path
  source_code_hash = data.archive_file.api_archive.output_base64sha256

  environment {
    variables = merge(var.api_env_vars, {
      NO_COLOR     = "true"
      NODE_OPTIONS = "--enable-source-maps"
    })
  }

  lifecycle {
    ignore_changes = [source_code_hash]
  }
}

# CloudWatch log group for API Lambda
resource "aws_cloudwatch_log_group" "api_log_group" {
  name              = "/aws/lambda/${aws_lambda_function.api_handler.function_name}"
  retention_in_days = 7
}

# Lambda permission to allow API Gateway to invoke function
resource "aws_lambda_permission" "api_gateway_invoke" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api_handler.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.api_gateway.execution_arn}/*/*"
}
