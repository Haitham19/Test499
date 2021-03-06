const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

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
const publicDirectory = path.join(__dirname, './public');
websystem.use(express.static(publicDirectory));

//parse URL-encoded bodies (as sent by html forms)
websystem.use(express.urlencoded({ extended: false}));

//parse json bodies (as sent by API Clint)
websystem.use(express.json());
websystem.use(cookieParser());


// this is to use the html and css fils => views and public 
websystem.set('view engine', 'hbs');


db.connect((error)=> {
   if (error){
      console.log(error)
   }
   else{
      console.log("MYSQL IS Connected.");
   }
});


//Define Routes
websystem.use('/', require('./routes/pages'));
websystem.use('/auth',require('./routes/auth'))



websystem.listen(5003, () =>{
console.log("server start on port 5003.")
})