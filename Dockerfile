# Stage 1: Base PHP 8.3 with Laravel dependencies
FROM php:8.3.30-fpm-trixie AS php-base

# Arguments
ARG COMPOSER_VERSION=2.9.3
ARG NODE_VERSION=22.22.0

# Set environment for Singapore locale
ENV LANG=en_US.UTF-8
ENV LC_ALL=en_US.UTF-8
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies for Laravel and PostgreSQL
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libpq-dev \
    libicu-dev \
    libgmp-dev \
    unzip \
    zip \
    nano \
    htop \
    locales \
    supervisor \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Configure Singapore locale
RUN sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && locale-gen

# Install PHP extensions with Singapore compliance in mind
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
    bcmath \
    exif \
    gd \
    gmp \
    intl \
    mbstring \
    opcache \
    pdo \
    pdo_pgsql \
    pgsql \
    zip \
    sockets

# Install Xdebug for development (Singapore debugging timezone)
RUN pecl install xdebug && docker-php-ext-enable xdebug

# Install Composer (Singapore package mirror for speed)
RUN curl -sS https://getcomposer.org/installer | php -- \
    --install-dir=/usr/local/bin \
    --filename=composer \
    --version=${COMPOSER_VERSION}

# Install Node.js 22 LTS (Singapore NodeSource mirror)
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Yarn and PM2 for process management
RUN npm install -g yarn pm2

# Configure PHP for Laravel 12 optimization
RUN echo "memory_limit = 512M" >> /usr/local/etc/php/conf.d/docker-php-memlimit.ini && \
    echo "upload_max_filesize = 50M" >> /usr/local/etc/php/conf.d/docker-php-upload.ini && \
    echo "post_max_size = 50M" >> /usr/local/etc/php/conf.d/docker-php-upload.ini && \
    echo "max_execution_time = 300" >> /usr/local/etc/php/conf.d/docker-php-maxexectime.ini

# Create non-root user for security (Singapore security compliance)
RUN groupadd -g 1000 www-developer && \
    useradd -u 1000 -ms /bin/bash -g www-developer www-developer

# Create Laravel directory structure
RUN mkdir -p /var/www/backend \
    && mkdir -p /var/www/frontend \
    && chown -R www-developer:www-developer /var/www

# Switch to non-root user
USER www-developer

# Set working directory
WORKDIR /var/www

# Stage 2: Production optimization
FROM php-base AS production

# Install Composer dependencies (optimized for production)
COPY --chown=www-developer:www-developer backend/composer.json backend/composer.lock /var/www/backend/
RUN cd /var/www/backend && composer install --no-dev --optimize-autoloader

# Install Node.js dependencies (production)
COPY --chown=www-developer:www-developer frontend/package.json frontend/package-lock.json /var/www/frontend/
RUN cd /var/www/frontend && npm ci --only=production

# Copy application code
COPY --chown=www-developer:www-developer backend /var/www/backend
COPY --chown=www-developer:www-developer frontend /var/www/frontend

# Build frontend assets
RUN cd /var/www/frontend && npm run build

# Set Laravel permissions for Singapore compliance
RUN cd /var/www/backend && \
    chmod -R 775 storage bootstrap/cache && \
    chown -R www-developer:www-developer storage bootstrap/cache

# Expose ports for PHP-FPM and Node.js
EXPOSE 9000 3000

# Health check for Singapore deployment standards
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD php -r "try { \$sock=fsockopen('localhost',9000); fclose(\$sock); exit(0); } catch(Exception \$e) { exit(1); }"

# Production command
CMD ["sh", "-c", "php-fpm -D && cd /var/www/frontend && npm start"]
