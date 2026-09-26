# Group 9 - Student Management API

A REST API built with **Node.js, Express, and PostgreSQL**. Users register and log in with **JWT authentication**, then perform CRUD operations on student records. 
Includes Swagger documentation and a simple frontend.

---

Tech Stack

- Node.js / Express
- PostgreSQL (`pg`)
- JWT (`jsonwebtoken`)
- bcrypt (password hashing)
- Swagger (`swagger-jsdoc`, `swagger-ui-express`)
- dotenv

---

How to Run

```bash
npm install
```

Create a `.env` file in the project root:
```env
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
JWT_SECRET=your_secret_key
PORT=3000
```

Create the database tables:
```bash
node src/config/setupDatabase.js
```

(Optional) Add sample students:
```bash
node src/config/seedStudent.js
```

Start the server:
```bash
npm run dev
```

- App: `http://localhost:3000`
- Swagger docs: `http://localhost:3000/api-docs`

---

Database Tables

Created by `setupDatabase.js`:

**users**
| Column | Type |
|---|---|
| id | SERIAL PRIMARY KEY |
| username | VARCHAR(100) |
| email | VARCHAR(150) UNIQUE |
| password | VARCHAR(255) (bcrypt hash) |
| created_at | TIMESTAMP |

**students**
| Column | Type |
|---|---|
| id | SERIAL PRIMARY KEY |
| name | VARCHAR(100) |
| age | INTEGER |
| course | VARCHAR(100) |

---

Auth Flow

```text
POST /auth/register → validate input → hash password → save user
POST /auth/login    → validate input → check password → return JWT
```

Protected routes require this header:
```
Authorization: Bearer <token>
```

`authMiddleware.js` checks the token on every protected route:
- No token → `401 Access token required`
- Invalid/expired token → `403 Invalid or expired token`

---

API Endpoints

### Auth (`authRoutes.js`)

| Method | Endpoint | Auth | Body | Description |
|---|---|---|---|---|
| POST | `/auth/register` | No | `{ username, email, password }` | Register a new user |
| POST | `/auth/login` | No | `{ email, password }` | Log in, returns `{ token, user }` |
| POST | `/auth/logout` | Yes | — | Log out |
| GET | `/auth/me` | Yes | — | Get current logged-in user |

### Students (`studentRoutes.js`)

| Method | Endpoint | Auth | Body | Description |
|---|---|---|---|---|
| GET | `/students` | Yes | — | Get all students |
| GET | `/students/:id` | Yes | — | Get one student by ID |
| POST | `/students` | Yes | `{ name, age, course }` | Create a student |
| PATCH | `/students/:id` | Yes | any of `{ name, age, course }` | Update a student |
| DELETE | `/students/:id` | Yes | — | Delete a student |

Example create/update body:
```json
{ "name": "Juvilyn T. Magante", "age": 23, "course": "BSCS" }
```

`name` and `course` are required on create (checked in `studentService.js`); `age` is optional.

---

Validation (`authValidation.js`)

- **Register**: `username` (min 3 chars), valid email format, `password` (min 6 chars)
- **Login**: valid email format, `password` required

Failed validation response:
```json
{ "message": "Validation failed", "errors": ["..."] }
```

---

Testing in Swagger

1. Go to `http://localhost:3000/api-docs`
2. Expand `POST /auth/register` → **Try it out** → fill `username`, `email`, `password` → **Execute**
3. Expand `POST /auth/login` → same email/password → **Execute** → copy the `token` from the response
4. Click **Authorize** (top right) → paste the token (no "Bearer " needed) → **Authorize** → **Close**
5. Try any 🔒 endpoint (`/students`, `/auth/logout`, `/auth/me`) → **Try it out** → **Execute**

Testing in Postman

1. `POST http://localhost:3000/auth/register`
   ```json
   { "username": "juvilyn24", "email": "juvilynmagante12@gmail.com", "password": "skibidi" }
   ```
2. `POST http://localhost:3000/auth/login`
   ```json
   { "email": "juvilynmagante12@gmail.com", "password": "skibidi" }
   ```
   Copy the `token` from the response.
3. On protected requests: **Authorization** tab → **Bearer Token** → paste the token.
4. Test GET / POST / PATCH / DELETE on `/students`.

---

Error Responses

| Status | Meaning |
|---|---|
| 400 | Validation failed / bad request |
| 401 | Missing token / invalid credentials |  
| 403 | Invalid or expired token |
| 404 | Student not found |
| 500 | Server/database error |

---

Project Structure

```text
src/
├── config/         # db.js, swagger.js, setupDatabase.js, seedStudent.js
├── controllers/     # authController.js, studentController.js
├── middlewares/     # authMiddleware.js
├── models/          # userModel.js, studentModel.js
├── routes/          # authRoutes.js, studentRoutes.js
├── services/        # authService.js, studentService.js
├── validations/      # authValidation.js
├── utils/            # jwt.js
└── app.js
public/               # frontend (index.html, style.css, script.js)
server.js
.env
```

---
Contributors

**Group 9**
- Juvilyn T. Magante
- Ma. Ramela Lozano
- Francis Erika Salem
- Joricho Cosculla
