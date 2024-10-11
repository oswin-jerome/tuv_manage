# Use the official PHP image with FPM and necessary extensions
FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libjpeg62-turbo-dev \
    zip \
    unzip \
    nodejs \
    npm \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install NPM dependencies for Inertia.js (Vue, React, or Svelte)
RUN npm install -g npm@latest

# Copy existing application directory contents
COPY . /var/www

# Copy the existing application directory permissions
COPY --chown=www-data:www-data . /var/www

# Install PHP dependencies (Laravel)
RUN composer install --optimize-autoloader --no-dev

# Install NPM dependencies (for Inertia.js frontend)
RUN npm install && npm run build

# Set file permissions for Laravel
# RUN chown -R www-data:www-data /var/www \
RUN chmod -R 755 /var/www/storage

# Expose port 9000 and start PHP-FPM server
EXPOSE 9000

CMD ["php-fpm"]
