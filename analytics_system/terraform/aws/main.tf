# AWS Terraform: Real-Time Analytics (US, Europe, Asia)
provider "aws" {
  region = var.aws_region
}

variable "aws_region" {}

# Kinesis Data Stream
resource "aws_kinesis_stream" "analytics_stream" {
  name             = "analytics-stream"
  shard_count      = 10
  retention_period = 24
  shard_level_metrics = ["IncomingBytes", "OutgoingBytes"]
}

# Lambda for processing
resource "aws_lambda_function" "analytics_processor" {
  filename         = "lambda.zip"
  function_name    = "analytics-processor"
  role             = aws_iam_role.lambda_exec.arn
  handler          = "index.handler"
  runtime          = "python3.9"
  memory_size      = 1024
  timeout          = 30
}

resource "aws_iam_role" "lambda_exec" {
  name = "lambda_exec_role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}

data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

# S3 Bucket (regional)
resource "aws_s3_bucket" "analytics_data" {
  bucket = "analytics-data-${var.aws_region}"
  force_destroy = true
  lifecycle_rule {
    enabled = true
    transition {
      days          = 30
      storage_class = "INTELLIGENT_TIERING"
    }
  }
}
