const { request } = require("express");
const express = require("express");

const router = express.Router();


// res.render => this is to git the thing that you do it in the folder .
//
router.get('/',(req,res) =>{
res.render('home-page')
});

router.get("/researcher", (req, res) => {
   //res.send("<h1> Home Page </h1>")
   res.render("researcher")
});

router.get('/researcher-signup',(req,res) =>{
   res.render('researcher-signup')
});

module.exports = router;