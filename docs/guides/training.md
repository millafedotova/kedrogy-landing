---
sidebar_position: 2
---

# Model Training

Kedrogy orchestrates model training by launching Kubernetes Jobs that run Kedro pipelines on annotated data.

## Creating a Model

Before training, create a model linked to a dataset:

- **Dataset** -- the annotated dataset to train on
- **Labels** -- comma-separated classification labels (e.g., `CAT,DOG`)
- **Preprocessing function** -- name of the preprocessing function to apply

## Starting Training

When you trigger training (via the UI button or the `/train/` API endpoint), Kedrogy:

1. Creates a **Persistent Volume Claim** (PVC) to store model artifacts
2. Generates a Kubernetes Job manifest from the `train.yaml.jinja` template
3. Applies the manifest with `kubectl apply`
4. Retrieves the pod name from the job's controller UID
5. Waits for the pod to become ready
6. Streams training logs in real time back to the UI
7. Marks the model as `trained=True` upon completion

## Monitoring Progress

Training is an async task. The UI polls the task status endpoint to display progress messages and logs as they arrive. You can also check task status programmatically:

```bash
curl http://localhost:8000/api/task-status/<task-id>/
```

## Training Configuration

Training parameters are derived from the dataset and model configuration:

- The Docker image and working directory come from the dataset
- Labels and preprocessing function come from the model
- The Kedro pipeline executed depends on the dataset configuration
- Resource limits can be configured in the Kubernetes manifest templates
