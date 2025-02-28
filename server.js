require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5050;
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key";

app.use(cors());
app.use(bodyParser.json());

// Dummy users
const users = [
  {
    id: 1,
    username: "admin",
    password: "password123",
    email: "example@mail.com",
    role: "admin",
    name: "Admin User",
    phone: "1234567890",
    address: "123, Example Street, City, Country",
  },
  {
    id: 2,
    username: "user",
    password: "password123",
    email: "user@mail.com",
    role: "user",
    name: "Normal User",
    phone: "1234567890",
    address: "123, Example Street, City, Country",
  },
];

// ----------Routes----------
// Base route
app.get("/", (req, res) => {
  res.json({
    message: "WELLCOME TO THE API",
    get_jwt: "POST /login { username, password }",
    data: "GET /data",
    users: "GET /users",
  });
});

// Login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });
  res.json({ token });
});

// Verify token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Token required" });
  }

  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

// Protected routes with token for access current user data
app.get("/data", verifyToken, (req, res) => {
  let user = users.find((u) => u.id === req.user.id);
  user = { ...user, password: undefined };

  res.json({
    message: "Protected Data Accessed",
    user,
  });
});


// Protected routes with token for access all users data
app.get("/users", verifyToken, (req, res) => {
  let new_users = users.map((u) => {
    return { ...u, password: undefined };
  });
  res.json({ users: new_users });
});


// Start server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
