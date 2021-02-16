const { request } = require("express");
const express = require("express");

const router = express.Router();


// res.render => this is to git the thing that you do it in the folder .
//
router.get('/',(req,res) =>{
res.render('homePage')
});

router.get("/researcher", (req, res) => {
   //res.send("<h1> Home Page </h1>")
   res.render("researcher")
});

router.get('/researcherSignup',(req,res) =>{
   res.render('researcherSignup')
});

module.exports = router;