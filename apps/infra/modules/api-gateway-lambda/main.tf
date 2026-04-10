# ============================================================================
# API Gateway Lambda Integration Module
# ============================================================================

# API Gateway REST API
resource "aws_api_gateway_rest_api" "api_gateway" {
  name = var.name
  endpoint_configuration {
    types = ["EDGE"]
  }
}

# API Gateway deployment
resource "aws_api_gateway_deployment" "api_deployment" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.api_proxy_resource.id,
      aws_api_gateway_method.api_proxy_method.id,
      aws_api_gateway_integration.api_lambda_integration.id,
      aws_api_gateway_authorizer.api_cognito_authorizer.id,
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }
}

# API Gateway stage
resource "aws_api_gateway_stage" "api_stage" {
  deployment_id = aws_api_gateway_deployment.api_deployment.id
  rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
  stage_name    = "v1"
}

# API Gateway resource for proxy
resource "aws_api_gateway_resource" "api_proxy_resource" {
  rest_api_id = aws_api_gateway_rest_api.api_gateway.id
  parent_id   = aws_api_gateway_rest_api.api_gateway.root_resource_id
  path_part   = "{proxy+}"
}

# API Gateway method
resource "aws_api_gateway_method" "api_proxy_method" {
  rest_api_id   = aws_api_gateway_rest_api.api_gateway.id
  resource_id   = aws_api_gateway_resource.api_proxy_resource.id
  http_method   = "ANY"
  authorization = "COGNITO_USER_POOLS"
  authorizer_id = aws_api_gateway_authorizer.api_cognito_authorizer.id
}

# API Gateway Lambda integration
resource "aws_api_gateway_integration" "api_lambda_integration" {
  rest_api_id             = aws_api_gateway_rest_api.api_gateway.id
  resource_id             = aws_api_gateway_resource.api_proxy_resource.id
  http_method             = aws_api_gateway_method.api_proxy_method.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = var.lambda_invoke_arn
}

# API Gateway Cognito authorizer
resource "aws_api_gateway_authorizer" "api_cognito_authorizer" {
  name            = "${var.name}-authorizer"
  type            = "COGNITO_USER_POOLS"
  rest_api_id     = aws_api_gateway_rest_api.api_gateway.id
  provider_arns   = [var.user_pool_arn]
  identity_source = "method.request.header.Authorization"
}

# Lambda permission to allow API Gateway to invoke function
resource "aws_lambda_permission" "api_gateway_invoke" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.api_gateway.execution_arn}/*/*"
}
