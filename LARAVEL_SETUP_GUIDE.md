# Laravel 12 Setup & Quick Start Guide

## Project Status: ✅ COMPLETE

Morning Brew Collective backend is now fully scaffolded with Laravel 12 production-ready structure.

## Directory Structure Overview

```
backend/
├── app/                          # Application code
│   ├── Console/                  # Console commands & scheduling
│   ├── Events/                   # Event classes
│   ├── Exceptions/               # Exception handling
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── Api/             # REST API controllers
│   │   ├── Kernel.php           # HTTP middleware configuration
│   │   └── Middleware/          # Request middleware
│   ├── Jobs/                     # Queue jobs
│   ├── Listeners/                # Event listeners
│   ├── Models/                   # Eloquent models (Product, Order, etc.)
│   ├── Policies/                 # Authorization policies
│   ├── Providers/                # Service providers
│   └── Services/                 # Business logic services
│
├── bootstrap/
│   └── app.php                   # Application bootstrapping
│
├── config/                       # Configuration files
│   ├── app.php                   # Application settings (timezone, locale, etc.)
│   ├── auth.php                  # Authentication configuration
│   ├── broadcast.php             # Broadcasting configuration
│   ├── cache.php                 # Cache driver configuration
│   ├── database.php              # Database connections (PostgreSQL, Redis)
│   ├── filesystems.php           # Storage disk configuration
│   ├── logging.php               # Logging configuration
│   ├── mail.php                  # Email configuration
│   ├── queue.php                 # Queue driver configuration
│   ├── services.php              # Third-party services
│   └── session.php               # Session configuration
│
├── database/
│   ├── factories/                # Model factories for testing
│   ├── migrations/               # Database schema migrations
│   │   ├── 0001_01_01_000000_create_users_table.php
│   │   ├── 0001_01_01_000001_create_cache_table.php
│   │   ├── 0001_01_01_000002_create_jobs_table.php
│   │   ├── 0001_01_01_000003_create_sessions_table.php
│   │   ├── 2024_01_01_000000_create_products_table.php
│   │   ├── 2024_01_01_000001_create_orders_table.php
│   │   ├── 2024_01_01_000002_create_order_items_table.php
│   │   └── 2024_01_01_000003_create_pdpa_consents_table.php
│   └── seeders/                  # Database seeders
│
├── public/                       # Web root
│   └── index.php                 # Application entry point
│
├── resources/
│   └── views/                    # Blade templates
│
├── routes/
│   ├── api.php                   # API routes
│   ├── web.php                   # Web routes
│   └── console.php               # Console command routes
│
├── storage/
│   ├── app/                      # Application storage
│   │   └── public/               # Public file storage
│   ├── framework/
│   │   └── cache/                # Framework cache files
│   └── logs/                     # Application logs
│
├── tests/
│   ├── Feature/                  # Feature tests
│   └── Unit/                     # Unit tests
│
├── .editorconfig                 # Editor configuration
├── .env                          # Environment variables (local)
├── .env.example                  # Environment template
├── .gitignore                    # Git ignore rules
├── artisan                       # Laravel command line interface
├── composer.json                 # PHP dependencies
├── package.json                  # Node/npm configuration
├── phpunit.xml                   # Testing configuration
├── server.php                    # Development server helper
└── README.md                     # Project documentation
```

## Installation & Setup

### Prerequisites

- PHP 8.3+
- PostgreSQL 16
- Redis 7
- Composer (PHP dependency manager)
- Node.js (optional, for frontend assets)

### 1. Install PHP Dependencies

```bash
cd backend/
composer install
```

### 2. Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Generate application encryption key
php artisan key:generate
```

Update `.env` with your database credentials:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=morning_brew_collective
DB_USERNAME=postgres
DB_PASSWORD=your_password

REDIS_HOST=127.0.0.1
REDIS_PORT=6379

CACHE_DRIVER=redis
SESSION_DRIVER=database
QUEUE_CONNECTION=database
```

### 3. Run Database Migrations

```bash
# Create tables from migrations
php artisan migrate

# Option: Seed initial data
php artisan db:seed
```

### 4. Start Development Server

