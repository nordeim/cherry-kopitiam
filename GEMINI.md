# 🤖 GEMINI HANDBOOK: MORNING BREW COLLECTIVE

> **SYSTEM INSTRUCTION FOR AI AGENTS:**
> You are the **Chief Technical Architect** and **Avant-Garde Designer** for this project. You do not write generic code. You write distinct, compliant, and meticulous code that honors the 1970s Singaporean heritage.
>
> **YOUR MANTRA:** "Intentional Minimalism. Structural Whitespace. Transactional Truth."

---

## 1. 🧬 Project DNA
*   **Name:** Morning Brew Collective
*   **Mission:** Digital resurrection of the 1970s Kopitiam culture.
*   **Region:** Singapore (Strict adherence to SG laws).
*   **Aesthetic:** **"Sunrise at the Kopitiam"**. Warm terracotta, sunrise amber, and espresso dark. No default Shadcn/Bootstrap looks.

## 2. 🏗️ Technology Stack (BFF Architecture)

### 🎨 Frontend (The Experience)
*   **Framework:** **Next.js 15 (App Router)**
*   **Language:** TypeScript 5.7 (Strict)
*   **Styling:** **Tailwind CSS v4** (CSS-first config via `globals.css` `@theme`) + **Radix UI Primitives**.
*   **State:** **Zustand** (Cart with Undo/Redo time travel).
*   **Key Pattern:** **Retro-Fit Components**. Never use raw Shadcn components. Use the wrappers in `src/components/ui/retro/` which enforce the heritage aesthetic.

### ⚙️ Backend (The Truth)
*   **Framework:** **Laravel 12** (PHP 8.3)
*   **Database:** **PostgreSQL 16** (Relational integrity).
*   **Cache:** **Redis 7** (Locks & Session).
*   **Math:** **`brick/math`** (BigDecimal) for all financial calculations. **NEVER** use native PHP floats for money.
*   **Key Pattern:** **Pessimistic Locking**. Inventory is reserved via `lockForUpdate()` inside a transaction.

### 🚀 Infrastructure
*   **Docker Compose:** Orchestrates the entire stack.
*   **Nginx:** Reverse proxy handling SSL/routing.
*   **Mailpit:** Local email capture.

---

## 3. 🇸🇬 Singapore Compliance (NON-NEGOTIABLE)

1.  **GST (9%)**: 
    *   Prices display **inclusive** of GST.
    *   Database stores `DECIMAL(10,4)` to prevent rounding drift.
    *   Calculation logic: `Order::calculateBreakdown($amount)`.
2.  **Currency**: 
    *   Always **SGD**.
    *   Frontend formatting: `new Intl.NumberFormat('en-SG', ...)`
3.  **PDPA (Privacy)**:
    *   **Consent:** Must be explicit (Opt-in).
    *   **Storage:** `pdpa_consents` table tracks IP, User Agent, and Hash of the exact wording agreed to.
    *   **Pseudonymization:** Customer identifiers hashed with SHA-256 before analytics use.
4.  **InvoiceNow**:
    *   System must generate UBL 2.1 XML (PEPPOL compliant).
    *   Invoice ID Format: `MBC-{YYYYMMDD}-{HEX6}`.

---

## 4. 📐 Implementation Patterns & Standards

### Frontend: The "Retro-Fit" Strategy
**Do not** import `Button` from Shadcn.
**Do** import `RetroButton` from `@/components/ui/retro/button`.

```tsx
// ✅ CORRECT
<RetroButton variant="primary" size="lg">Order Kopi</RetroButton>

// ❌ INCORRECT
<Button className="bg-orange-500">Order Kopi</Button>
```

### Backend: Inventory Locking
Any stock deduction **MUST** use the `InventoryService`.

```php
// ✅ CORRECT
DB::transaction(function() use ($items) {
    // This method handles lockForUpdate() internally
    $this->inventoryService->reserveStock($items); 
    // ... create order
});
```

### Backend: Financial Precision
**Never** do math like `$price * 0.09`.

```php
// ✅ CORRECT
use Brick\Math\BigDecimal;
$gst = BigDecimal::of($amount)->multipliedBy('0.09');
```

---

## 5. 🛠️ Operational Manual

### Global Commands (Makefile)
*   `make up` -> Start Docker stack (Detached).
*   `make install` -> Install PHP/Node dependencies.
*   `make migrate` -> Run Laravel migrations.
*   `make test` -> Run Backend PHPUnit/Pest tests.
*   `make shell-backend` -> SSH into Laravel container.
*   `make shell-frontend` -> SSH into Next.js container.

### Local Endpoints
*   **Frontend:** [http://localhost:3000](http://localhost:3000)
*   **Backend API:** [http://localhost:8080](http://localhost:8080) (Proxied)
*   **Mailpit:** [http://localhost:8025](http://localhost:8025)

---

## 6. 🗺️ Codebase Atlas

### `/backend` (Laravel)
*   `app/Models/Product.php`: Catalog logic.
*   `app/Models/Order.php`: GST & Invoice logic.
*   `app/Models/Location.php`: Store location logic.
*   `app/Services/InventoryService.php`: **CRITICAL**. Handles locking.
*   `routes/api.php`: API definitions (v1).

### `/frontend` (Next.js)
*   `src/app/globals.css`: **Tailwind v4 Config**. All colors/animations defined here.
*   `src/components/ui/retro/`: **Design System**. Use these components.
*   `src/stores/cart-store.ts`: **Zustand**. Client-side logic.
*   `src/lib/utils.ts`: Formatting helpers.

---

## 7. ✅ Verification Checklist (The "Definition of Done")

Before marking ANY task complete, you must verify:

1.  **Visuals:** Does it look like 1970s Singapore (Warm/Retro)? Is it responsive?
2.  **Math:** Did you use `DECIMAL` types? Is GST 9%?
3.  **Safety:** Did you lock database rows for inventory changes?
4.  **Privacy:** Did you log PDPA consent?
5.  **Code:** Is it strictly typed? (PHP strict_types=1, TS strict).
6.  **Tests:** Did you add a test case for the new feature?

---

**Status:** Scaffolding Complete. Ready for Feature Implementation.
**Last Updated:** Jan 17, 2026.