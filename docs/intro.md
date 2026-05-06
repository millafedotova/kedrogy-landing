---
sidebar_position: 1
---

# Introduction

Kedrogy is an ML operations platform that integrates [Prodigy](https://prodi.gy/) (data annotation), [Kedro](https://kedro.org/) (data pipelines), [Django](https://www.djangoproject.com/) (web backend), and [Kubernetes](https://kubernetes.io/) (orchestration) into a single web application.

## What Kedrogy Does

Kedrogy provides a web-based workflow for the full ML lifecycle:

- **Dataset creation** -- define datasets backed by Kedro pipelines with configurable data loading
- **Data annotation** -- deploy Prodigy instances to Kubernetes for collaborative labeling
- **Model training** -- run training jobs on Kubernetes with live log streaming
- **Model serving** -- deploy trained models as Kubernetes services with REST prediction endpoints

## Architecture Overview

```
React SPA  <-->  Django REST API  <-->  Kubernetes
                      |                     |
                  PostgreSQL          Prodigy / Kedro
                                     Training Jobs
                                     Serving Deployments
```

The platform has two frontends:

1. **React SPA** -- a single-page application using React 19 and React Router, communicating with Django through a REST API (Django REST Framework)
2. **Server-rendered templates** -- traditional Django views with HTMX for progressive enhancement

The backend uses **django-tasks** for asynchronous job execution. Tasks generate Kubernetes manifests from Jinja2 templates and apply them with `kubectl`.

## Requirements

- Python 3.12+
- Node.js 20+ (for the React frontend)
- PostgreSQL
- Kubernetes cluster (k3d for local development)
- [UV](https://docs.astral.sh/uv/) package manager
- Prodigy license (for annotation features)

## Quick Start

```bash
# Clone the repository
git clone <repo-url> kedrogy-code
cd kedrogy-code

# Copy environment variables
cp .env-example .env
# Edit .env with your database and Prodigy credentials

# Install Python dependencies
uv sync

# Run database migrations
uv run python -m mysite migrate

# Create a superuser
uv run python -m mysite createsuperuser

# Start the Django development server
uv run python -m mysite runserver

# In a separate terminal, start the React frontend
cd app
npm install
npm start
```

The Django server runs on `http://localhost:8000` and the React dev server on `http://localhost:5173`.
