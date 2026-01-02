# Dekaplet - Shared Hosting Deployment Guide

This guide explains how to deploy Dekaplet on shared hosting that doesn't support `npm run build`.

## Pre-Deployment Checklist

Since shared hosting doesn't support Node.js build commands, you'll need to:
1. Build the frontend locally
2. Upload pre-built files

---

## Step 1: Build Frontend Locally

On your local machine or development environment:

```bash
cd /app/frontend
yarn install
yarn build
```

This creates a `build/` folder with all static files.

---

## Step 2: Directory Structure for Shared Hosting

```
your-domain.com/
├── public_html/                    # Web root (frontend)
│   ├── index.html
│   ├── static/
│   │   ├── css/
│   │   ├── js/
│   │   └── media/
│   ├── favicon.ico
│   ├── manifest.json
│   └── .htaccess                   # For React routing
│
├── api/                            # Laravel backend
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── public/
│   │   └── index.php               # Entry point
│   ├── routes/
│   ├── storage/
│   ├── vendor/
│   ├── .env
│   └── artisan
```

---

## Step 3: Upload Frontend Files

1. Open your hosting's **File Manager** or use **FTP**
2. Navigate to `public_html/`
3. Upload all contents from the `build/` folder
4. Create `.htaccess` in `public_html/`:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # Handle React Router
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} !^/api
    RewriteRule . /index.html [L]
    
    # Proxy API requests to Laravel
    RewriteCond %{REQUEST_URI} ^/api
    RewriteRule ^api/(.*)$ /api/public/index.php/$1 [L,QSA]
</IfModule>

# Enable CORS
<IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
</IfModule>

# Caching for static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

---

## Step 4: Upload Laravel Backend

1. Create an `api/` folder in your hosting root (NOT in public_html)
2. Upload the entire Laravel backend to `api/`
3. Update `api/.env`:

```env
APP_NAME=Dekaplet
APP_ENV=production
APP_KEY=base64:YOUR_KEY_HERE
APP_DEBUG=false
APP_URL=https://your-domain.com/api

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password

SANCTUM_STATEFUL_DOMAINS=your-domain.com
SESSION_DOMAIN=.your-domain.com
```

4. Create `api/public/.htaccess`:

```apache
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

---

## Step 5: Database Setup

1. Go to your hosting's **MySQL Databases** section
2. Create a new database (e.g., `dekaplet_db`)
3. Create a database user with all privileges
4. Update `api/.env` with database credentials
5. Import the database:

**Option A: Via phpMyAdmin**
- Export from development: `php artisan migrate:dump`
- Import the SQL file via phpMyAdmin

**Option B: Via SSH (if available)**
```bash
cd /home/username/api
php artisan migrate --force
php artisan db:seed --class=AdminUserSeeder --force
```

---

## Step 6: Set Permissions

Via FTP or SSH, set these permissions:

```bash
# Storage and cache directories
chmod -R 775 api/storage
chmod -R 775 api/bootstrap/cache

# If using SSH
cd /home/username/api
php artisan storage:link
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## Step 7: Update Frontend Environment

Before building, update `frontend/.env.production`:

```env
REACT_APP_BACKEND_URL=https://your-domain.com
```

Then rebuild:
```bash
yarn build
```

---

## Step 8: Configure cPanel/Plesk (if applicable)

### For cPanel:
1. Go to "Software" → "Select PHP Version"
2. Choose PHP 8.2+
3. Enable extensions: `pdo_mysql`, `mbstring`, `xml`, `json`, `tokenizer`

### For Plesk:
1. Go to "PHP Settings"
2. Select PHP 8.2+
3. Enable required extensions

---

## Step 9: SSL Certificate

1. Install SSL certificate via hosting panel
2. Enable "Force HTTPS" redirect
3. Update all URLs in `.env` to use `https://`

---

## Troubleshooting

### 404 Errors on React Routes
- Ensure `.htaccess` is properly configured
- Check if `mod_rewrite` is enabled

### API Connection Errors
- Verify `REACT_APP_BACKEND_URL` is correct
- Check CORS headers in Laravel
- Test API directly: `https://your-domain.com/api/health`

### Database Connection Issues
- Verify credentials in `.env`
- Check if database user has proper permissions
- Try `127.0.0.1` instead of `localhost`

### Storage Permission Issues
```bash
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

### Composer Dependencies (if SSH available)
```bash
cd api
composer install --no-dev --optimize-autoloader
```

---

## Files Required for Upload

### Frontend (to public_html/)
```
build/
├── index.html
├── favicon.ico
├── manifest.json
├── robots.txt
├── static/
│   ├── css/
│   ├── js/
│   └── media/
└── .htaccess (create manually)
```

### Backend (to api/)
```
backend/
├── app/
├── bootstrap/
├── config/
├── database/
├── public/
├── resources/
├── routes/
├── storage/
├── vendor/
├── .env
├── artisan
└── composer.json
```

---

## Quick Checklist

- [ ] Frontend built locally (`yarn build`)
- [ ] Frontend files uploaded to `public_html/`
- [ ] `.htaccess` created for React routing
- [ ] Laravel backend uploaded to `api/`
- [ ] Database created and configured
- [ ] `.env` updated with production settings
- [ ] Storage permissions set (775)
- [ ] SSL certificate installed
- [ ] Admin user seeded
- [ ] Test login and dashboard

---

## Support

For deployment issues, check:
1. Laravel logs: `api/storage/logs/laravel.log`
2. PHP error logs in hosting panel
3. Browser console for frontend errors
