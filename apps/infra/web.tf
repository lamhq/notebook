# CloudFront Module
module "cloudfront" {
  source = "./modules/cloudfront"

  name_prefix      = local.name_prefix
  domain           = var.web_domain
  domain_cert      = var.acm_certificate_arn
  s3_bucket_domain = module.app_storage.bucket_domain
  s3_bucket_id     = module.app_storage.bucket_id
  s3_bucket_arn    = module.app_storage.bucket_arn
  api_invoke_url   = module.api_gateway.invoke_url
}
