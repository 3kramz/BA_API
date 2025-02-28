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
    message: "wELLCOME TO THE API",
    get_jwt: "POST /login { username, password }",
    data: "GET /data",
    user: "GET /users",
  });
});


app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
