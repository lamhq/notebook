resource "aws_iam_role" "lambda" {
  name = "${var.function_name}-role"

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

resource "aws_cloudwatch_log_group" "lambda" {
  name              = "/aws/lambda/${aws_lambda_function.lambda.function_name}"
  retention_in_days = 7
}

resource "aws_iam_role_policy" "lambda" {
  name = "${var.function_name}-policy"
  role = aws_iam_role.lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = concat(
      var.iam_policy_statements,
      [
        {
          Effect = "Allow"
          Action = [
            "logs:CreateLogGroup",
            "logs:CreateLogStream",
            "logs:PutLogEvents"
          ]
          Resource = "${aws_cloudwatch_log_group.lambda.arn}:*"
        }
      ]
    )
  })
}

resource "aws_lambda_function" "lambda" {
  function_name = var.function_name
  filename      = var.filename
  handler       = var.handler
  runtime       = "nodejs22.x"
  role          = aws_iam_role.lambda.arn
  # source_code_hash intentionally omitted; code updates via CI/CD pipeline

  architectures = ["arm64"]
  memory_size   = 256
  timeout       = 10

  environment {
    variables = merge(
      {
        NODE_OPTIONS = "--enable-source-maps"
      },
      var.environment_variables
    )
  }
}
