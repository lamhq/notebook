# ============================================================================
# Cloudflare DNS Records
# ============================================================================

# CNAME record pointing domain to CloudFront
resource "cloudflare_dns_record" "domain" {
  zone_id = var.cloudflare_zone_id
  name    = var.domain
  type    = "CNAME"
  content = module.cloudfront.distribution_domain
  ttl     = 1 # automatic
  comment = "Point ${var.domain} to CloudFront distribution. Do not modify, it's managed by Terraform."
}

# CNAME record for SSL certificate validation
resource "cloudflare_dns_record" "acm_validation" {
  zone_id = var.cloudflare_zone_id
  name    = module.cloudfront.resource_record_name
  type    = "CNAME"
  content = module.cloudfront.resource_record_value
  ttl     = 1 # automatic
  comment = "Validate the certificate for ${var.domain}. Do not modify, it's managed by Terraform."
}
