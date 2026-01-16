# Morning Brew Collective - Project Briefing (CLAUDE.md)

This document serves as the **single source of truth** for developers and AI agents to understand the current state, architecture, and conventions of the Morning Brew Collective project.

---

## ☕ Project Identity
**Name:** Morning Brew Collective
**Type:** Singapore-First Headless Commerce Platform
**Aesthetic:** 1970s Retro Kopitiam meets Avant-Garde Minimalism
**Mission:** Digital resurrection of Singaporean heritage culture into an enterprise-grade e-commerce system.

---

## 🏗️ Tech Stack & Architecture
This project follows a **Backend-for-Frontend (BFF)** architecture.

### **Frontend (`/frontend`)**
- **Framework:** Next.js 15 (App Router) + React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + Radix UI (Bespoke "Retro-fit" wrappers)
- **State Management:** Zustand (with Persistence & Undo/Redo)
- **Icons:** Lucide React
- **Animations:** Framer Motion + CSS Keyframes (`slow-rotate`, `steam-rise`, `bean-bounce`)

### **Backend (`/backend`)**
- **Framework:** Laravel 12
- **Language:** PHP 8.3
- **Database:** PostgreSQL 16
- **Cache/Queue:** Redis 7
- **Invoicing:** InvoiceNow (PEPPOL) UBL 2.1 XML generation
- **Payments:** PayNow integration via Stripe

### **Infrastructure (`/infra`)**
- **Orchestration:** Docker Compose
- **Web Server:** Nginx (Reverse Proxy with SSL termination)
- **Monitoring:** Prometheus
- **Email:** Mailpit

---

## 🇸🇬 Critical Compliance & Financial Logic
**Adherence to these rules is mandatory for any codebase modification.**

1.  **GST (Goods & Services Tax):** Fixed at **9%**.
2.  **Monetary Precision:** Prices stored as `DECIMAL(10,4)` in PostgreSQL. Never use floating point or integers for financial math in the database.
3.  **PDPA:** Personal Data Protection Act compliance. Consent is versioned, logged with IP/UA, and user identifiers are pseudonymized (SHA256 + Salt).
4.  **Inventory Locking:** Two-phase reservation. Soft reserve in Redis (TTL 15m), Hard commit in PostgreSQL using `lockForUpdate()` during transactions.

---

## 📂 Project Structure
```text
/
├── backend/                # Laravel 12 Application
│   ├── app/                # Domain logic, Models, Services
│   ├── database/           # Migrations (with DECIMAL precision), Seeders
│   └── tests/              # Feature (Pest) tests for precision & concurrency
├── frontend/               # Next.js 15 Application
│   ├── src/app/            # App Router (Home, Menu, Heritage, Checkout, Admin)
│   ├── src/components/     # Retro-styled UI components & decorations
│   └── src/stores/         # Zustand stores (Cart with Undo/Redo)
├── infra/                  # Infrastructure config (Postgres, Nginx, Prometheus)
├── scripts/                # Utility scripts (Backups)
├── Makefile                # Unified developer commands
└── VALIDATED_EXECUTION_PLAN.md # Source of truth for task status
```

---

## 📝 Development Status
The project has successfully completed **all 9 phases (0-8)** of the initial build.

- **Completed:** Infrastructure, Design System, Frontend Shell, Interactive State, Backend Domain, Checkout & Payments, Deployment config, Testing Suite, Admin Dashboard.

---

## 🛠️ Developer Guide

### **Quick Start**
```bash
make up        # Start services (Docker)
make install   # Install deps (Backend & Frontend)
make migrate   # Run DB migrations
```

### **Common Commands**
- `make test`: Run Pest (Backend) and Vitest (Frontend) suites.
- `make lint`: Run Pint (PHP) and ESLint (TS).
- `make shell-backend`: Enter Laravel container.
- `make shell-frontend`: Enter Next.js container.

### **Coding Conventions**
- **UI Components:** Do not use Shadcn defaults. Always use/create wrappers in `components/ui/retro/` to maintain the 1970s aesthetic.
- **Financial Math:** All calculations must happen in the `Order` model or `calculateGST` utility.
- **State:** Use `useCartStore` for shopping cart interactions. It supports `undo()` and `redo()`.
- **Async:** Use `loading` states on buttons and error boundaries for API failures.

---

## 🚀 Next Steps for Continuation
1.  **Refine Inventory Service:** Fully implement the Redis keyspace notification for automatic stock rollback on TTL expiry.
2.  **Live Invoicing:** Connect `SendInvoiceJob` to a real PEPPOL Access Point API.
3.  **Real Payments:** Switch Stripe from `Test Mode` to `Live Mode` credentials.
4.  **Content Management:** Implement a proper CMS (e.g., Filament or a Headless CMS) for non-technical users to edit Menu items.

---
**Document Status:** VALIDATED & ALIGNED with Codebase version 2.1.0
