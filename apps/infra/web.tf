# CloudFront Origin Access Control
resource "aws_cloudfront_origin_access_control" "web_s3_oac" {
  name                              = "${local.name_prefix}-access-web-bucket"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

# CloudFront function to rewrite SPA routes
resource "aws_cloudfront_function" "spa_route_rewrite" {
  name    = "${local.name_prefix}-spa-uri-rewrite"
  runtime = "cloudfront-js-2.0"
  comment = "Rewrite any requests that do not include a file extension to `/index.html`"
  publish = true
  code    = <<EOF
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (!uri.includes('.')) {
    request.uri = '/index.html';
  }

  return request;
}
EOF
}

# CloudFront function to remove API prefix
resource "aws_cloudfront_function" "remove_api_prefix" {
  name    = "${local.name_prefix}-remove-api-prefix"
  runtime = "cloudfront-js-2.0"
  comment = "Remove /api prefix from requests to API origin"
  publish = true
  code    = <<EOF
function handler(event) {
  var request = event.request;
  var uri = request.uri;
 
  // Check if the URI starts with 'api/'
  if (uri.startsWith('/api')) {
    // Remove /api
    request.uri = uri.replace(/^\/api/, '');
  }
 
  return request;
}
EOF
}

# CloudFront Distribution
resource "aws_cloudfront_distribution" "web_distribution" {
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  price_class         = "PriceClass_200"
  aliases             = [var.web_domain]

  viewer_certificate {
    acm_certificate_arn      = var.acm_certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }

  # S3 origin for web static files
  origin {
    origin_id                = "${local.name_prefix}-web-origin"
    origin_path              = "/web"
    domain_name              = aws_s3_bucket.app_bucket.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.web_s3_oac.id
  }

  # API Gateway origin
  origin {
    origin_id   = "${local.name_prefix}-api-origin"
    origin_path = "/v1"
    domain_name = "${aws_api_gateway_rest_api.api_gateway.id}.execute-api.${var.aws_region}.amazonaws.com"
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }

  # Default cache behavior for web files
  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "${local.name_prefix}-web-origin"
    compress               = true
    viewer_protocol_policy = "allow-all"
    cache_policy_id        = "658327ea-f89d-4fab-a63d-7e88639e58f6" # CachingOptimized

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.spa_route_rewrite.arn
    }
  }

  # Cached behavior for API requests
  ordered_cache_behavior {
    path_pattern             = "/api/*"
    allowed_methods          = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods           = ["HEAD", "GET"]
    target_origin_id         = "${local.name_prefix}-api-origin"
    compress                 = true
    viewer_protocol_policy   = "https-only"
    cache_policy_id          = "4135ea2d-6df8-44a3-9df3-4b5a84be39ad" # CachingDisabled
    origin_request_policy_id = "b689b0a8-53d0-40ab-baf2-68738e2966ac" # AllViewerExceptHostHeader

    function_association {
      event_type   = "viewer-request"
      function_arn = aws_cloudfront_function.remove_api_prefix.arn
    }
  }
}

# Upload sample index.html to S3
resource "aws_s3_object" "index_html" {
  bucket       = aws_s3_bucket.app_bucket.id
  key          = "web/index.html"
  source       = "assets/index.html"
  content_type = "text/html"

  lifecycle {
    ignore_changes = [source, tags_all]
  }
}

# S3 bucket policy to allow CloudFront access
resource "aws_s3_bucket_policy" "app_bucket_policy" {
  bucket = aws_s3_bucket.app_bucket.id

  policy = jsonencode({
    Version = "2008-10-17",
    Id      = "PolicyForCloudFrontPrivateContent",
    Statement = [
      {
        Sid    = "AllowCloudFrontServicePrincipal",
        Effect = "Allow",
        Principal = {
          Service = "cloudfront.amazonaws.com"
        },
        Action   = "s3:GetObject",
        Resource = "${aws_s3_bucket.app_bucket.arn}/web/*",
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = "${aws_cloudfront_distribution.web_distribution.arn}"
          }
        }
      }
    ]
  })
}
