# Users API

REST API endpoints for user management

## Endpoints

### List Users
```http
GET /api/users
```

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2026-02-08T12:00:00Z"
    }
  ]
}
```

### Get User
```http
GET /api/users/:id
```

### Create User
```http
POST /api/users
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

### Update User
```http
PUT /api/users/:id
Content-Type: application/json

{
  "name": "Updated Name"
}
```

### Delete User
```http
DELETE /api/users/:id
```

## Testing

```bash
# List users
curl https://your-worker.workers.dev/api/users

# Create user
curl -X POST https://your-worker.workers.dev/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'
```

## Deployment

```bash
cd api/users
wrangler deploy
```

---

Created by MOSSES ARMY Cloud Agent
