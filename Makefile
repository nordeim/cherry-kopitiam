# Morning Brew Collective - Operational Shortcuts

.PHONY: up down install migrate seed test logs shell-backend shell-frontend

up:
	cd infra && docker-compose up -d

down:
	cd infra && docker-compose down

install:
	cd infra && docker-compose exec backend composer install
	cd frontend && npm install

migrate:
	cd infra && docker-compose exec backend php artisan migrate

seed:
	cd infra && docker-compose exec backend php artisan db:seed

test:
	cd infra && docker-compose exec backend php artisan test

logs:
	cd infra && docker-compose logs -f

shell-backend:
	cd infra && docker-compose exec backend bash

shell-frontend:
	cd infra && docker-compose exec frontend sh
