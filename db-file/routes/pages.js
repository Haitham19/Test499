const { request } = require("express");
const express = require("express");

const router = express.Router();


// res.render => this is to git the thing that you do it in the folder .
//
router.get('/',(req,res) =>{
res.render('homePage')
});
router.get('/ResHomePage',(req,res) =>{
   res.render('ResHomePage')
});

router.get("/researcherLogin", (req, res) => {
   //res.send("<h1> Home Page </h1>")
   res.render("researcherLogin")
});

router.get('/researcherSignup',(req,res) =>{
   res.render('researcherSignup')
});

router.get('/CGMhomepage',(req,res) =>{
   res.render('CGMhomepage')
});

module.exports = router;