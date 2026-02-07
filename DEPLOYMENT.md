# 🚀 Deployment Guide

## Quick Start (5 Minutes)

### Step 1: Update Database (2 min)
```
1. Open: http://localhost/phpmyadmin
2. Select: real_estate database
3. Click: SQL tab
4. Copy content from: backend/update-database.sql
5. Paste and click: Go
```

### Step 2: Restart Next.js (1 min)
```cmd
# Stop server (Ctrl+C)
npm run dev
```

### Step 3: Test (2 min)
```
1. Open: http://localhost:3000
2. Click: Login / Register
3. Login: admin@realestate.com / admin123
4. Add a property
5. Success! ✅
```

## Detailed Setup

### Prerequisites
- ✅ Node.js installed
- ✅ XAMPP installed and running
- ✅ Database created (real_estate)
- ✅ Backend deployed to htdocs

### Environment Check

**Test Backend:**
```
http://localhost/real-estate-backend/test.php
Expected: {"status":"success"...}
```

**Test API:**
```
http://localhost/real-estate-backend/api/properties.php
Expected: [] or [properties...]
```

**Test Frontend:**
```
http://localhost:3000
Expected: Homepage loads
```

## File Structure

```
zilla/
├── pages/
│   ├── index.tsx              # Homepage
│   ├── auth.tsx               # Login/Register
│   ├── about.tsx              # About page
│   ├── service.tsx            # Services page
│   ├── property.tsx           # Browse properties
│   ├── contact.tsx            # Contact form
│   ├── admin/
│   │   └── dashboard.tsx      # Admin panel
│   └── user/
│       └── dashboard.tsx      # User panel
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Stats.tsx
│   ├── Services.tsx
│   ├── Properties.tsx
│   ├── Footer.tsx
│   └── Loading.tsx
├── backend/
│   ├── config.php
│   ├── database.sql
│   ├── update-database.sql
│   └── api/
│       ├── auth.php
│       └── properties.php
├── styles/
│   └── globals.css
├── .env.local
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## URLs Reference

### Frontend URLs
- Homepage: http://localhost:3000
- Auth: http://localhost:3000/auth
- About: http://localhost:3000/about
- Services: http://localhost:3000/service
- Properties: http://localhost:3000/property
- Contact: http://localhost:3000/contact
- User Dashboard: http://localhost:3000/user/dashboard
- Admin Dashboard: http://localhost:3000/admin/dashboard

### Backend URLs
- Test: http://localhost/real-estate-backend/test.php
- Auth API: http://localhost/real-estate-backend/api/auth.php
- Properties API: http://localhost/real-estate-backend/api/properties.php

### Database
- phpMyAdmin: http://localhost/phpmyadmin
- Database: real_estate
- Tables: users, properties

## Common Commands

### Frontend
```cmd
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Backend
```cmd
# Copy backend to XAMPP
xcopy backend C:\xampp\htdocs\real-estate-backend\ /E /I /Y

# Test backend
curl http://localhost/real-estate-backend/test.php
```

## Troubleshooting

### Issue: Network Error
**Solution:**
1. Check XAMPP Apache is running
2. Test: http://localhost/real-estate-backend/test.php
3. Verify .env.local exists
4. Restart Next.js

### Issue: Login Failed
**Solution:**
1. Run update-database.sql
2. Check users table has data
3. Clear browser localStorage
4. Try again

### Issue: Properties Not Showing
**Solution:**
1. Add property from admin dashboard
2. Check API: http://localhost/real-estate-backend/api/properties.php
3. Check browser console for errors

### Issue: Page Not Found
**Solution:**
1. Make sure Next.js is running
2. Check URL is correct
3. Hard refresh (Ctrl+Shift+R)

### Issue: Database Connection Failed
**Solution:**
1. Check MySQL is running in XAMPP
2. Verify database name is "real_estate"
3. Check credentials in backend/config.php
4. Default: user=root, password=(empty)

## Production Deployment

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy dist folder
3. Set environment variable: `NEXT_PUBLIC_API_URL`

### Backend (Shared Hosting)
1. Upload backend folder
2. Import database.sql
3. Update config.php with production credentials
4. Update CORS headers if needed

## Security Checklist

- [ ] Change default admin password
- [ ] Update database credentials
- [ ] Enable HTTPS in production
- [ ] Set proper CORS origins
- [ ] Validate all inputs
- [ ] Use environment variables
- [ ] Regular backups
- [ ] Monitor error logs

## Performance Tips

1. **Images**: Use optimized images (WebP format)
2. **Caching**: Enable browser caching
3. **CDN**: Use CDN for static assets
4. **Database**: Add indexes on frequently queried columns
5. **API**: Implement pagination for large datasets

## Maintenance

### Regular Tasks
- Backup database weekly
- Update dependencies monthly
- Monitor error logs
- Check disk space
- Test all features after updates

### Database Backup
```sql
-- Export from phpMyAdmin
-- Or use command line:
mysqldump -u root real_estate > backup.sql
```

### Restore Database
```sql
-- Import in phpMyAdmin
-- Or use command line:
mysql -u root real_estate < backup.sql
```

## Support

### Documentation
- README.md - Project overview
- SETUP-GUIDE.md - Quick setup
- FEATURES.md - Feature list
- CHANGES.md - Changelog
- FINAL-CHECKLIST.md - Testing checklist

### Test Credentials
- Admin: admin@realestate.com / admin123
- User: user@realestate.com / user123

## Success Indicators

✅ Homepage loads without errors
✅ Can register new users
✅ Can login as admin/user
✅ Admin can add properties
✅ Admin can delete properties
✅ Users can view properties
✅ Logout works correctly
✅ All pages are accessible
✅ Responsive on mobile
✅ No console errors

## Next Steps

1. ✅ Complete setup
2. ✅ Test all features
3. ✅ Add sample properties
4. ✅ Customize content
5. ✅ Deploy to production
6. ✅ Monitor and maintain

---

**Need Help?** Check the documentation files or review the code comments.
