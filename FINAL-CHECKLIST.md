# ✅ Final Setup Checklist

Follow these steps in order:

## 1. Update Database ⚠️ CRITICAL
- [ ] Open http://localhost/phpmyadmin
- [ ] Click `real_estate` database
- [ ] Click "SQL" tab
- [ ] Open `backend/update-database.sql` file
- [ ] Copy ALL content
- [ ] Paste into phpMyAdmin SQL box
- [ ] Click "Go"
- [ ] Verify: Should see "2 rows inserted" message

## 2. Verify Backend
- [ ] Open http://localhost/real-estate-backend/test.php
- [ ] Should see: `{"status":"success","message":"PHP backend is working!"...}`
- [ ] Open http://localhost/real-estate-backend/api/properties.php
- [ ] Should see: `[]` (empty array)

## 3. Restart Next.js
- [ ] Stop current dev server (Ctrl+C in terminal)
- [ ] Run: `npm run dev`
- [ ] Wait for "ready - started server on 0.0.0.0:3000"

## 4. Test Homepage
- [ ] Open http://localhost:3000
- [ ] Should load without errors
- [ ] Should see "Find Your Properties" hero section
- [ ] Should see "Login / Register" button in navbar

## 5. Test Login (Admin)
- [ ] Click "Login / Register" button
- [ ] Should go to http://localhost:3000/auth
- [ ] Enter email: `admin@realestate.com`
- [ ] Enter password: `admin123`
- [ ] Click "Login"
- [ ] Should redirect to http://localhost:3000/admin/dashboard
- [ ] Should see "Welcome, Admin User" at top

## 6. Test Admin Features
- [ ] Fill out "Add Property" form:
  - Title: `Luxury Apartment`
  - Location: `New York, NY`
  - Price: `450000`
  - Beds: `3`
  - Baths: `2`
  - Sqft: `1500`
  - Image URL: `https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500`
- [ ] Click "Add Property"
- [ ] Should see property appear in "Properties List" below
- [ ] Click "Delete" button
- [ ] Property should disappear

## 7. Test Logout
- [ ] Click "Logout" button (top right)
- [ ] Should redirect to homepage
- [ ] Should see "Login / Register" button again

## 8. Test Registration
- [ ] Click "Login / Register"
- [ ] Click "Don't have an account? Register"
- [ ] Fill form:
  - Name: `Test User`
  - Email: `test@example.com`
  - Password: `test123`
  - Role: `User`
- [ ] Click "Register"
- [ ] Should see "Registration successful! Please login."
- [ ] Login with new credentials
- [ ] Should redirect to http://localhost:3000/user/dashboard

## 9. Test User Dashboard
- [ ] Should see "Welcome, Test User"
- [ ] Should see properties (if any were added)
- [ ] Should NOT see "Add Property" form (users can only view)
- [ ] Click "Logout"

## 10. Final Verification
- [ ] Homepage loads ✅
- [ ] Login/Register works ✅
- [ ] Admin can add/delete properties ✅
- [ ] User can view properties ✅
- [ ] Logout works ✅
- [ ] Red and white theme ✅

## 🎉 Success!

If all checkboxes are checked, your application is working perfectly!

## 🆘 If Something Fails

**Network Error:**
1. Check XAMPP Apache is running
2. Test: http://localhost/real-estate-backend/test.php
3. Check `.env.local` file exists

**Login Failed:**
1. Make sure you ran `update-database.sql`
2. Check phpMyAdmin > real_estate > users table has data
3. Clear browser localStorage (F12 > Application > Local Storage > Clear)

**Not Redirecting:**
1. Check browser console (F12) for errors
2. Make sure Next.js dev server is running
3. Try hard refresh (Ctrl+Shift+R)

**Properties Not Showing:**
1. Add a property from admin dashboard first
2. Check browser console for API errors
3. Verify backend: http://localhost/real-estate-backend/api/properties.php
