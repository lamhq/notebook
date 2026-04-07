# ============================================================================
# S3 Bucket for API Artifacts and Web Application
# ============================================================================

# Create a random name for the artifact and web bucket
resource "random_pet" "app_bucket_name" {
  prefix    = local.name_prefix
  length    = 1
  separator = "-"
}

# S3 bucket for API deployment artifacts and web static files
resource "aws_s3_bucket" "app_bucket" {
  bucket = random_pet.app_bucket_name.id
}