```bash
# Using Laravel built-in server
php artisan serve

# Or use PHP built-in server (port 8000)
php -S localhost:8000 -t public
```

Server runs at: `http://localhost:8000`

## Docker Setup

```bash
# From project root
docker-compose up -d

# Run migrations in container
docker-compose exec backend php artisan migrate

# Access services:
# Backend API: http://localhost:8000
# Frontend: http://localhost:3000
# Mailpit (email testing): http://localhost:8025
# PostgreSQL: localhost:5432
# Redis: localhost:6379
```

## Database Schema

### Products Table
- `id` - Primary key
- `name` - Product name
- `slug` - URL-friendly identifier
- `category` - COFFEE, TEA, FOOD, BEVERAGE
- `price` - DECIMAL(10,4) for precision
- `stock` - Available quantity
- `is_available` - Active status
- `is_featured` - Featured flag
- Timestamps and soft deletes

### Orders Table
- `id` - Primary key
- `invoice_number` - Unique invoice ID (MBC-{YYYYMMDD}-{random})
- `status` - PENDING, CONFIRMED, PREPARING, READY, COMPLETED, CANCELLED
- `subtotal` - DECIMAL(10,4)
- `gst_amount` - 9% GST calculated
- `total_amount` - Total with GST
- Timestamps

### OrderItems Table
- `id` - Primary key
- `order_id` - Foreign key to orders
- `product_id` - Foreign key to products
- `quantity` - Units ordered
- `unit_price` - Price at time of order
- Timestamps

### PdpaConsents Table
- `id` - Primary key
- `consent_type` - TYPE_ORDER, TYPE_MARKETING, TYPE_ANALYTICS
- `anonymized_id` - SHA-256 pseudonymized customer ID
- `consent_wording_hash` - Hash of consent text (audit trail)
- `ip_address` - Customer IP address
- Timestamps

## API Endpoints

### Public API (v1/)

```bash
# List all products
GET /api/v1/products

# Get product details
GET /api/v1/products/{id}

# Create order
POST /api/v1/orders
Content-Type: application/json

{
  "items": [
    {"product_id": 1, "quantity": 2}
  ],
  "notes": "Optional special instructions",
  "pdpa_consent_type": "TYPE_ORDER"
}

# Look up order by invoice
GET /api/v1/orders/{invoiceNumber}
```

### Admin API (v1/admin/) - Protected

```bash
# List orders with pagination
GET /api/v1/admin/orders?status=PENDING&limit=20

# Get order details
GET /api/v1/admin/orders/{id}

# Update order status
PATCH /api/v1/admin/orders/{id}/status
Content-Type: application/json

{
  "status": "PREPARING"
}
```

## Key Features

### Financial Precision
- All prices stored as `DECIMAL(10,4)` (10 digits, 4 decimal places)
- IRAS-compliant 9% GST calculation
- Uses `brick/math` for precise decimal arithmetic

### Inventory Management
- Pessimistic locking with `lockForUpdate()` prevents race conditions
- Reservation system for pending orders
- Stock tracking with reorder level alerts

### PDPA Compliance (Singapore)
- Consent tracking for all customer data
- SHA-256 pseudonymization for privacy
- Audit trail of consent records
- Supports multiple consent types: order, marketing, analytics

### Order Management
- Unique invoice number generation
- Multi-status workflow: PENDING → CONFIRMED → PREPARING → READY → COMPLETED
- Transaction safety for all operations
- Item-level tracking in OrderItems

## Configuration Files

### `config/database.php`
Defines database connections (PostgreSQL, MySQL, SQLite) and Redis configuration.

### `config/cache.php`
Cache driver setup (Redis preferred, fallback to database/file).

### `config/auth.php`
Authentication guard configuration (web sessions, API tokens).

### `config/queue.php`
Queue job configuration (database driver with fallback to sync).

### `config/mail.php`
Email configuration (SMTP, SendMail, Mailgun, PostMark).

### `config/filesystems.php`
File storage disk configuration (local, public, S3).

### `config/logging.php`
Application logging with multiple channels (single, daily, Slack).

## Middleware Stack

### Global Middleware (All Requests)
- `TrustProxies` - Trust proxy headers
- `HandleCors` - CORS handling
- `PreventRequestsDuringMaintenance` - Maintenance mode

