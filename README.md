# SmatRentalPro

## Step By Step To Run this backend

1. Run ```cd backeknd```
2. Run ```Composer install```
3. Run ```cp .env.example .env``` or Just copy .env.example into the file .env
4. Copy the following values and replace where possible
* Replace the database section
```
DB_CONNECTION=sqlite
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=smat_rental_pro
# DB_USERNAME=root
# DB_PASSWORD=
```
* Replace the mail section
```
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=465
MAIL_USERNAME=gondomalvernb@gmail.com
MAIL_PASSWORD=hpmzrmymmewqrtzq
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="gondomalvernb@gmail.com"
MAIL_FROM_NAME="${APP_NAME}"
```
* Then add this for image storage
```
CLOUDINARY_URL=cloudinary://685528468382649:Hr0QBqq4q55H95iJQX1a0S43bvM@malvern-bright-shop
CLOUDINARY_CLOUD_NAME=malvern-bright-shop
CLOUDINARY_API_KEY=685528468382649
CLOUDINARY_API_SECRET=Hr0QBqq4q55H95iJQX1a0S43bvM
CLOUDINARY_SECURE_URL=true
```

#Run the following commands
```
php artisan key:generate
php artisan migrate:refresh --seed
php artisan jwt:secret
php artisan serve