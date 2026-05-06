---
sidebar_position: 1
---

# Dataset Management

Datasets in Kedrogy represent a collection of data that can be annotated and used for model training.

## Creating a Dataset

To create a dataset, provide:

- **Dataset name** -- a unique identifier
- **Docker image** -- the container image containing your Kedro project
- **Working directory** -- path inside the container where the Kedro project lives
- **Pipeline** -- the Kedro pipeline to run for loading examples (default: `load_examples`)
- **Recipe options** -- Prodigy recipe configuration (annotation type, categories, etc.)
- **Data table name** -- the database table that holds your examples
- **ID field** -- the primary key field for examples

### Via the Web UI

Navigate to the Datasets page and fill in the creation form. The form validates required fields before submission.

### Via the API

```bash
curl -X POST http://localhost:8000/api/datasets/ \
  -H "Content-Type: application/json" \
  -H "X-CSRFToken: <token>" \
  -d '{
    "dataset_name": "my-dataset",
    "image": "registry.example.com/my-kedro-project:latest",
    "workingDir": "/app",
    "pipeline": "load_examples",
    "recipe_options": "--label CAT,DOG",
    "data_table_name": "examples",
    "id_field": "id"
  }'
```

## Labeling a Dataset

Clicking "Label" (or calling the `/label/` endpoint) triggers an async task that:

1. Generates a Kubernetes deployment manifest for Prodigy from a Jinja2 template
2. Applies the manifest with `kubectl apply`
3. Waits for the Prodigy pod to become ready

Once deployed, annotators can access the Prodigy UI to label examples. The annotated data is stored in Prodigy's database and can be used for training.

## Deleting a Dataset

Deleting a dataset removes the database record. Associated Kubernetes resources (Prodigy deployments) should be cleaned up separately if still running.
