const express = require("express");
const mysql = require("mysql");


const websystem = express();


const db = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password:'',
   database:'crep-db'
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