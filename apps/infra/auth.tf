# ============================================================================
# Cognito User Pool Configuration
# ============================================================================

# Cognito User Pool
resource "aws_cognito_user_pool" "user_pool" {
  name = "${local.name_prefix}-user-pool"

  admin_create_user_config {
    # disable user self registration
    allow_admin_create_user_only = true
  }

  lambda_config {
    pre_sign_up = aws_lambda_function.pre_sign_up_lambda.arn
  }
}

# Cognito Google Identity Provider
resource "aws_cognito_identity_provider" "google_idp" {
  user_pool_id  = aws_cognito_user_pool.user_pool.id
  provider_name = "Google"
  provider_type = "Google"

  provider_details = {
    client_id                     = var.google_client_id
    client_secret                 = var.google_client_secret
    authorize_scopes              = "openid email profile"
    attributes_url                = "https://people.googleapis.com/v1/people/me?personFields="
    attributes_url_add_attributes = true
    authorize_url                 = "https://accounts.google.com/o/oauth2/v2/auth"
    oidc_issuer                   = "https://accounts.google.com"
    token_request_method          = "POST"
    token_url                     = "https://www.googleapis.com/oauth2/v4/token"
  }

  attribute_mapping = {
    email    = "email"
    username = "sub"
  }
}

# Cognito User Pool Client
resource "aws_cognito_user_pool_client" "user_pool_client" {
  name                         = "${local.name_prefix}-user-pool-client"
  user_pool_id                 = aws_cognito_user_pool.user_pool.id
  supported_identity_providers = ["Google"]
  generate_secret              = false
  callback_urls = [
    "http://localhost:5173/auth/callback",
    "${var.api_web_url}/auth/callback"
  ]
  logout_urls = [
    "http://localhost:5173/auth/signout",
    "${var.api_web_url}/auth/signout"
  ]

  allowed_oauth_flows_user_pool_client = true
  explicit_auth_flows                  = ["ALLOW_REFRESH_TOKEN_AUTH"]
  allowed_oauth_flows                  = ["code"]
  allowed_oauth_scopes                 = ["email", "openid", "profile"]

  depends_on = [aws_cognito_identity_provider.google_idp]
}

# Cognito User Pool Domain
resource "aws_cognito_user_pool_domain" "user_pool_domain" {
  domain       = "nb1"
  user_pool_id = aws_cognito_user_pool.user_pool.id
}
