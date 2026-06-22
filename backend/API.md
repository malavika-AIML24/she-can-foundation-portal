# 📚 She Can Foundation - API Documentation

## Overview

The She Can Foundation API provides RESTful endpoints for managing contact form submissions and admin authentication. All endpoints return JSON responses.

**Base URL:** `http://localhost:5000/api`

**Content-Type:** `application/json`

---

## 🔐 Authentication

### Login
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "admin@shecan.org",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "email": "admin@shecan.org",
      "name": "Admin",
      "role": "superadmin"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Response (401):**
```json
{
  "success": false,
  "error": "Invalid email or password"
}
```

### Verify Token
**GET** `/api/auth/verify`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "email": "admin@shecan.org",
      "name": "Admin",
      "role": "superadmin"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

---

## 📨 Contact Form

### Submit Contact Form
**POST** `/api/contact`

**Request Body:**
```json
{
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "phone": "+91 98765 43210",
  "subject": "Program Information",
  "message": "I would like to know more about your web development bootcamp."
}
```

**Validation Rules:**
| Field | Type | Required | Rules |
|-------|------|----------|-------|
| name | string | Yes | 2-100 characters |
| email | string | Yes | Valid email format |
| phone | string | Yes | Valid phone format |
| subject | string | Yes | One of: General Inquiry, Program Information, Mentorship, Partnership, Support, Feedback |
| message | string | Yes | 10-1000 characters |

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "Priya Sharma",
    "email": "priya@example.com",
    "phone": "+91 98765 43210",
    "subject": "Program Information",
    "message": "I would like to know more about your web development bootcamp.",
    "status": "Pending",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "message": "Form submitted successfully"
}
```

### Get All Submissions
**GET** `/api/contact`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "name": "Priya Sharma",
      "email": "priya@example.com",
      "phone": "+91 98765 43210",
      "subject": "Program Information",
      "message": "...",
      "status": "Pending",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

### Get Single Submission
**GET** `/api/contact/:id`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "name": "Priya Sharma",
    "email": "priya@example.com",
    "phone": "+91 98765 43210",
    "subject": "Program Information",
    "message": "...",
    "status": "Pending",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Update Status
**PATCH** `/api/contact/:id`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "status": "Reviewed"
}
```

**Valid Status Values:**
- `Pending`
- `Reviewed`
- `Completed`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "status": "Reviewed",
    "updatedAt": "2024-01-16T11:30:00.000Z"
  },
  "message": "Status updated successfully"
}
```

### Delete Submission
**DELETE** `/api/contact/:id`

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": null,
  "message": "Submission deleted successfully"
}
```

---

## 📊 Statistics

### Get Statistics
**GET** `/api/stats`

**Response (200):**
```json
{
  "success": true,
  "data": {
    "totalContacts": 1250,
    "pendingContacts": 156,
    "reviewedContacts": 234,
    "completedContacts": 890,
    "resolvedContacts": 1124,
    "monthlyContacts": 89,
    "subjectStats": [
      { "_id": "Program Information", "count": 450 },
      { "_id": "General Inquiry", "count": 320 },
      { "_id": "Mentorship", "count": 280 }
    ]
  }
}
```

---

## ❤️ Health Check

**GET** `/api/health`

**Response (200):**
```json
{
  "status": "ok",
  "message": "She Can Foundation API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

---

## ⚠️ Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "error": "Name must be between 2 and 100 characters"
}
```

### Unauthorized (401)
```json
{
  "success": false,
  "error": "Not authorized - no token provided"
}
```

### Not Found (404)
```json
{
  "success": false,
  "error": "Submission not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "error": "Failed to submit form. Please try again."
}
```

---

## 🧪 Testing with cURL

### Submit Contact Form
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+91 12345 67890",
    "subject": "General Inquiry",
    "message": "This is a test message for the contact form."
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@shecan.org",
    "password": "admin123"
  }'
```

### Get Submissions (with token)
```bash
curl -X GET http://localhost:5000/api/contact \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```
