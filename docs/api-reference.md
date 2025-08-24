# 🔧 API Reference

Complete API documentation for PennyTracker backend services.

## Base URL

- **Development**: `http://localhost:3000`
- **Production**: `https://www.pennytracker.tech`

## Authentication

PennyTracker uses Firebase Authentication with JWT tokens.

### Headers

All authenticated requests must include:

```
Authorization: Bearer <firebase_id_token>
Content-Type: application/json
```

## 🔐 Authentication Endpoints

### POST /api/auth/login

Authenticate user with Firebase ID token.

**Request Body:**
```json
{
  "idToken": "firebase_id_token_here"
}
```

**Response:**
```json
{
  "message": "User logged in successfully",
  "uid": "user_firebase_uid",
  "email": "user@example.com",
  "displayName": "User Name",
  "accessToken": {
    "accessToken": "jwt_token_here"
  }
}
```

### GET /api/auth/:id

Get user profile information.

**Parameters:**
- `id` (string): User Firebase UID

**Response:**
```json
{
  "message": "User data retrieved successfully",
  "email": "user@example.com",
  "name": "User Name",
  "password": "hashed_password",
  "profession": "Software Engineer",
  "profile": "https://s3.amazonaws.com/bucket/profile.jpg"
}
```

## 💰 Expense Management

### GET /api/expense/:userId/summary/:year/:month

Get monthly expense summary with categorized spending.

**Parameters:**
- `userId` (string): User Firebase UID
- `year` (number): Year (e.g., 2024)
- `month` (number): Month (1-12)

**Response:**
```json
{
  "data": {
    "monthlyMessages": [
      {
        "id": "transaction_id",
        "amount": 150.00,
        "category": "Food",
        "date": "2024-01-15",
        "description": "Restaurant payment",
        "type": "Debited"
      }
    ],
    "summary": {
      "totalDebit": 2500.00,
      "totalCredit": 5000.00,
      "categories": {
        "Food": 500.00,
        "Transportation": 200.00,
        "Entertainment": 300.00
      }
    }
  }
}
```

### GET /api/expense/:userId/total

Get total debit and credit amounts for the user.

**Parameters:**
- `userId` (string): User Firebase UID

**Response:**
```json
{
  "data": {
    "totalDebit": 15000.00,
    "totalCredit": 25000.00
  }
}
```

### GET /api/expense/:userId/monthly/:year/:month

Get monthly debit and credit totals.

**Parameters:**
- `userId` (string): User Firebase UID
- `year` (number): Year
- `month` (number): Month (1-12)

**Response:**
```json
{
  "data": {
    "totalDebit": 2500.00,
    "totalCredit": 5000.00,
    "month": 1,
    "year": 2024
  }
}
```

### GET /api/expense/:userId/daily/:year/:month

Get daily transaction breakdown for a month.

**Parameters:**
- `userId` (string): User Firebase UID
- `year` (number): Year
- `month` (number): Month (1-12)

**Response:**
```json
{
  "monthlyMessages": [
    {
      "date": "2024-01-01",
      "transactions": [
        {
          "id": "txn_123",
          "amount": 25.00,
          "category": "Food",
          "description": "Coffee shop",
          "type": "Debited",
          "timestamp": "2024-01-01T10:30:00Z"
        }
      ],
      "dailyTotal": {
        "debit": 125.00,
        "credit": 0.00
      }
    }
  ]
}
```

### GET /api/expense/:userId/messages/:year

Get all transaction messages for a specific year.

**Parameters:**
- `userId` (string): User Firebase UID
- `year` (number): Year

**Response:**
```json
{
  "data": [
    {
      "id": "msg_123",
      "amount": 100.00,
      "sender": "BANK_SMS",
      "message": "Debited INR 100.00 from account ending 1234",
      "date": "2024-01-15",
      "category": "Banking",
      "type": "Debited"
    }
  ]
}
```

## 💾 Data Input & Upload

### POST /api/addInput

Add manual transaction input.

**Request Body:**
```json
{
  "userId": "user_firebase_uid",
  "amount": 150.00,
  "category": "Food",
  "description": "Grocery shopping",
  "type": "Debited",
  "date": "2024-01-15"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Transaction added successfully",
  "data": {
    "transactionId": "generated_id"
  }
}
```

### POST /api/upload

Upload user profile image.

**Request:** Multipart form data with image file

**Response:**
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "profilePicUrl": "https://s3.amazonaws.com/bucket/profile_123.jpg"
  }
}
```

## 💸 Budget Management

### GET /api/monthly/:userId

Get user's monthly budget limits.

**Parameters:**
- `userId` (string): User Firebase UID

**Response:**
```json
{
  "data": {
    "limits": {
      "Food": 1000.00,
      "Transportation": 500.00,
      "Entertainment": 300.00,
      "Shopping": 800.00,
      "Bills": 1200.00
    },
    "spent": {
      "Food": 750.00,
      "Transportation": 300.00,
      "Entertainment": 250.00,
      "Shopping": 600.00,
      "Bills": 1200.00
    }
  }
}
```

### POST /api/monthly/:userId

Set or update monthly budget limits.

**Parameters:**
- `userId` (string): User Firebase UID

**Request Body:**
```json
{
  "limits": {
    "Food": 1000.00,
    "Transportation": 500.00,
    "Entertainment": 300.00,
    "Shopping": 800.00,
    "Bills": 1200.00
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Budget limits updated successfully",
  "data": {
    "limits": {
      "Food": 1000.00,
      "Transportation": 500.00,
      "Entertainment": 300.00,
      "Shopping": 800.00,
      "Bills": 1200.00
    }
  }
}
```

## 🚨 Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information",
  "statusCode": 400
}
```

### Common Error Codes

| Status Code | Description |
|:---:|:---|
| 400 | Bad Request - Invalid request parameters |
| 401 | Unauthorized - Invalid or missing authentication |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server-side error |

## 📊 Rate Limiting

API requests are rate-limited to ensure fair usage:

- **Authenticated requests**: 1000 requests per hour per user
- **Public endpoints**: 100 requests per hour per IP

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1577836800
```

## 🔍 Pagination

For endpoints that return lists, pagination is supported:

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20, max: 100)

**Response:**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
```

## 🧪 Testing the API

### Using cURL

```bash
# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"idToken": "your_firebase_token"}'

# Get user expenses
curl -X GET http://localhost:3000/api/expense/user123/summary/2024/1 \
  -H "Authorization: Bearer your_jwt_token"
```

### Using Postman

1. Import the [Postman collection](./postman-collection.json)
2. Set environment variables for base URL and tokens
3. Use the pre-configured requests

---

**Last Updated**: December 2024  
**API Version**: v1