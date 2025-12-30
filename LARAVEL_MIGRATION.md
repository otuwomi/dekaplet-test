# Dekaplet - Laravel + React Migration Complete

## Tech Stack Migration

### Backend: Laravel 11 with Laravel Sanctum
- **Framework**: Laravel 11 (latest)
- **Authentication**: Laravel Sanctum (token-based API authentication)
- **Database**: MySQL (MariaDB 10.11)
- **Port**: 8001

### Frontend: React 19
- **Framework**: React 19 with React Router
- **UI Library**: shadcn/ui components
- **Styling**: Tailwind CSS with dark theme
- **State Management**: React Context API for authentication
- **Port**: 3000

### Database: MySQL
- **Database Name**: dekaplet
- **User**: dekaplet
- **Tables**:
  - users (Laravel default with Sanctum tokens)
  - contact_forms
  - newsletters
  - personal_access_tokens (Sanctum)

## API Endpoints

### Public Endpoints
- `GET /api/` - Root endpoint
- `GET /api/health` - Health check
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/contact` - Submit contact form
- `POST /api/newsletter` - Subscribe to newsletter

### Protected Endpoints (Require Authentication)
- `POST /api/logout` - Logout user
- `GET /api/user` - Get authenticated user
- `GET /api/contact` - Get all contact forms (admin)
- `GET /api/contact/{id}` - Get single contact form
- `PUT /api/contact/{id}` - Update contact form status
- `GET /api/newsletter` - Get all newsletter subscriptions (admin)

## Authentication Flow

1. **Register**: POST `/api/register` with name, email, password, password_confirmation
2. **Login**: POST `/api/login` with email, password
3. **Response**: Returns user object and Bearer token
4. **Protected Requests**: Include `Authorization: Bearer {token}` header
5. **Logout**: POST `/api/logout` with Bearer token

## Frontend Pages

### Public Pages
- Home (/)
- How It Works (/how-it-works)
- Features (/features)
- For Developers (/developers)
- Pricing (/pricing)
- About Us (/about)
- Contact (/contact)
- Privacy Policy (/privacy)
- Terms of Service (/terms)
- Login (/login)
- Register (/register)

### Protected Pages
- Dashboard (/dashboard) - Requires authentication

## Features Implemented

### Backend (Laravel)
✅ RESTful API with standard Laravel routes
✅ Laravel Sanctum authentication
✅ MySQL database with migrations
✅ CORS middleware for React frontend
✅ Contact form submission and retrieval
✅ Newsletter subscription with duplicate prevention
✅ User registration and login
✅ Token-based authentication
✅ Protected routes middleware

### Frontend (React)
✅ Authentication context with React Context API
✅ Login and Register pages
✅ Protected Dashboard page
✅ Auth-aware Header component (shows Login/Logout)
✅ Axios configuration with Bearer tokens
✅ Dark theme design (cyan-green #00FFD1 accent)
✅ 3D Spline animation on hero section
✅ Professional fintech imagery
✅ Mobile-responsive navigation
✅ Toast notifications for user feedback

## Environment Configuration

### Backend (.env)
```
APP_NAME=Dekaplet
APP_URL=http://localhost:8001
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=dekaplet
DB_USERNAME=dekaplet
DB_PASSWORD=dekaplet_password
SANCTUM_STATEFUL_DOMAINS=localhost:3000,localhost:8001
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

## Running the Application

### Backend (Laravel)
```bash
cd /app/backend
php artisan serve --host=0.0.0.0 --port=8001
```

### Frontend (React)
```bash
cd /app/frontend
yarn start
```

### Services (Supervisor)
- Backend: Automatically starts Laravel on port 8001
- Frontend: Automatically starts React on port 3000
- MongoDB: Running (for any future NoSQL needs)

## Testing

### Test Laravel API
```bash
# Health check
curl http://localhost:8001/api/health

# Root endpoint
curl http://localhost:8001/api/

# Register user
curl -X POST http://localhost:8001/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123","password_confirmation":"password123"}'

# Login
curl -X POST http://localhost:8001/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Submit contact form
curl -X POST http://localhost:8001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","interest":"business","message":"Hello"}'
```

## Next Steps

1. **KYC/AML Integration**: Implement identity verification
2. **Payment Processing**: Integrate blockchain APIs (Moralis, Chainstack)
3. **Wallet Management**: Build multi-chain wallet functionality
4. **Admin Dashboard**: Create admin panel for managing users and transactions
5. **API Documentation**: Generate Swagger/OpenAPI documentation
6. **Email Notifications**: Configure SMTP for email notifications
7. **Deployment**: Configure for production deployment

## Notes

- Laravel Sanctum uses token-based authentication (simpler than OAuth for SPAs)
- Frontend stores token in localStorage
- All API requests include Authorization header with Bearer token
- Protected routes automatically check for valid token
- CORS is configured to allow requests from React frontend
- MySQL is used instead of MongoDB for better relational data handling