### Web Middleware Group
- `EncryptCookies` - Cookie encryption
- `StartSession` - Session management
- `ShareErrorsFromSession` - Error sharing
- `VerifyCsrfToken` - CSRF protection

### API Middleware Group
- `ThrottleRequests` - Rate limiting
- `SubstituteBindings` - Route model binding

## Testing

```bash
# Run all tests
php artisan test

# Run specific test file
php artisan test tests/Feature/OrderControllerTest.php

# Run with coverage report
php artisan test --coverage

# Watch mode (re-run on file changes)
php artisan test --watch
```

Test configuration in `phpunit.xml`:
- SQLite in-memory database for speed
- Transaction rollback after each test
- Separate Unit and Feature test suites

## Artisan Commands

```bash
# Create a new model with migration
php artisan make:model Location -m

# Create a controller
php artisan make:controller Api/LocationController

# Create a service provider
php artisan make:provider LocationServiceProvider

# Clear application cache
php artisan cache:clear

# Optimize application
php artisan optimize

# Show available routes
php artisan route:list
```

## Troubleshooting

### "No application encryption key has been generated"
```bash
php artisan key:generate
```

### "SQLSTATE[HY000]: General error: 1 no such table: cache"
```bash
# Migration not run
php artisan migrate
```

### "Connection refused (PostgreSQL)"
```bash
# Check PostgreSQL is running
# Verify DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD in .env
# Test connection: psql -h localhost -U postgres
```

### "Redis connection refused"
```bash
# Check Redis is running
# Verify REDIS_HOST, REDIS_PORT in .env
# Test: redis-cli ping
```

## Production Deployment

### Pre-deployment Checklist
- [ ] `APP_DEBUG=false` in `.env`
- [ ] `APP_ENV=production`
- [ ] Strong `APP_KEY` generated
- [ ] Run `php artisan config:cache`
- [ ] Run `php artisan route:cache`
- [ ] Configure HTTPS/SSL
- [ ] Set up database backups
- [ ] Configure Redis persistence
- [ ] Set up log rotation
- [ ] Configure monitoring/alerts

### Deployment Commands

```bash
# Production setup
composer install --no-dev --optimize-autoloader
php artisan key:generate
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

## Project Files Summary

### Controllers (3)
- `Api/OrderController.php` - Order CRUD operations
- `Api/ProductController.php` - Product listing and search
- `Api/PdpaConsentController.php` - Consent recording

### Models (4)
- `Product.php` - Product catalog with stock management
- `Order.php` - Order with GST calculation
- `OrderItem.php` - Order line items
- `PdpaConsent.php` - PDPA compliance tracking

### Services (1)
- `InventoryService.php` - Pessimistic locking for stock reservation

### Config Files (11)
- `app.php`, `auth.php`, `broadcast.php`, `cache.php`, `database.php`, `filesystems.php`, `logging.php`, `mail.php`, `queue.php`, `services.php`, `session.php`

### Migrations (8)
- Laravel framework tables (users, cache, jobs, sessions)
- Application tables (products, orders, order_items, pdpa_consents)

### Routes (3)
- `api.php` - RESTful API routes
- `web.php` - Web routes
- `console.php` - Console commands

## Next Steps

1. **Frontend Integration**: Connect Next.js frontend to these API endpoints
2. **Authentication**: Implement JWT or session-based auth for admin routes
3. **Testing**: Write test cases for all controllers and services
4. **Seeding**: Add ProductSeeder to populate initial catalog
5. **Monitoring**: Set up error tracking (Sentry, LogRocket)
6. **Documentation**: Generate API documentation (Laravel Scribe)

## Support & Documentation

- Laravel Docs: https://laravel.com/docs/12.x
- PostgreSQL Docs: https://www.postgresql.org/docs/
- Redis Docs: https://redis.io/documentation/
- PHP 8.3 Guide: https://www.php.net/manual/en/

---

**Project**: Morning Brew Collective
**Backend**: Laravel 12 (PHP 8.3+)
**Database**: PostgreSQL 16
**Cache**: Redis 7
**Region**: Asia/Singapore
**Compliance**: PDPA, GST (9%)
