# 📅 Booking System - Complete Guide

## 🎉 New Feature: Property Booking System!

Users can now book properties, and bookings automatically expire after 7 days!

---

## ✨ Features

### For Users:
- ✅ Book available properties
- ✅ View all their bookings
- ✅ See booking expiry dates
- ✅ Cancel bookings
- ✅ See which properties they've booked
- ✅ Separate tabs for browsing and bookings
- ✅ Visual indicators (green badges for booked properties)

### For Admins:
- ✅ View all bookings from all users
- ✅ See active bookings
- ✅ See expired bookings
- ✅ View user details for each booking
- ✅ See booking dates and expiry dates
- ✅ Beautiful table layout with property images

### Automatic Features:
- ✅ Bookings expire after 7 days automatically
- ✅ Expired bookings are marked as "expired"
- ✅ Properties become available again after expiry
- ✅ Real-time status updates

---

## 🎯 How It Works

### Booking Flow:

```
1. User browses properties
   ↓
2. User clicks "Book Property"
   ↓
3. Confirmation dialog appears
   ↓
4. Booking created with 7-day expiry
   ↓
5. Property marked as "Booked by You"
   ↓
6. Admin can see booking in dashboard
   ↓
7. After 7 days: Booking expires automatically
   ↓
8. Property becomes available again
```

---

## 📖 User Guide

### How to Book a Property:

1. **Login** as a user
2. Go to **User Dashboard**
3. Click **"Browse Properties"** tab
4. Find a property you like
5. Click **"📅 Book Property"** button
6. Confirm the booking
7. Done! Property is booked for 7 days

### View Your Bookings:

1. Go to **User Dashboard**
2. Click **"✅ My Bookings"** tab
3. See all your bookings:
   - **Active Bookings** (green border)
   - **Expired Bookings** (grayed out)

### Cancel a Booking:

1. Go to **"My Bookings"** tab
2. Find the booking
3. Click **"❌ Cancel Booking"**
4. Confirm cancellation
5. Property becomes available again

---

## 👨‍💼 Admin Guide

### View All Bookings:

1. **Login** as admin
2. Go to **Admin Dashboard**
3. Click **"📅 Bookings"** tab
4. See all bookings from all users

### Booking Information Shown:

- Property image and details
- User name and email
- Booking date
- Expiry date and time
- Status (Active/Expired)

### Active vs Expired:

**Active Bookings:**
- Green background
- ✅ Active badge
- Full color images
- Shows expiry countdown

**Expired Bookings:**
- Gray background
- ⏰ Expired badge
- Grayscale images
- Shows expiry date

---

## 🎨 Visual Indicators

### In Browse Properties:

**Available Property:**
```
┌─────────────────────┐
│  [Property Image]   │
│  $450,000          │
├─────────────────────┤
│  Luxury Apartment   │
│  📍 New York, NY    │
│  🛏️ 3  🚿 2  📐 1500│
│  [📅 Book Property] │
└─────────────────────┘
```

**Booked Property:**
```
┌─────────────────────┐
│  [Property Image]   │
│  ✅ Booked by You   │
│  $450,000          │
├─────────────────────┤
│  Luxury Apartment   │
│  📍 New York, NY    │
│  🛏️ 3  🚿 2  📐 1500│
│  [✅ Already Booked]│
└─────────────────────┘
```

### In My Bookings:

**Active Booking:**
```
┌─────────────────────────────┐
│  [Property Image]           │
│  Luxury Apartment    [Active]│
│  📍 New York, NY            │
│  $450,000                   │
│  ⏰ Expires: Feb 14, 2026   │
│  Booked on: Feb 7, 2026     │
│  [❌ Cancel Booking]        │
└─────────────────────────────┘
```

**Expired Booking:**
```
┌─────────────────────────────┐
│  [Grayscale Image]          │
│  Luxury Apartment   [Expired]│
│  📍 New York, NY            │
│  Expired on: Feb 14, 2026   │
└─────────────────────────────┘
```

---

## 📊 Dashboard Stats

### User Dashboard:

```
┌─────────────────────────────────────────┐
│  Available Properties: 10               │
│  My Bookings: 2                         │
│  Filtered Results: 10                   │
│  Expired: 1                             │
└─────────────────────────────────────────┘
```

### Admin Dashboard:

```
┌─────────────────────────────────────────┐
│  Total Properties: 10                   │
│  Total Users: 15                        │
│  Admins: 2                              │
│                                         │
│  Tabs: [Properties] [Users] [Bookings(3)]│
└─────────────────────────────────────────┘
```

---

## 🔧 Technical Details

### Database Table:

```sql
bookings
├── id (Primary Key)
├── property_id (Foreign Key → properties)
├── user_id (Foreign Key → users)
├── status (pending/confirmed/expired)
├── booking_date (Timestamp)
├── expiry_date (DateTime)
└── created_at (Timestamp)
```

