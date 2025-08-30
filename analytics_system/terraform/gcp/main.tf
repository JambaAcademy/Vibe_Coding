# GCP Terraform: Real-Time Analytics (US, Europe, Asia)
provider "google" {
  region = var.gcp_region
}

variable "gcp_region" {}

# Pub/Sub Topic
resource "google_pubsub_topic" "analytics_topic" {
  name = "analytics-topic"
}

# Dataflow Job (template reference)
resource "google_dataflow_job" "analytics_job" {
  name              = "analytics-job"
  template_gcs_path = "gs://dataflow-templates/latest/Stream_GCS_Text_to_BigQuery"
  parameters = {
    inputFilePattern = "gs://input-bucket/*"
    outputTable      = "project:dataset.table"
  }
  region            = var.gcp_region
}

# Cloud Storage Bucket
resource "google_storage_bucket" "analytics_data" {
  name     = "analytics-data-${var.gcp_region}"
  location = var.gcp_region
  lifecycle_rule {
    action {
      type = "SetStorageClass"
      storage_class = "NEARLINE"
    }
    condition {
      age = 30
    }
  }
}
