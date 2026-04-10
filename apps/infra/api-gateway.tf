# ============================================================================
# API Gateway Configuration
# ============================================================================

module "api_gateway" {
  source = "./modules/api-gateway-lambda"

  name                 = "${local.name_prefix}-api"
  user_pool_arn        = aws_cognito_user_pool.user_pool.arn
  lambda_invoke_arn    = module.api_handler.invoke_arn
  lambda_function_name = module.api_handler.function_name
}
