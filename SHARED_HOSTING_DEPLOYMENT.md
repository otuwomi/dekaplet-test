# Deploying Dekaplet to Shared Hosting

## Prerequisites

**Shared Hosting Requirements:**
- PHP 8.2 or higher
- MySQL/MariaDB database
- SSH access (optional but recommended)
- Composer support
- Node.js (for building React)
- Custom domain or subdomain

**Important Note:** Shared hosting has limitations. For production fintech apps, consider VPS/cloud hosting for better security, performance, and control.

---

## Step 1: Prepare Your Application

### A. Build React Frontend for Production

On your local machine or development server:

```bash
# Navigate to frontend directory
cd /app/frontend

# Install dependencies (if not already done)
yarn install

# Build for production
yarn build
```

This creates a `/app/frontend/build` directory with optimized static files.

### B. Prepare Laravel Backend

```bash
# Navigate to backend directory
cd /app/backend

# Install production dependencies
composer install --optimize-autoloader --no-dev

# Clear and optimize
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
php artisan optimize
```

---

## Step 2: Database Setup on Shared Hosting

### Create MySQL Database

1. **Login to cPanel** (or your hosting control panel)
2. **Go to MySQL Databases**
3. **Create a new database:**
   - Database name: `dekaplet_db` (or your preferred name)
4. **Create a database user:**
   - Username: `dekaplet_user`
   - Password: `[strong_password]`
5. **Add user to database** with ALL PRIVILEGES

**Note the credentials:**
- Database Name: `username_dekaplet_db` (usually prefixed with your username)
- Database User: `username_dekaplet_user`
- Database Password: `[your_password]`
- Database Host: `localhost` (usually)

---

## Step 3: Upload Files

### Option A: Using File Manager (cPanel)

#### Upload Backend:
1. **Compress your backend folder:**
   ```bash
   cd /app
   tar -czf backend.tar.gz backend/
   ```

2. **Upload to shared hosting:**
   - Go to cPanel → File Manager
   - Navigate to your domain root (usually `public_html`)
   - Create folder: `api` (for backend)
   - Upload `backend.tar.gz` to `api` folder
   - Extract the archive

3. **Move files:**
   - Move everything from `api/backend/*` to `api/`
   - Your structure should be: `public_html/api/app`, `public_html/api/routes`, etc.

#### Upload Frontend:
1. **Upload React build files:**
   - Compress: `tar -czf build.tar.gz frontend/build/*`
   - Upload to `public_html` root
   - Extract

2. **Move files:**
   - Move contents of `build/*` to `public_html/` root
   - You should have: `public_html/index.html`, `public_html/static`, etc.

### Option B: Using FTP/SFTP (Recommended)

Use FileZilla or similar:
1. **Backend:** Upload `/app/backend/*` to `public_html/api/`
2. **Frontend:** Upload `/app/frontend/build/*` to `public_html/`

### Option C: Using Git (Best Method)

If your hosting supports SSH:

```bash
# SSH into your server
ssh username@yourserver.com

# Clone your repository
cd public_html
git clone https://github.com/yourusername/dekaplet.git .

# Install backend dependencies
cd api
composer install --optimize-autoloader --no-dev

# Build frontend
cd ../frontend
npm install
npm run build

# Move frontend files
mv build/* ../
```

---

## Step 4: Configure Laravel Backend

### A. Create .env file in `public_html/api/`

```bash
# Copy from .env.example
cp .env.example .env
```

### B. Edit .env file:

```env
APP_NAME=Dekaplet
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://yourdomain.com/api

# Database Configuration
DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=username_dekaplet_db
DB_USERNAME=username_dekaplet_user
DB_PASSWORD=your_database_password

# Session & Cache (use file driver for shared hosting)
SESSION_DRIVER=file
CACHE_STORE=file
QUEUE_CONNECTION=database

# Sanctum
SANCTUM_STATEFUL_DOMAINS=yourdomain.com,www.yourdomain.com

# Mail (configure your email settings)
MAIL_MAILER=smtp
MAIL_HOST=smtp.yourdomain.com
MAIL_PORT=587
MAIL_USERNAME=noreply@yourdomain.com
MAIL_PASSWORD=your_email_password
MAIL_ENCRYPTION=tls
```

### C. Generate App Key:

```bash
cd public_html/api
php artisan key:generate
```

### D. Run Migrations:

```bash
php artisan migrate --force
php artisan db:seed --class=AdminUserSeeder
```

### E. Set Permissions:

```bash
chmod -R 755 storage bootstrap/cache
chown -R username:username storage bootstrap/cache
```

---

## Step 5: Configure Web Server

### A. Create .htaccess in `public_html/` (root)

This handles React routing:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    
    # Don't rewrite files or directories
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    
    # Don't rewrite API requests
    RewriteCond %{REQUEST_URI} !^/api
    
    # Rewrite everything else to index.html
    RewriteRule ^ index.html [L]
