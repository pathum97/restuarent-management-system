// server.js (Backend for Restaurant Management System)
import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "restaurent_db",
});

// Fetch all dishes
app.get("/", (req, res) => {
    const sql = "SELECT * FROM dishes";
    db.query(sql, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

// Add a new dish
app.post("/create", (req, res) => {
    const sql = "INSERT INTO dishes (name, price, availability) VALUES (?, ?, ?)";
    const values = [
        req.body.name,
        req.body.price,
        req.body.availability
    ];

    db.query(sql, values, (err, data) => {
        if (err) return res.json("Error");
        return res.status(201).json(data);
    });
});

app.listen(8081, () => {
    console.log("Server is running on port 8081");
});