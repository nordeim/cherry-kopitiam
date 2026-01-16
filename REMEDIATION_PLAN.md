# Remediation Plan: Morning Brew Collective

**Date**: January 17, 2026
**Objective**: Fix critical architectural gaps identified in code review to ensure production readiness and successful database migrations.

## 🚨 Critical Fixes (Must Do)

### 1. Create Location Domain Logic
**Issue**: The `orders` table has a foreign key constraint `location_id` referencing `locations`, but the `locations` table and model do not exist. This will cause the migration process to fail.
**Action**:
- Create `backend/app/Models/Location.php`.
- Create migration `2023_12_31_000000_create_locations_table.php`.
  - *Note*: Timestamp set to 2023 to ensure it runs **before** the `orders` migration (2024_01_01).

### 2. Implement Location API
**Issue**: Frontend needs to fetch locations for the "Locations" section, but no controller or route exists.
**Action**:
- Create `backend/app/Http/Controllers/Api/LocationController.php`.
- Register route `GET /api/v1/locations` in `backend/routes/api.php`.

## 🛠 Implementation Details

### A. Location Model
**Path**: `backend/app/Models/Location.php`
- Extends `Model`
- Fillables: `name`, `address`, `features`, `operating_hours`, `image_url`, `is_active`
- Casts: `features` (array), `operating_hours` (array), `is_active` (boolean)
- Relationship: `hasMany(Order::class)`

### B. Location Migration
**Path**: `backend/database/migrations/2023_12_31_000000_create_locations_table.php`
- Schema:
  - `id` (Primary Key)
  - `name` (String)
  - `slug` (String, unique)
  - `address` (String)
  - `features` (JSON, nullable)
  - `operating_hours` (JSON, nullable)
  - `image_url` (String, nullable)
  - `is_active` (Boolean, default true)
  - `timestamps`

### C. Location Controller
**Path**: `backend/app/Http/Controllers/Api/LocationController.php`
- Method: `index()` returns all active locations.
- Method: `show($id)` returns specific location.

### D. Route Registration
**Path**: `backend/routes/api.php`
- Add `Route::get('/locations', [LocationController::class, 'index']);` within the `v1` prefix group.

## ✅ Validation Plan
1. **Static Analysis**: Verify files exist.
2. **Migration Check**: Ensure `locations` migration file has an earlier timestamp than `orders`.
3. **Route Check**: Verify `api.php` contains the new route.
