# Practitioners Playbook

A **white-label training and learning platform** that replaces static training delivery (PDFs, PowerPoint) with an interactive web-based experience. Deploy branded, self-paced courses for any client engagement.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vite + React + TypeScript + Tailwind CSS + Framer Motion |
| Backend | Node.js + Express + TypeScript |
| Database | PostgreSQL 16 |
| Content | MDX (Markdown + React components) |
| Deployment | Docker Compose (app + Postgres) |
| Icons | Lucide React |
| Charts | Recharts |
| Diagrams | Mermaid |

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- Docker & Docker Compose (for full-stack deployment)

### Development

```bash
# Install dependencies
npm install

# Start backend dev server
npm run dev:backend

# Start frontend dev server (in another terminal)
npm run dev:frontend
```

The frontend dev server runs on `http://localhost:5173` and proxies `/api` requests to the backend on port `3001`.

### Docker

```bash
# Build and start all services
docker compose up --build

# Access the app
open http://localhost:3000
```

## Project Structure

```
PractitionersPlaybook/
├── packages/
│   ├── frontend/          # Vite + React SPA
│   ├── backend/           # Express API server
│   └── shared/            # Shared TypeScript types
├── content/
│   ├── courses/           # Course content (YAML + MDX)
│   └── themes/            # Brand themes (YAML + assets)
├── db/migrations/         # PostgreSQL migrations
├── docker-compose.yml
├── Dockerfile
└── docs/                  # Project documentation
```

## Documentation

- [Platform Specification](docs/platform-spec.md) — Full product requirements and architecture
- [Style Guide](docs/STYLE_GUIDE.md) — Protective Life brand guidelines
