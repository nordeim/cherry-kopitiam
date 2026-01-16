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
*   `make test`: Run both frontend (Vitest) and backend (Pest) tests.
*   `make lint`: Run linters (Pint for PHP, ESLint for JS/TS).
*   `make shell-backend`: Access the Laravel container.
*   `make shell-frontend`: Access the Next.js container.

### Services (Local)
*   **Frontend:** http://localhost:3000
*   **Backend API:** http://localhost:8000
*   **Mailpit:** http://localhost:8025
*   **PostgreSQL:** Port 5432
*   **Redis:** Port 6379

## 📂 Project Structure
```text
/
├── backend/                # Laravel Application
│   ├── app/                # Domain logic, Models, Services
│   └── database/           # Migrations, Seeders
├── frontend/               # Next.js Application
│   ├── src/app/            # App Router pages
│   └── src/components/     # Retro-styled UI components
├── infra/                  # Infrastructure config (Postgres init, Nginx)
├── scripts/                # Utility scripts
├── docker-compose.yml      # Service orchestration
├── Makefile                # Command shortcuts
├── MASTER_EXECUTION_PLAN.md # The architectural bible
└── VALIDATED_EXECUTION_PLAN.md # The actual todo list
```

## 📝 Development Status
The project is being built in **Phases**. Refer to the `PHASE_*_PLAN.md` files for specific implementation details of each stage.

*   **Phase 0:** Infrastructure (Completed)
*   **Phase 1:** Design System (Completed)
*   **Phase 2:** Frontend Structure (Completed)
*   **Phase 3:** Interactive State (Completed)
*   **Phase 4:** Backend Domain (Completed)
*   **Phase 5:** Checkout & Payments (Completed)
*   **Phase 6:** Infrastructure & Deployment (Completed)
*   **Phase 7:** Testing & QA (Completed)
*   **Phase 8:** Operations & Admin (Completed)

**Note:** Always cross-reference `VALIDATED_EXECUTION_PLAN.md` for the most up-to-date task status.
