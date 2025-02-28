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
];

app.get("/", (req, res) => {
  res.json({
    message: "WELLCOME TO THE API",
    get_jwt: "POST /login { username, password }",
    data: "GET /data",
    user: "GET /users",
  });
});


app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});


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




app.get("/data", verifyToken, (req, res) => {
  res.json({ message: "Protected Data Accessed", user: users.find(u => u.id === req.user.id) });
});



app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
