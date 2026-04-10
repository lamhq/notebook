# ============================================================================
# API Application Lambda Function
# ============================================================================

data "archive_file" "api_handler_archive" {
  type        = "zip"
  source_file = "${path.module}/assets/api-handler.js"
  output_path = "${path.module}/assets/api-handler.zip"
}

module "api_handler" {
  source = "./modules/lambda"

  function_name = "${local.name_prefix}-api-handler"
  filename      = data.archive_file.api_handler_archive.output_path
  handler       = "lambda.handler"

  environment_variables = merge(var.api_env_vars, {
    NO_COLOR = "true"
  })
  iam_policy_statements = [] # Only needs CloudWatch logs (auto-generated in module)
}
