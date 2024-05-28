FROM php:8.2-fpm

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

# Set working directory
# WORKDIR /var/www
WORKDIR /app

USER $user

# Run Artisan commands as $user
# RUN su - $user -c "php artisan key:generate"
# RUN su - $user -c "php artisan migrate"
# RUN su - $user -c "php artisan jwt:secret"

# Expose port 9000 and start php-fpm server
# EXPOSE 9000
# CMD ["php-fpm"]

COPY ./run.sh /app/run.sh

# RUN chown $user:$user /app/run.sh
# RUN chmod +x /app/run.sh

ENTRYPOINT ["/app/run.sh"]