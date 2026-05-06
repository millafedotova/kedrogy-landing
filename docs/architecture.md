---
sidebar_position: 2
---

# Architecture

Kedrogy is composed of several layers that work together to provide a complete ML operations workflow.

## Components

### Django Backend

The core of Kedrogy is a Django application (`kedrogy` package) running on Django 6.0+. It provides:

- **ORM models** for datasets (`DjangoDataset`), ML models (`DjangoModel`), and tracking state (`DjangoLastDataset`)
- **REST API** via Django REST Framework for the React frontend
- **Server-rendered views** with Django templates and HTMX
- **Async task execution** via `django-tasks` (database-backed task queue)

### React Frontend

A React 19 single-page application that communicates with Django through the REST API:

- `DatasetsPage` -- list datasets and models, create new datasets
- `DatasetDetailPage` -- view dataset details, trigger labeling
- `ModelDetailPage` -- train, serve, delete, and run predictions

### Kubernetes Orchestration

Kedrogy dynamically generates Kubernetes manifests from Jinja2 templates and applies them via `kubectl`:

- **Prodigy deployments** -- annotation UI pods with Kedro data loading
- **Training jobs** -- Kubernetes Jobs running Kedro pipelines with configurable parameters
- **Serving deployments** -- prediction service pods
- **Persistent volume claims** -- storage for trained model artifacts

### Database

PostgreSQL stores dataset definitions, model metadata, task state, and training configuration. Connected via `psycopg` (async-capable PostgreSQL adapter).

## Data Flow

1. User creates a dataset via the web UI, specifying a Kedro pipeline, Docker image, and Prodigy recipe options
2. The "Label" action triggers an async task that deploys a Prodigy annotation instance to Kubernetes
3. Annotators label data through the Prodigy UI
4. User creates a model on the dataset and triggers training -- an async task creates a PVC and launches a Kubernetes Job
5. Once trained, the user can serve the model -- another async task deploys a serving pod
6. Predictions are made via the REST API, which forwards requests to the serving pod through `kubectl port-forward`

## Project Structure

```
kedrogy-code/
├── kedrogy/                  # Django app package
│   └── src/kedrogy/
│       ├── models.py         # ORM models
│       ├── views.py          # Template-based views
│       ├── api_views.py      # REST API viewsets
│       ├── tasks.py          # Async Kubernetes tasks
│       ├── serializers.py    # DRF serializers
│       ├── templates/        # Django HTML templates
│       └── templates_k8s/    # Jinja2 Kubernetes manifests
├── mysite/                   # Django project config
│   └── src/mysite/
│       ├── settings.py       # Django settings
│       └── urls.py           # URL routing
├── app/                      # React SPA
│   └── src/
│       ├── App.js            # Router
│       ├── api.js            # API client
│       └── pages/            # Page components
├── predict/                  # ML inference service
├── example/                  # Example Kedro project
├── Dockerfile                # Container image
├── Tiltfile                  # Tilt local dev config
└── *.yaml                    # Kubernetes manifests
```