</IfModule>
```

### B. Create .htaccess in `public_html/api/public/`

Laravel's default .htaccess:

```apache
<IfModule mod_rewrite.c>
    <IfModule mod_negotiation.c>
        Options -MultiViews -Indexes
    </IfModule>

    RewriteEngine On

    # Handle Authorization Header
    RewriteCond %{HTTP:Authorization} .
    RewriteRule .* - [E=HTTP_AUTHORIZATION:%{HTTP:Authorization}]

    # Redirect Trailing Slashes...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} (.+)/$
    RewriteRule ^ %1 [L,R=301]

    # Send Requests To Front Controller...
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ index.php [L]
</IfModule>
```

### C. Point API to Laravel's public directory

**Create symlink or subdomain:**

#### Method 1: Symlink (if allowed)
```bash
cd public_html
ln -s api/public api
```

#### Method 2: Subdomain (Recommended)
1. In cPanel → Subdomains
2. Create subdomain: `api.yourdomain.com`
3. Point document root to: `public_html/api/public`

---

## Step 6: Configure React Frontend

### Update API URL

Edit `public_html/env-config.js` (create if doesn't exist):

```javascript
window.ENV = {
  REACT_APP_BACKEND_URL: 'https://api.yourdomain.com'
  // OR if using path: 'https://yourdomain.com/api'
};
```

### Update index.html

Add this script tag before other scripts:

```html
<script src="/env-config.js"></script>
```

### Update React to use runtime config

Edit your frontend code to use:
```javascript
const BACKEND_URL = window.ENV?.REACT_APP_BACKEND_URL || process.env.REACT_APP_BACKEND_URL;
```

---

## Step 7: Final Checks

### Test Backend API:
```bash
curl https://api.yourdomain.com/api/health
```

Should return:
```json
{"status":"healthy","timestamp":"...","service":"Dekaplet API"}
```

### Test Frontend:
Visit `https://yourdomain.com` - should load the Dekaplet homepage

### Test Login:
1. Go to `https://yourdomain.com/login`
2. Login with: `admin@dekaplet.com` / `admin123`
3. Should redirect to dashboard

---

## Common Issues & Solutions

### Issue 1: 500 Internal Server Error

**Solution:**
```bash
# Check Laravel logs
cat storage/logs/laravel.log

# Set permissions
chmod -R 755 storage bootstrap/cache

# Clear cache
php artisan cache:clear
php artisan config:clear
```

### Issue 2: "Mix" or build files not found

**Solution:**
- Ensure all files from `frontend/build/*` are in `public_html/`
- Check that `static/` folder exists
- Verify `index.html` is in root

### Issue 3: API requests fail with CORS error

**Solution:**
Update `api/app/Http/Middleware/Cors.php`:
```php
->header('Access-Control-Allow-Origin', 'https://yourdomain.com')
```

### Issue 4: Database connection failed

**Solution:**
- Verify database credentials in `.env`
- Check if database exists in cPanel
- Ensure user has ALL PRIVILEGES
- Try changing `DB_HOST` to `127.0.0.1` instead of `localhost`

### Issue 5: Routes not working

**Solution:**
- Enable `mod_rewrite` in `.htaccess`
- Check if `.htaccess` files are uploaded
- Contact hosting support to enable mod_rewrite

---

## Security Considerations for Production

1. **Change default credentials:**
   ```bash
   php artisan tinker
   $admin = User::where('email', 'admin@dekaplet.com')->first();
   $admin->password = Hash::make('your_new_secure_password');
   $admin->save();
   ```

2. **Enable HTTPS:**
   - Get SSL certificate from cPanel (Let's Encrypt free)
   - Force HTTPS in `.htaccess`

3. **Disable debug mode:**
   ```env
   APP_DEBUG=false
   ```

4. **Protect sensitive files:**
   - `.env` should NOT be web-accessible
   - Only Laravel's `public/` folder should be exposed

5. **Set up backups:**
   - Database: Use cPanel backup or cron job
   - Files: Regular backups of `storage/` and database

---

## Alternative: Docker on Shared Hosting

Some modern shared hosts support Docker. If available, you can:
1. Use the existing Docker setup
2. Deploy containers
3. Much easier than manual setup

---

## Recommended Hosting Providers

For a fintech application like Dekaplet, consider:

**VPS/Cloud (Recommended):**
- DigitalOcean ($6-12/month)
- Linode ($5-10/month)
- Vultr ($6-12/month)
- AWS Lightsail ($5-10/month)

**Shared Hosting (Budget option):**
- SiteGround (PHP 8.2, SSH access)
- A2 Hosting (Fast, good support)
- Hostinger (Affordable)

---

## Need Help?

If you encounter issues:
1. Check `storage/logs/laravel.log` for backend errors
2. Check browser console for frontend errors
3. Contact your hosting support for server configuration
4. Consider upgrading to VPS for better control

---

## Post-Deployment Checklist

- [ ] Backend API health check works
- [ ] Frontend loads correctly
- [ ] Login/registration works
- [ ] User dashboard loads
- [ ] Admin dashboard loads
- [ ] Database migrations completed
- [ ] SSL certificate installed
- [ ] Email sending configured
- [ ] Backups scheduled
- [ ] Error logging configured
- [ ] Security hardening complete

---

**Your application should now be live at https://yourdomain.com!**

For the admin panel: https://yourdomain.com/admin
Login: admin@dekaplet.com / admin123 (change this immediately!)
