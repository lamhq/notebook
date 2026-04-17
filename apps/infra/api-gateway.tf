# ============================================================================
# API Gateway Configuration (HTTP API)
# ============================================================================

module "api_gateway" {
  source = "./modules/http-api"

  name                 = "${local.name_prefix}-api"
  oidc_client_id       = module.cognito.user_pool_client_id
  oidc_issuer          = module.cognito.user_pool_endpoint
  lambda_function_arn  = module.api_handler.function_arn
  lambda_function_name = module.api_handler.function_name
}
