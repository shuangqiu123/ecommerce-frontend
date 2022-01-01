terraform {
  backend "s3" {
    bucket = "sq-aws-terraform-state"
    key    = "ecommerce-s3-cloudfront.json"
  }
}