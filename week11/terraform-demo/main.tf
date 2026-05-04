terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region     = var.region
  access_key = ""
  secret_key = ""
}

resource "aws_s3_bucket" "uu_image_viewer_bucket" {
  bucket = var.bucket_name
  tags = {
    CreatedBy = "terraform"
  }
}

resource "aws_iam_user" "uu_image_viewer_user" {
  name = var.user_name

  tags = {
    CreatedBy = "terraform"
  }
}

resource "aws_iam_policy" "uu_image_viewer_policy" {
  name        = var.policy_name
  description = ""

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = "s3:ListBucket"
        Resource = aws_s3_bucket.uu_image_viewer_bucket.arn
      },
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:GetObjectAcl"
        ]
        Resource = format("%s/*", aws_s3_bucket.uu_image_viewer_bucket.arn)
      }
    ]
  })
}

resource "aws_iam_user_policy_attachment" "attach_policy" {
  user       = aws_iam_user.uu_image_viewer_user.name
  policy_arn = aws_iam_policy.uu_image_viewer_policy.arn
}

resource "aws_s3_bucket_object" "image1" {
  bucket = aws_s3_bucket.uu_image_viewer_bucket.id
  key    = "1.jpg"
  source = "images/1.jpg"
}

resource "aws_s3_bucket_object" "image2" {
  bucket = aws_s3_bucket.uu_image_viewer_bucket.id
  key    = "2.jpg"
  source = "images/2.jpg"
}

resource "aws_s3_bucket_object" "image3" {
  bucket = aws_s3_bucket.uu_image_viewer_bucket.id
  key    = "3.jpg"
  source = "images/3.jpg"
}
