# Morning Brew Collective - Backend

A Laravel 12 API backend for Morning Brew Collective, a 1970s-inspired kopitiam e-commerce platform.

## Technology Stack

- **Framework**: Laravel 12 (PHP 8.3+)
- **Database**: PostgreSQL 16
- **Cache**: Redis 7
- **Queue Driver**: Database
- **API**: REST with JSON responses

## Features

- ✅ Product catalog with categories (Coffee, Tea, Food, Beverage)
- ✅ Order management with IRAS-compliant GST calculation (9%)
- ✅ Pessimistic inventory locking to prevent overselling
- ✅ PDPA consent tracking with pseudonymization
- ✅ RESTful API endpoints (v1 public, v1/admin protected)
- ✅ Financial precision with DECIMAL(10,4) for pricing
- ✅ Soft deletes for data integrity

## Project Structure

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/Api/
│   │   └── Middleware/
│   ├── Models/
│   ├── Services/
│   ├── Providers/
│   ├── Exceptions/
│   └── Console/
├── config/
├── database/
│   ├── migrations/
│   └── seeders/
├── resources/views/
├── routes/
├── storage/
├── public/
└── bootstrap/
```

## Database Schema

### Models
- **Product**: Catalog items with stock management
- **Order**: Customer orders with GST calculation
- **OrderItem**: Individual items in orders
- **PdpaConsent**: PDPA compliance tracking
- **User**: User accounts (Laravel default)

## API Endpoints

### Public Routes (v1/)
- `GET /api/v1/products` - List all products
- `GET /api/v1/products/{id}` - Get product details
- `POST /api/v1/orders` - Create new order
- `GET /api/v1/orders/{invoiceNumber}` - Lookup by invoice

### Admin Routes (v1/admin/)
- `GET /api/v1/admin/orders` - Paginated order list
- `GET /api/v1/admin/orders/{id}` - Get order details
- `PATCH /api/v1/admin/orders/{id}/status` - Update order status

## Configuration

### Environment Variables

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=morning_brew_collective
DB_USERNAME=postgres
DB_PASSWORD=password

REDIS_HOST=127.0.0.1
REDIS_PORT=6379

CACHE_DRIVER=redis
SESSION_DRIVER=database
QUEUE_CONNECTION=database

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
```

## Setup Instructions

### Prerequisites
- PHP 8.3+
- PostgreSQL 16
- Redis 7
- Composer

### Installation

```bash
# Copy environment file
cp .env.example .env

# Install dependencies
composer install

# Generate application key
php artisan key:generate

# Run migrations
php artisan migrate

# Start development server
php artisan serve
```

### Docker Setup

```bash
# Build and start all services
docker-compose up -d

# Run migrations in Docker
docker-compose exec backend php artisan migrate

# Access application
# Backend API: http://localhost:8000
# Frontend: http://localhost:3000
# Mailpit: http://localhost:8025
```

## Testing

```bash
# Run tests
php artisan test

# Run specific test
php artisan test --filter=OrderControllerTest
```

## Financial Precision

All financial calculations use `DECIMAL(10,4)` precision:
- 10 total digits
- 4 decimal places
- IRAS-compliant for Singapore GST

GST Calculation:
```php
$gst = $subtotal * 0.09  // 9% Singapore GST
$total = $subtotal + $gst
```

## Inventory Management

Pessimistic locking prevents race conditions:

```php
$product = Product::lockForUpdate()->find($productId);
// Stock is locked until transaction completes
$product->decrementStock($quantity);
```

## PDPA Compliance

Consent tracking with pseudonymization:

```php
PdpaConsent::recordConsent(
    consentType: 'TYPE_ORDER',
    email: 'customer@example.com',
    ipAddress: request()->ip()
);
```

## Deployment

### Production Checklist
- [ ] Set `APP_DEBUG=false`
- [ ] Set `APP_ENV=production`
- [ ] Run `php artisan config:cache`
- [ ] Run `php artisan route:cache`
- [ ] Configure proper database backups
- [ ] Set up Redis persistence
- [ ] Configure SSL/TLS
- [ ] Set up monitoring and logging

## Support

For issues or questions, please refer to the [Laravel documentation](https://laravel.com/docs).
