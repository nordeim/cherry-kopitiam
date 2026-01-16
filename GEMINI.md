# Morning Brew Collective - Project Context

## ☕ Project Identity
**Name:** Morning Brew Collective
**Type:** Singapore-First Headless Commerce Platform
**Aesthetic:** 1970s Retro Kopitiam meets Avant-Garde Minimalism
**Mission:** Digital resurrection of Singaporean heritage culture into an enterprise-grade e-commerce system.

## 🏗️ Tech Stack & Architecture
This project follows a **Backend-for-Frontend (BFF)** architecture.

*   **Frontend (`/frontend`):**
    *   **Framework:** Next.js 15 (App Router)
    *   **Language:** TypeScript
    *   **Styling:** Tailwind CSS v4 + Shadcn UI (Retro-styled)
    *   **State:** Zustand
    *   **Role:** UX orchestration, animations, design tokens.
*   **Backend (`/backend`):**
    *   **Framework:** Laravel 12
    *   **Language:** PHP 8.3
    *   **Database:** PostgreSQL 16
    *   **Cache/Queue:** Redis 7
    *   **Role:** Domain truth, inventory locks, tax calculations, regulatory compliance.
*   **Infrastructure (`/infra`):**
    *   **Orchestration:** Docker Compose
    *   **Local Dev:** Mailpit (Email), Nginx (Reverse Proxy)

## 🇸🇬 Critical Compliance & Constraints
**Adherence to these rules is mandatory.**

1.  **GST (Goods & Services Tax):** Fixed at **9%**.
2.  **Currency:** Singapore Dollar (SGD). Prices stored as `DECIMAL(10,4)` in database, never as integers.
3.  **Payments:** Must support **PayNow** (via Stripe).
4.  **Invoicing:** Must be **InvoiceNow (PEPPOL)** compliant (UBL 2.1 XML generation).
5.  **PDPA (Personal Data Protection Act):** Strict consent tracking and data minimization.

## 🛠️ Operational Guide

### Quick Start
```bash
# Start the entire stack
make up

# Install dependencies (Frontend & Backend)
make install

# Run migrations
make migrate
```

### Common Commands (via Makefile)
*   `make up`: Start Docker containers (detached).
*   `make down`: Stop containers.
*   `make logs`: Tail logs for all services.
*   `make test`: Run backend tests.
*   `make shell-backend`: Access the Laravel container.
*   `make shell-frontend`: Access the Next.js container.

### Services (Local)
*   **Frontend:** http://localhost:3000
*   **Backend API:** http://localhost:8080 (via Nginx proxy)
*   **Mailpit:** http://localhost:8025 (Local email testing)

## 📂 Project Structure
```text
/
├── backend/                # Laravel Application (PHP 8.3)
│   ├── app/                # Domain logic (Models: Product, Order, Location, PdpaConsent)
│   ├── database/           # Migrations (GST-compliant, Inventory Locks)
│   └── routes/             # API Endpoints (v1/products, v1/orders, v1/locations)
├── frontend/               # Next.js Application (React 19, TS)
│   ├── src/app/            # App Router pages & globals.css (Design System)
│   ├── src/components/     # Retro-styled UI components (Shadcn primitives)
│   └── src/stores/         # Zustand state (Cart with undo/redo)
├── infra/                  # Infrastructure config (Docker Compose, Nginx, Postgres)
├── Makefile                # Command shortcuts
├── MASTER_EXECUTION_PLAN.md # The architectural bible
├── REMEDIATION_PLAN.md      # Gap analysis and critical fixes
└── CLAUDE.md               # Development briefing & status
```

## 📝 Development Status
The project has completed its **Production-Ready Scaffolding** phase.

*   **Infrastructure**: Fully configured (Docker, Nginx, Redis, Postgres). Dockerfiles created for both layers.
*   **Design System**: Implemented via Tailwind v4 and Next.js 15.
*   **Backend Domain**: Core models (Product, Order, Location, PdpaConsent) and Inventory Service (Pessimistic Locking) are implemented.
*   **Compliance**: GST calculation and PDPA tracking logic are verified.
*   **Next Steps**: Implementation of full checkout flow, payment gateway integration, and admin dashboard.

**Note:** Always cross-reference `MASTER_EXECUTION_PLAN.md` for architectural decisions and `REMEDIATION_PLAN.md` for recent gap closures.
