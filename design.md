## E-shop API DESIGN

### General 
- Auth middleware -add custom error throwing for missing authorization header
- POST /auth/login

Add validation
- Move token generation to the token-lib

Create admin user
Token protected endpoint
- POST /auth/register/admin

### Users
- POST /users/:id/image  login required, self
- PATCH /users/:id -  login required, self
- GET /users/:id - login required
- GET /users - admin only

### Products

- POST /products
- PATCH /products/:id - check owner
- POST /products/:id/images -  check owner
- DELETE /products/:id
- GET /products (pagination)
- GET /users/:id/products (pagination)
- GET /products/:id

### Categories
- POST /categories - admin
- GET /categories  (pagination)
- GET /categories/:id

### Bucket
- GET /users/:id/bucket - self check
- POST /users/:id/bucket/product - self check

### Card
- POST /cards
- PATCH /cards/:id

### Orders
- POST /order
- DELETE /orders/:id
- GET /orders/:id
- GET /orders (gets user orders only)

### Favorites
- POST /favorites/products
- GET /favorites/products (pagination)
- DELETE /favorites/products/:id
