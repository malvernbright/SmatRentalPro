#!/bin/sh

cd /app
php artisan migrate:refresh --seed
php artisan key:generate
php artisan jwt:secret
php artisan serve --host=0.0.0.0 --port=9000