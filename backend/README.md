# PHP Backend Setup

## Quick Setup Steps:

1. **Install XAMPP** (if not installed)
   - Download from: https://www.apachefriends.org/
   - Install and start Apache and MySQL

2. **Setup Database**
   - Open phpMyAdmin: http://localhost/phpmyadmin
   - Create database named `real_estate`
   - Import `database.sql` file

3. **Deploy Backend**
   - Copy the entire `backend` folder to: `C:\xampp\htdocs\`
   - Rename it to `real-estate-backend`
   - Final path: `C:\xampp\htdocs\real-estate-backend\`

4. **Test Backend**
   - Open: http://localhost/real-estate-backend/api/properties.php
   - Should return: [] (empty array)

5. **Update Frontend**
   - Make sure `.env.local` has: NEXT_PUBLIC_API_URL=http://localhost/real-estate-backend/api
   - Restart Next.js dev server

## Troubleshooting:

- If you get CORS errors, check `config.php` has CORS headers
- If database connection fails, update credentials in `config.php`
- Default MySQL user: root, password: (empty)
