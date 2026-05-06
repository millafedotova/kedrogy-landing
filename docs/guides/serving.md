---
sidebar_position: 3
---

# Model Serving

Once a model is trained, Kedrogy can deploy it as a Kubernetes service for real-time predictions.

## Deploying a Model

Click "Serve" in the UI or call the `/serve/` API endpoint. Kedrogy will:

1. Generate a serving deployment manifest from the `serve.yaml.jinja` template
2. Apply the manifest with `kubectl apply`
3. Mark the model as `served=True`

The serving deployment runs a prediction service container that loads the trained model from the persistent volume.

## Running Predictions

Once served, you can run predictions through the UI or API:

### Via the Web UI

Navigate to the model detail page, enter text in the prediction input, and submit. The result is displayed on the page.

### Via the API

```bash
curl -X POST http://localhost:8000/api/models/<model-id>/predict/ \
  -H "Content-Type: application/json" \
  -H "X-CSRFToken: <token>" \
  -d '{"text": "Your input text here"}'
```

Under the hood, the Django backend uses `kubectl port-forward` to route the request to the serving pod.

## Deleting a Served Model

The "Delete" action removes all Kubernetes resources associated with the model:

- Serving deployment
- Training job
- Persistent volume claim

It also resets the `trained` and `served` flags on the model record.
