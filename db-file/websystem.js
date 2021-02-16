const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");


// I think this is for security .
// if we need to know more serch about (detenv)
dotenv.config({path: './.env'});


// for use the server.
const websystem = express();


// we use process.env for security => detrnv .
const db = mysql.createConnection({
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   password:process.env.DATABASE_PASSWORD,
   database:process.env.DATABASE
});


// need to serch about it.
const publicDirectory = path.join(__dirname, './public')
websystem.use(express.static(publicDirectory))


// this is to use the html and css fils => views and public 
websystem.set('view engine', 'hbs');


db.connect((error)=> {
   if (error){
      console.log(error)
   }
   else{
      console.log("MYSQL IS Connected")
   }
});


//Define Routes
websystem.use('/', require('./routes/pages'));


websystem.listen(5000, () =>{
console.log("server start on post 5000.")
})