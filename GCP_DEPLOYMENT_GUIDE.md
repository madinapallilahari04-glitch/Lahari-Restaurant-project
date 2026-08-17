# ☁️ Google Cloud Deployment Guide for Lahari's Restaurant

This guide covers the simplest and recommended ways to deploy **Lahari's Restaurant** to **Google Cloud Platform (GCP)**.

---

## 🌟 Method 1: Google Cloud Run via GitHub (Recommended - 2 Minutes & No CLI Required)

Google Cloud Run can connect directly to your GitHub repository and automatically deploy with free SSL and auto-scaling.

### Step-by-Step Instructions:

1. **Open Google Cloud Console**:
   👉 Go to **[console.cloud.google.com/run](https://console.cloud.google.com/run)**

2. **Click `+ CREATE SERVICE`**:
   - Select **"Continuously deploy from a repository"** (Click *Set up with Cloud Build*).

3. **Connect Your GitHub Repository**:
   - Provider: **GitHub**
   - Repository: Select **`madinapallilahari04-glitch/Lahari-Restaurant-project`**
   - Branch: **`^main$`**
   - Build Type: **Dockerfile** (Path: `/Dockerfile`)

4. **Configure Service Settings**:
   - **Service Name**: `lahari-restaurant`
   - **Region**: `asia-south1 (Mumbai)` or `us-central1`
   - **Authentication**: Select **`Allow unauthenticated invocations`** (so your customers can access the website publicly).
   - **Container Port**: `8080` (already pre-configured in `Dockerfile`).

5. **Click `CREATE`**:
   - Google Cloud will automatically pull the code, build the container, and provide you with a live HTTPS URL (e.g. `https://lahari-restaurant-xxxxx-el.a.run.app`).
   - Every time you push updates to GitHub, Google Cloud will automatically redeploy!

---

## ⚡ Method 2: Deploy Using Google Cloud Shell (In Your Browser)

If you have a Google Cloud account, you can deploy in 1 command using the built-in Cloud Shell:

1. Open **[shell.cloud.google.com](https://shell.cloud.google.com)**
2. Clone your repo:
   ```bash
   git clone https://github.com/madinapallilahari04-glitch/Lahari-Restaurant-project.git
   cd Lahari-Restaurant-project
   ```
3. Deploy directly to Cloud Run:
   ```bash
   gcloud run deploy lahari-restaurant \
     --source . \
     --region asia-south1 \
     --allow-unauthenticated \
     --port 8080
   ```
4. Copy the live URL generated at the end of the command!

---

## 🚀 Method 3: Deploy via Google App Engine

If you prefer Google App Engine:

1. Make sure your project has an App Engine application created:
   ```bash
   gcloud app create --region=asia-south1
   ```
2. Deploy using the included `app.yaml`:
   ```bash
   gcloud app deploy app.yaml
   ```
3. View your live website:
   ```bash
   gcloud app browse
   ```

---

## 📁 Pre-Configured Deployment Files in This Repository

| File | Purpose |
|------|---------|
| **`Dockerfile`** | Production container specification based on `node:20-alpine` with health check and non-root security. |
| **`.dockerignore`** | Excludes non-production files for fast build speeds. |
| **`app.yaml`** | Standard Google App Engine deployment configuration. |
| **`cloudbuild.yaml`** | Google Cloud Build CI/CD automated build & deploy pipeline. |
| **`.github/workflows/gcp-deploy.yml`** | GitHub Actions workflow for automatic deployment on every push. |
| **`server.js`** | Configured to bind to `0.0.0.0` on `$PORT` with `/healthz` endpoint for Google Cloud Load Balancer. |
