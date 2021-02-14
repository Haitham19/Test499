const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");


dotenv.config({path: './.env'});

const websystem = express();


const db = mysql.createConnection({
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   password:process.env.DATABASE_PASSWORD,
   database:process.env.DATABASE
});

db.connect((error)=> {
   if (error){
      console.log(error)
   }
   else{
      console.log("MYSQL IS Connected")
   }
});


websystem.get("/", (req, res) => {
   res.send("<h1> Home Page </h1>")
});

websystem.listen(5000, () =>{
console.log("server start on post 5000.")
})