### API Endpoints:

**Get Bookings:**
```
GET /api/bookings.php
GET /api/bookings.php?user_id=1
```

**Create Booking:**
```
POST /api/bookings.php
Body: {
  property_id: 1,
  user_id: 1
}
```

**Cancel Booking:**
```
DELETE /api/bookings.php?id=1
```

### Auto-Expiry:

Every API call automatically runs:
```sql
UPDATE bookings 
SET status = 'expired' 
WHERE expiry_date < NOW() 
AND status = 'pending'
```

---

## 🎯 Use Cases

### Use Case 1: User Books Property

**Scenario:** John wants to book an apartment

**Steps:**
1. John logs in
2. Browses properties
3. Finds "Luxury Apartment"
4. Clicks "Book Property"
5. Confirms booking
6. Property reserved for 7 days

**Result:**
- John sees "✅ Booked by You" badge
- Admin sees booking in dashboard
- Other users see property as available (can't book)

### Use Case 2: Booking Expires

**Scenario:** 7 days pass since booking

**What Happens:**
1. System automatically marks booking as "expired"
2. Property becomes available again
3. John sees booking in "Expired" section
4. Admin sees booking moved to "Expired Bookings"

### Use Case 3: User Cancels Booking

**Scenario:** John changes his mind

**Steps:**
1. John goes to "My Bookings"
2. Finds the booking
3. Clicks "Cancel Booking"
4. Confirms cancellation

**Result:**
- Booking deleted from database
- Property available immediately
- John can book again if wanted

---

## 🚀 Testing Guide

### Test Scenario 1: Book a Property

1. Login as user: `user@realestate.com / user123`
2. Go to User Dashboard
3. Click "Browse Properties"
4. Click "Book Property" on any property
5. Confirm booking
6. Check "My Bookings" tab
7. Verify booking appears

### Test Scenario 2: View as Admin

1. Login as admin: `admin@realestate.com / admin123`
2. Go to Admin Dashboard
3. Click "Bookings" tab
4. Verify you see the booking
5. Check user details are shown
6. Verify expiry date is 7 days from now

### Test Scenario 3: Cancel Booking

1. As user, go to "My Bookings"
2. Click "Cancel Booking"
3. Confirm cancellation
4. Verify booking disappears
5. Go to "Browse Properties"
6. Verify property shows "Book Property" again

### Test Scenario 4: Multiple Bookings

1. Book multiple properties
2. Check "My Bookings" shows all
3. Check stats card shows correct count
4. Verify each has different expiry dates

---

## 💡 Pro Tips

### Tip 1: Booking Limits
- Users can book multiple properties
- Each property can only be booked by one user at a time
- Trying to book an already-booked property shows error

### Tip 2: Expiry Tracking
- Expiry date shown in booking details
- Countdown visible in user dashboard
- Admin can see all expiry dates

### Tip 3: Status Indicators
- Green = Active booking
- Gray = Expired booking
- Badge shows status clearly

### Tip 4: Admin Monitoring
- Admin sees all bookings in one place
- Can track which properties are popular
- Can see user booking patterns

---

## 🎨 Color Coding

```
Active Bookings:
- Border: Green (#10B981)
- Badge: Green background
- Status: ✅ Active

Expired Bookings:
- Border: Gray (#9CA3AF)
- Badge: Gray background
- Status: ⏰ Expired
- Image: Grayscale filter

Booked Properties:
- Badge: Green (#10B981)
- Text: "✅ Booked by You"
- Button: Disabled (green)
```

---

## 📱 Responsive Design

All booking features work on:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

Tables scroll horizontally on mobile for better UX.

---

## 🔒 Security

- ✅ Users can only see their own bookings
- ✅ Users can only cancel their own bookings
- ✅ Admin can see all bookings (read-only)
- ✅ Property ownership verified before booking
- ✅ Duplicate booking prevention

---

## 📈 Statistics

### Booking Metrics:

**User Dashboard:**
- Total available properties
- User's active bookings
- User's expired bookings
- Filtered results count

**Admin Dashboard:**
- Total bookings (all users)
- Active bookings count
- Expired bookings count
- Per-property booking history

---

## 🎉 Summary

**What You Can Do:**

✅ Book properties (users)
✅ View bookings (users & admin)
✅ Cancel bookings (users)
✅ Track expiry dates
✅ See booking history
✅ Monitor all bookings (admin)
✅ Automatic expiry after 7 days

**Key Features:**

- 7-day booking period
- Automatic expiration
- Visual indicators
- Real-time updates
- User-friendly interface
- Admin monitoring
- Mobile responsive

---

## 🚀 Quick Start

**For Users:**
1. Login
2. Browse Properties
3. Click "Book Property"
4. Done!

**For Admins:**
1. Login
2. Click "Bookings" tab
3. See all bookings!

---

**🎊 Enjoy the new booking system!** 📅✨
