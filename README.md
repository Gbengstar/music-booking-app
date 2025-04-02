# Music Booking API Documentation

# 🚀 Getting Started

## Prerequisites

- Node.js (v18 or higher recommended)
- Yarn package manager

## ⚡ Quick Start

1. **Install dependencies**:
   ```bash
   yarn install
   ```
2. **start app**:
   ```bash
   yarn dev
   ```

## 🔗 Postman Collection

👉 [View Postman Collection](https://documenter.getpostman.com/view/19148571/2sB2cSgP2W)

---

## ⚙️ Environment Variables

```env
MONGODB_URL="mongodb+srv://gtoyewole30:PNBnDRugyfmkDFZ5@test-apps.tyf1g.mongodb.net/fobework?retryWrites=true&w=majority&appName=test-apps"
PORT=9000
TOKEN_SECRET="3fa85f64c3e5a1c05d4f1a2b3c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3"
REFRESH_TOKEN_SECRET="3fa85f64c3e5a1c05d4f1a2b3c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b33fa85f64c3e5a1c05d4f1a2b3c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3"
TOKEN_EXPIRE_IN="1 day"
REDIS_HOST="rediss://red-cot10l2cn0vc73esl9n0:spASw7t87qRhkz8mmP1wrwYR9JjQGlJ2@oregon-redis.render.com:6379"
```

# API Endpoints

## Authentication

- `POST /api/v1/accounts/sign-up` - User registration
- `POST /api/v1/accounts/login` - User login

## Artists

- `POST /api/v1/artists` - Create artist profile (artist role required)
- `GET /api/v1/artists` - Get artist details
- `PATCH /api/v1/artists` - Update artist profile
- `GET /api/v1/artists/:id/events` - Get artist's events

## Venues

- `POST /api/v1/venues` - Create venue profile (venue role required)
- `GET /api/v1/venues` - Get all venues
- `PATCH /api/v1/venues` - Update venue profile
- `GET /api/v1/venues/:id/events` - Get venue's events
- `DELETE /api/v1/venues/:id` - Pseudo-delete venue profile

## Events

- `POST /api/v1/events` - Create new event
- `GET /api/v1/events` - List all events (with filters)
- `PATCH /api/v1/events/` - Update event
- `DELETE /api/v1/events/:id` - Cancel event
- `PATCH /api/v1/events/:id/status` - Change event status

## Bookings

- `POST /api/v1/bookings` - Create new booking
- `GET /api/v1/bookings` - Get all bookings
- `GET /api/v1/bookings/me` - Get user's bookings
- `PATCH /api/v1/bookings/:id/cancel` - Cancel booking
