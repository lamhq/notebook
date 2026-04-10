# ============================================================================
# S3 Bucket
# ============================================================================

resource "random_pet" "bucket_name" {
  prefix    = var.name_prefix
  length    = 1
  separator = "-"
}

resource "aws_s3_bucket" "bucket" {
  bucket = random_pet.bucket_name.id
}
