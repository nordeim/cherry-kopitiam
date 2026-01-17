# Clone repository
git clone <repository>
cd morning-brew

# Generate Laravel application key
make shell-app
php artisan key:generate
exit

# Start services with Singapore compliance
make dev
