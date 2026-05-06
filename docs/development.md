---
sidebar_position: 4
---

# Development Setup

This guide covers setting up a local development environment for Kedrogy.

## Prerequisites

- **Python 3.12+**
- **Node.js 20+**
- **UV** -- modern Python package manager (`pip install uv` or see [UV docs](https://docs.astral.sh/uv/))
- **PostgreSQL** -- running locally or in a container
- **k3d** -- lightweight Kubernetes cluster for local development
- **Docker** -- for building container images

## Environment Setup

```bash
# Clone the repository
git clone <repo-url> kedrogy-code
cd kedrogy-code

# Copy and configure environment variables
cp .env-example .env
```

Edit `.env` with your database credentials, Prodigy index credentials, and Django superuser settings.

## Backend Setup

```bash
# Install Python dependencies
uv sync

# Run migrations
uv run python -m mysite migrate

# Create superuser
uv run python -m mysite createsuperuser

# Start the development server
uv run python -m mysite runserver
```

## Frontend Setup

```bash
cd app
npm install
npm start
```

The React dev server starts on port 5173 and proxies API requests to the Django server on port 8000.

## Kubernetes Cluster (k3d)

For features that interact with Kubernetes (labeling, training, serving), you need a local cluster:

```bash
# Create a k3d cluster
k3d cluster create kedrogy

# Apply PostgreSQL service
kubectl apply -f postgres.yaml

# Apply the Django service
kubectl apply -f mysite.yaml
```

## Local Development with Tilt

Kedrogy includes a `Tiltfile` for live-reloading Kubernetes development:

```bash
tilt up
```

Tilt watches for file changes and automatically rebuilds and redeploys to the local cluster.

## Building Docker Images

```bash
docker build -t kedrogy:latest .
```

The Dockerfile uses a multi-stage build with Python 3.12-slim, PostgreSQL client tools, kubectl, and the UV package manager.

## Django + Jupyter Integration

For interactive development and data exploration:

```bash
uv run python -m mysite shell_plus --notebook
```

This requires `django-extensions` (included in dev dependencies).
