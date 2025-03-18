# React-Inventory
## Made using Express JS, React JS, Tailwind CSS, PostgreSQL

### Endpoints
```
Auth
POST /login = login
POST /register = register

Inventory
GET /inventory = get inventory
POST /inventory = add inventory
PUT /inventory/:id = edit inventory
DELETE /inventory:id = delete inventory

```
### PostgreSQL Script
```
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(10) CHECK (role IN ('admin', 'staff')) NOT NULL
);

CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    description TEXT
);
```
