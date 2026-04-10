# ============================================================================
# Cognito User Pool Configuration
# ============================================================================

module "cognito" {
  source = "./modules/cognito"

  name_prefix          = local.name_prefix
  google_client_id     = var.google_client_id
  google_client_secret = var.google_client_secret
  pre_sign_up_fn_arn   = module.pre_signup.function_arn
  pre_sign_up_fn_name  = module.pre_signup.function_name
  callback_urls = [
    "http://localhost:5173/auth/callback",
    "${var.web_url}/auth/callback"
  ]
  logout_urls = [
    "http://localhost:5173/auth/signout",
    "${var.web_url}/auth/signout"
  ]
}
