FROM php:8.2-fpm

COPY . /var/www

WORKDIR /var/www
# Arguments defined in docker-compose.yml
ARG user
ARG uid

# Install system dependencies
RUN apt-get update && apt-get upgrade -y


RUN apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libfreetype-dev \
		libjpeg62-turbo-dev \
		libpng-dev \
	&& docker-php-ext-configure gd --with-freetype --with-jpeg \
	&& docker-php-ext-install -j$(nproc) gd
    # && curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    # apt-get -y install build-essential nodejs npm
# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create system user to run Composer and Artisan Commands
RUN useradd -G www-data,root -u $uid -d /home/$user $user
RUN mkdir -p /home/$user/.composer && \
    chown -R $user:$user /home/$user

RUN chmod 644 /var/www/.env
RUN chown -R www-data:www-data /var/www/storage
RUN chmod -R 755 /var/www

# Set working directory
# WORKDIR /var/www
# WORKDIR /app

USER $user

# RUN mv .env .env

# Run Artisan commands as $user
# RUN su - $user -c "php artisan key:generate"
# RUN su - $user -c "php artisan migrate"
# RUN su - $user -c "php artisan jwt:secret"

RUN php /var/www artisan key:generate
RUN php /var/www artisan migrate --seed
RUN php /var/www artisan jwt:secret
RUN php /var/www artisan route:clear
RUN php /var/www artisan config:clear
RUN php /var/www artisan cache:clear
RUN php /var/www artisan storage:link

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]

