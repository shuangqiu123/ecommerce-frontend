// S3 Bucket config 

resource "aws_s3_bucket" "demostore_bucket" {
  bucket = "sq-demostore"
  acl    = "private"

  tags = {
    Name = "Bucket of demostore for static website hosting"
  }

  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}

resource "aws_s3_bucket_policy" "allow_access_from_cloudfront" {
  bucket = aws_s3_bucket.demostore_bucket.id
  policy = data.aws_iam_policy_document.allow_access_from_cloudfront.json
}

data "aws_iam_policy_document" "allow_access_from_cloudfront" {
  statement {
    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.origin_access_identity.iam_arn]
    }

    actions = [
      "s3:GetObject"
    ]

    resources = [
      "${aws_s3_bucket.demostore_bucket.arn}/*"
    ]
  }
}

// cloudfront config
resource "aws_cloudfront_distribution" "demostore_distribution" {

  depends_on = [
    aws_s3_bucket.demostore_bucket
  ]

  origin {
    domain_name = "${aws_s3_bucket.demostore_bucket.bucket_domain_name}"
    origin_id = "s3-cloudfront"
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"
  aliases = [var.FRONTEND_DOMAIN]

  default_cache_behavior {
    allowed_methods = [
      "GET",
      "HEAD",
    ]
    cached_methods = [
      "GET",
      "HEAD",
    ]
    target_origin_id = "s3-cloudfront"
    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
  }
  
  price_class = "PriceClass_All"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  
  viewer_certificate {
    acm_certificate_arn      = var.FRONTEND_CERT_ARN
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1"
  }

  wait_for_deployment = false

}

resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
    comment = "Access Identity for demostore"
}
