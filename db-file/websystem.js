const express = require("express");

const websystem = express();

websystem.get("/", (req, res) => {
   res.send("<h1> Home Page </h1>")
});

websystem.listen(5000, () =>{
console.log("server start on post 5000.")
})