# Azure Terraform: Real-Time Analytics (US, Europe, Asia)
provider "azurerm" {
  features {}
  location = var.azure_location
}

variable "azure_location" {}

# Event Hub Namespace
resource "azurerm_eventhub_namespace" "analytics_ns" {
  name                = "analytics-ns"
  location            = var.azure_location
  resource_group_name = azurerm_resource_group.analytics_rg.name
  sku                 = "Standard"
  capacity            = 4
}

resource "azurerm_resource_group" "analytics_rg" {
  name     = "analytics-rg"
  location = var.azure_location
}

# Event Hub
resource "azurerm_eventhub" "analytics_hub" {
  name                = "analytics-hub"
  namespace_name      = azurerm_eventhub_namespace.analytics_ns.name
  resource_group_name = azurerm_resource_group.analytics_rg.name
  partition_count     = 4
  message_retention   = 1
}

# Azure Function
resource "azurerm_function_app" "analytics_func" {
  name                       = "analytics-func"
  location                   = var.azure_location
  resource_group_name        = azurerm_resource_group.analytics_rg.name
  app_service_plan_id        = azurerm_app_service_plan.analytics_plan.id
  storage_account_name       = azurerm_storage_account.analytics_storage.name
  storage_account_access_key = azurerm_storage_account.analytics_storage.primary_access_key
}

resource "azurerm_app_service_plan" "analytics_plan" {
  name                = "analytics-plan"
  location            = var.azure_location
  resource_group_name = azurerm_resource_group.analytics_rg.name
  kind                = "FunctionApp"
  sku {
    tier = "Dynamic"
    size = "Y1"
  }
}

resource "azurerm_storage_account" "analytics_storage" {
  name                     = "analyticsstorage${random_id.storage_id.hex}"
  resource_group_name      = azurerm_resource_group.analytics_rg.name
  location                 = var.azure_location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}

resource "random_id" "storage_id" {
  byte_length = 8
}
