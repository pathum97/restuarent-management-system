import express from "express";
import cors  from "cors";
import mysql from "mysql2";

const app = express();

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password : "",
    database: "restaurent_db",
})

app.get("/",(req,res)=> {
    res.json("Hello from backend");
})


app.listen(8081, ()=>{
    console.log("listening");
})
