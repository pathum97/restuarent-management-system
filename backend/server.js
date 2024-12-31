import express, { json } from 'express';
import { createConnection } from 'mysql2';
import cors from 'cors';

const app = express();
const port = 8081;

// Enable CORS
app.use(cors());

// Middleware to parse JSON data
app.use(json());

// Database connection setup
const db = createConnection({
    host: 'localhost',
    user: 'root', 
    password: '', 
    database: 'restaurent_db', 
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Could not connect to database:', err);
        return;
    }
    console.log('Connected to the MySQL database!');
});

// Fetch data for orders and dishes
app.get('/', (req, res) => {
    const query = `
        SELECT 
            orders.id AS order_id, 
            orders.customer_name, 
            orders.customer_phone, 
            dishes.name AS dish_name, 
            orders.quantity, 
            orders.total_price 
        FROM orders 
        JOIN dishes ON orders.dish_id = dishes.id;
    `;

    db.query(query, (err, orders) => {
        if (err) {
            console.log("Error fetching orders:", err);
            return res.status(500).send("Error fetching orders");
        }

        db.query('SELECT * FROM dishes', (err, dishes) => {
            if (err) {
                console.log("Error fetching dishes:", err);
                return res.status(500).send("Error fetching dishes");
            }

            res.json({ orders, dishes });
        });
    });
});

// Add new dish
app.post('/add-dish', (req, res) => {
    const { name, price, availability } = req.body;
    const query = 'INSERT INTO dishes (name, price, availability) VALUES (?, ?, ?)';
    db.query(query, [name, price, availability], (err, result) => {
        if (err) {
            console.log("Error adding dish:", err);
            return res.status(500).send("Error adding dish");
        }
        res.send("Dish added successfully!");
    });
});

// Update dish
app.put('/update-dish/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, availability } = req.body;
    const query = 'UPDATE dishes SET name = ?, price = ?, availability = ? WHERE id = ?';
    db.query(query, [name, price, availability, id], (err, result) => {
        if (err) {
            console.log("Error updating dish:", err);
            return res.status(500).send("Error updating dish");
        }
        res.send("Dish updated successfully!");
    });
});

// Delete dish
app.delete('/delete-dish/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM dishes WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.log("Error deleting dish:", err);
            return res.status(500).send("Error deleting dish");
        }
        res.send("Dish deleted successfully!");
    });
});

// Add new order
app.post('/add-order', (req, res) => {
    const { customer_name, customer_phone, dish_id, quantity, total_price } = req.body;
    const query = 'INSERT INTO orders (customer_name, customer_phone, dish_id, quantity, total_price) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [customer_name, customer_phone, dish_id, quantity, total_price], (err, result) => {
        if (err) {
            console.log("Error adding order:", err);
            return res.status(500).send("Error adding order");
        }
        res.send("Order added successfully!");
    });
});

// Delete order
app.delete('/delete-order/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM orders WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.log("Error deleting order:", err);
            return res.status(500).send("Error deleting order");
        }
        res.send("Order deleted successfully!");
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
