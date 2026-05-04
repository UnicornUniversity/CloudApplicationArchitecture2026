variable "region" {
  description = "Stockholm region for AWS resources"
  type        = string
  default     = "eu-north-1"
}

variable "user_name" {
  description = ""
  type        = string
  default     = "uu-image-viewer-user"
}

variable "bucket_name" {
  description = ""
  type        = string
  default     = "uu-image-viewer"
}

variable "policy_name" {
  description = ""
  type        = string
  default     = "uu-image-viewer-read-access"
}
