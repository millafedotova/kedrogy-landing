---
sidebar_position: 3
---

# API Reference

Kedrogy exposes a REST API built with Django REST Framework. The React frontend consumes this API, and it can also be used for programmatic access.

## Base URL

```
http://localhost:8000/api/
```

## Authentication

The API uses Django session authentication with CSRF protection. Include the `X-CSRFToken` header with mutating requests.

## Endpoints

### Datasets

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/datasets/` | List all datasets |
| POST | `/api/datasets/` | Create a new dataset |
| GET | `/api/datasets/{id}/` | Retrieve a dataset |
| PUT | `/api/datasets/{id}/` | Update a dataset |
| DELETE | `/api/datasets/{id}/` | Delete a dataset |
| POST | `/api/datasets/{id}/label/` | Start labeling (deploys Prodigy) |

#### Dataset Fields

| Field | Type | Description |
|-------|------|-------------|
| `dataset_name` | string | Name of the dataset |
| `image` | string | Docker image URL for the Kedro project |
| `workingDir` | string | Working directory inside the container |
| `pipeline` | string | Kedro pipeline name (default: `load_examples`) |
| `recipe_options` | string | Prodigy recipe parameters |
| `data_table_name` | string | Database table to load examples from |
| `id_field` | string | ID field for examples |

### Models

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/models/` | List all models |
| POST | `/api/models/` | Create a new model |
| GET | `/api/models/{id}/` | Retrieve a model |
| PUT | `/api/models/{id}/` | Update a model |
| DELETE | `/api/models/{id}/` | Delete a model |
| POST | `/api/models/{id}/train/` | Start training |
| POST | `/api/models/{id}/serve/` | Deploy for serving |
| POST | `/api/models/{id}/delete_model/` | Delete model resources from cluster |
| POST | `/api/models/{id}/predict/` | Run inference |

#### Model Fields

| Field | Type | Description |
|-------|------|-------------|
| `on_dataset` | integer | Foreign key to the dataset |
| `labels` | string | Comma-separated classification labels |
| `a_preprocess_fun` | string | Preprocessing function name |
| `trained` | boolean | Whether the model has been trained |
| `served` | boolean | Whether the model is currently served |

### Task Status

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/task-status/{task_id}/` | Check async task progress |

Returns task metadata including progress messages and completion state.
