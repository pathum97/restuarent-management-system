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

// Fetch all data for the main page
app.get("/", (req, res) => {
    const sqlDishes = "SELECT * FROM dishes";
    const sqlCustomers = "SELECT * FROM customers";
    const sqlOrders = "SELECT * FROM orders";

    db.query(sqlDishes, (err, dishes) => {
        if (err) return res.json({ error: "Error fetching dishes" });

        db.query(sqlCustomers, (err, customers) => {
            if (err) return res.json({ error: "Error fetching customers" });

            db.query(sqlOrders, (err, orders) => {
                if (err) return res.json({ error: "Error fetching orders" });

                return res.json({ dishes, customers, orders });
            });
        });
    });
});

// Add a new dish
app.post("/add-dish", (req, res) => {
    const sql = "INSERT INTO dishes (name, price, availability) VALUES (?, ?, ?)";
    const values = [req.body.name, req.body.price, req.body.availability];

    db.query(sql, values, (err, data) => {
        if (err) return res.json({ error: "Error adding dish" });
        return res.status(201).json(data);
    });
});

// Add a new customer
app.post("/add-customer", (req, res) => {
    const sql = "INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)";
    const values = [req.body.name, req.body.email, req.body.phone];

    db.query(sql, values, (err, data) => {
        if (err) return res.json({ error: "Error adding customer" });
        return res.status(201).json(data);
    });
});

// Add a new order
app.post("/add-order", (req, res) => {
    const sql = "INSERT INTO orders (customer_name, dish_name, quantity, price) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.customer_name,
        req.body.dish_name,
        req.body.quantity,
        req.body.price,
    ];

    db.query(sql, values, (err, data) => {
        if (err) return res.json({ error: "Error adding order" });
        return res.status(201).json(data);
    });
});

// Update a dish
app.put("/update-dish/:id", (req, res) => {
    const sql = "UPDATE dishes SET name = ?, price = ?, availability = ? WHERE id = ?";
    const values = [req.body.name, req.body.price, req.body.availability, req.params.id];

    db.query(sql, values, (err, data) => {
        if (err) return res.json({ error: "Error updating dish" });
        return res.status(200).json(data);
    });
});

// Delete a dish
app.delete("/delete-dish/:id", (req, res) => {
    const sql = "DELETE FROM dishes WHERE id = ?";

    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.json({ error: "Error deleting dish" });
        return res.status(200).json(data);
    });
});

// Delete a customer
app.delete("/delete-customer/:id", (req, res) => {
    const sql = "DELETE FROM customers WHERE id = ?";

    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.json({ error: "Error deleting customer" });
        return res.status(200).json(data);
    });
});

// Delete an order
app.delete("/delete-order/:id", (req, res) => {
    const sql = "DELETE FROM orders WHERE id = ?";

    db.query(sql, [req.params.id], (err, data) => {
        if (err) return res.json({ error: "Error deleting order" });
        return res.status(200).json(data);
    });
});

app.listen(8081, () => {
    console.log("Server is running on port 8081");
});
