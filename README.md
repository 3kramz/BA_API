# **Node.js Express API with JWT Authentication**

This is a simple **RESTful API** built using **Node.js, Express, and JWT**. It includes user authentication and protected routes.

---

## ** Features**
- **User authentication** with JWT  
- **Protected routes** requiring a valid token  
- **CORS support** for cross-origin requests  
- **RESTful API structure**  
- **JSON response format**  

---

### **1 Clone the Repository**
```sh
git clone https://github.com/3kramz/BA_API.git
cd BA_API
```


### **2 install dependency**
```sh
npm install
```



### **3 Create a .env file in the root directory and add:**
```sh
PORT=5050
SECRET_KEY=your_secret_key
```

### **4 start server**
```sh
nodemon server.js
```


## ** API endpoints **
- ### **GET /**
#### response
```sh
{
  "message": "WELLCOME TO THE API",
  "get_jwt": "GET /login { username, password }",
  "data": "GET /data",
  "users": "GET /users"
}
```

- ### **GET /login**
#### request body(default credentials)
```sh
{
  "username": "admin",
  "password": "password123"
}

```
#### response
```sh
{
    "token": "jwt_token"
}
```




- ### **GET /data**
#### request Authorization
Set
```sh
    Bearer Token: "jwt_token"
```

#### response
```sh
{
    "message": "Protected Data Accessed",
    "user": {
        "id": 1,
        "username": "admin",
        "email": "example@mail.com",
        "role": "admin",
        "name": "Admin User",
        "phone": "1234567890",
        "address": "123, Example Street, City, Country"
    }
}
```

- ### **GET /users**
#### request Authorization
Set
```sh
    Bearer Token: "jwt_token"
```

#### response
```sh
{
    "users": [
        {
            "id": 1,
            "username": "admin",
            "email": "example@mail.com",
            "role": "admin",
            "name": "Admin User",
            "phone": "1234567890",
            "address": "123, Example Street, City, Country"
        },
        {
            "id": 2,
            "username": "user",
            "email": "user@mail.com",
            "role": "user",
            "name": "Normal User",
            "phone": "1234567890",
            "address": "123, Example Street, City, Country"
        }
    ]
}
```