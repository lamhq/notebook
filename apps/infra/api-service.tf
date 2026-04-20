# ============================================================================
# API Application Lambda Function
# ============================================================================

data "archive_file" "api_service_code" {
  type        = "zip"
  source_file = "${path.module}/assets/api-handler.js"
  output_path = "${path.module}/assets/api-handler.zip"
}

module "api_service" {
  source = "./modules/lambda"

  name     = "${local.name_prefix}-api-handler"
  filename = data.archive_file.api_service_code.output_path
  handler  = "lambda.handler"

  environment_variables = {
    DB_URI   = module.mongodb_cluster.connection_string
    NO_COLOR = "true"
  }
  iam_policy_statements = [] # Only needs CloudWatch logs (auto-generated in module)
}
