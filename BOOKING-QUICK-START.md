# 📅 Booking System - Quick Start

## ✅ Setup Complete!

The booking system is now live and ready to use!

---

## 🚀 Test It Now!

### Step 1: Login as User
```
URL: http://localhost:3000/auth
Email: user@realestate.com
Password: user123
```

### Step 2: Book a Property
1. You'll see the User Dashboard
2. Click **"Browse Properties"** tab (if not already there)
3. Find any property
4. Click **"📅 Book Property"** button
5. Click **"OK"** to confirm
6. Success! Property is booked for 7 days

### Step 3: View Your Booking
1. Click **"✅ My Bookings"** tab
2. See your booked property with:
   - Property image and details
   - Expiry date (7 days from now)
   - Cancel button

### Step 4: Check as Admin
1. Logout (top right)
2. Login as admin:
   ```
   Email: admin@realestate.com
   Password: admin123
   ```
3. Go to Admin Dashboard
4. Click **"📅 Bookings"** tab
5. See the booking you just made!

---

## 🎯 Key Features

### Users Can:
- ✅ Book properties (7-day reservation)
- ✅ View all their bookings
- ✅ Cancel bookings anytime
- ✅ See expiry dates
- ✅ Browse available properties

### Admins Can:
- ✅ View ALL bookings from all users
- ✅ See user details for each booking
- ✅ Monitor active vs expired bookings
- ✅ Track booking dates and expiry

### Automatic:
- ✅ Bookings expire after 7 days
- ✅ Properties become available again
- ✅ Status updates automatically

---

## 📊 What You'll See

### User Dashboard:

**Stats Cards:**
```
Available Properties: 10
My Bookings: 1
Filtered Results: 10
Expired: 0
```

**Tabs:**
- 🏘️ Browse Properties
- ✅ My Bookings (1)

**In Browse:**
- Properties with "Book Property" button
- Booked properties show "✅ Booked by You"

**In My Bookings:**
- Active bookings (green border)
- Expiry countdown
- Cancel button

### Admin Dashboard:

**Tabs:**
- 🏘️ Properties
- 👥 Users
- 📅 Bookings (1) ← NEW!

**In Bookings Tab:**
- Table with all bookings
- Property images
- User details
- Booking dates
- Expiry dates
- Status badges

---

## 🎨 Visual Guide

### Booking a Property:

**Before Booking:**
```
┌─────────────────────┐
│  [Property Image]   │
│  $450,000          │
├─────────────────────┤
│  Luxury Apartment   │
│  [📅 Book Property] │ ← Click here
└─────────────────────┘
```

**After Booking:**
```
┌─────────────────────┐
│  [Property Image]   │
│  ✅ Booked by You   │ ← New badge
│  $450,000          │
├─────────────────────┤
│  Luxury Apartment   │
│  [✅ Already Booked]│ ← Button disabled
└─────────────────────┘
```

### My Bookings Tab:

```
┌─────────────────────────────┐
│  Active Bookings (1)        │
├─────────────────────────────┤
│  [Property Image]           │
│  Luxury Apartment    [Active]│
│  📍 New York, NY            │
│  $450,000                   │
│  ⏰ Expires: Feb 14, 2026   │
│  Booked on: Feb 7, 2026     │
│  [❌ Cancel Booking]        │
└─────────────────────────────┘
```

---

## 💡 Quick Tips

### Tip 1: Booking Period
- All bookings last **7 days**
- Expiry date shown clearly
- Automatic expiration

### Tip 2: Multiple Bookings
- Users can book multiple properties
- Each property can only be booked once
- All bookings shown in "My Bookings"

### Tip 3: Cancellation
- Cancel anytime before expiry
- Property becomes available immediately
- No penalty for cancellation

### Tip 4: Admin View
- Admin sees ALL bookings
- Can't cancel user bookings (view only)
- Great for monitoring

---

## 🔄 Booking Lifecycle

```
Day 0: User books property
       ↓
       Status: Active ✅
       Property: Reserved
       ↓
Day 1-6: Booking active
         User can cancel
         Admin can view
       ↓
Day 7: Booking expires automatically
       ↓
       Status: Expired ⏰
       Property: Available again
       ↓
       Booking moves to "Expired" section
```

---

## 🎯 Try These Scenarios

### Scenario 1: Book Multiple Properties
1. Book 3 different properties
2. Go to "My Bookings"
3. See all 3 bookings
4. Check stats show "My Bookings: 3"

### Scenario 2: Cancel a Booking
1. Go to "My Bookings"
2. Click "Cancel Booking"
3. Confirm cancellation
4. Booking disappears
5. Property available again

### Scenario 3: Admin Monitoring
1. Login as admin
2. Click "Bookings" tab
3. See all user bookings
4. Check user details
5. View expiry dates

### Scenario 4: Booking Conflict
1. Book a property as User 1
2. Logout
3. Login as different user
4. Try to book same property
5. See error: "Property is already booked"

---

## 📱 Mobile Testing

Works perfectly on mobile:
1. Open on phone: `http://YOUR-IP:3000`
2. Login as user
3. Book a property
4. View bookings
5. All features work!

---

## 🐛 Troubleshooting

### Issue: Can't book property
**Solution:**
- Make sure you're logged in as user (not admin)
- Check property isn't already booked
- Refresh page and try again

### Issue: Bookings not showing
**Solution:**
- Make sure database table was created
- Check: http://localhost/real-estate-backend/create-bookings-table.php
- Should see "✅ Bookings table created successfully!"

### Issue: Expiry not working
**Solution:**
- Expiry happens automatically on next API call
- Refresh the page to trigger check
- Or wait for next page load

---

## 📊 Database Check

To verify bookings table exists:

1. Open phpMyAdmin: http://localhost/phpmyadmin
2. Select `real_estate` database
3. Look for `bookings` table
4. Should have these columns:
   - id
   - property_id
   - user_id
   - status
   - booking_date
   - expiry_date
   - created_at

---

## 🎉 Success Checklist

- [ ] Logged in as user
- [ ] Booked a property
- [ ] Saw "✅ Booked by You" badge
- [ ] Viewed booking in "My Bookings"
- [ ] Saw expiry date
- [ ] Logged in as admin
- [ ] Viewed booking in admin dashboard
- [ ] Saw user details
- [ ] Cancelled a booking (optional)

---

## 🚀 What's Next?

Now that bookings work, you can:

1. **Add more properties** (as admin)
2. **Register more users** (test with multiple accounts)
3. **Monitor bookings** (admin dashboard)
4. **Test expiry** (wait 7 days or manually update database)
5. **Customize** (change expiry period, add features)

---

## 📞 Quick Reference

**User Dashboard:**
- Browse: See all properties
- Book: Click "Book Property"
- View: "My Bookings" tab
- Cancel: Click "Cancel Booking"

**Admin Dashboard:**
- View: "Bookings" tab
- Monitor: See all bookings
- Track: Check expiry dates

**Booking Period:** 7 days
**Auto-Expiry:** Yes
**Multiple Bookings:** Yes (per user)
**Cancellation:** Anytime

---

**🎊 Your booking system is ready! Start booking properties now!** 📅✨

**URL:** http://localhost:3000
