output "iam_user_name" {
  description = "The name of the IAM user created"
  value       = aws_iam_user.uu_image_viewer_user.name
}

output "iam_user_arn" {
  description = "The ARN of the IAM user created"
  value       = aws_iam_user.uu_image_viewer_user.arn
}

output "s3_bucket_name" {
  description = "The name of the S3 bucket created"
  value       = aws_s3_bucket.uu_image_viewer_bucket.bucket
}

output "s3_bucket_arn" {
  description = "The ARN of the S3 bucket created"
  value       = aws_s3_bucket.uu_image_viewer_bucket.arn
}
