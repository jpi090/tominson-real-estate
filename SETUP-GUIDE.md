# Quick Setup Guide

## Step-by-Step Instructions

### 1️⃣ Update Database (IMPORTANT!)

Open phpMyAdmin: http://localhost/phpmyadmin

1. Click on `real_estate` database (left sidebar)
2. Click "SQL" tab at the top
3. Copy ALL content from `backend/update-database.sql`
4. Paste into the SQL box
5. Click "Go" button

This will:
- Remove old admin table
- Add role column to users table
- Create test accounts

### 2️⃣ Restart Next.js

In your terminal:
```cmd
# Stop current server (Ctrl+C)
npm run dev
```

### 3️⃣ Test Everything

**Homepage:** http://localhost:3000
- Should load without errors
- Click "Login / Register" button

**Login Page:** http://localhost:3000/auth
- Try logging in with: admin@realestate.com / admin123
- Should redirect to Admin Dashboard

**Admin Dashboard:** http://localhost:3000/admin/dashboard
- Add a property
- View properties list
- Delete properties

**User Dashboard:** http://localhost:3000/user/dashboard
- Login with: user@realestate.com / user123
- View properties (read-only)

## What Changed?

✅ **Single Login Page** - `/auth` for everyone (no more separate admin/user login)
✅ **Role Selection** - Choose "User" or "Admin" during registration
✅ **Unified Database** - One users table with role column
✅ **Protected Routes** - Auto-redirect if not logged in
✅ **Logout Buttons** - Both dashboards have logout
✅ **Fixed API Errors** - Proper environment variable handling

## Test Accounts

| Role  | Email                    | Password  |
|-------|--------------------------|-----------|
| Admin | admin@realestate.com     | admin123  |
| User  | user@realestate.com      | user123   |

## Common Issues

**"Network Error"**
- Make sure XAMPP Apache is running
- Test: http://localhost/real-estate-backend/test.php

**"Login Failed"**
- Run the update-database.sql script
- Clear browser cache/localStorage

**"Not redirecting to dashboard"**
- Check browser console for errors
- Make sure you ran update-database.sql
