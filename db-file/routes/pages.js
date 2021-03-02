const { request } = require("express");
const express = require("express");

const router = express.Router();


// res.render => this is to git the thing that you do it in the folder .

// Home page.
router.get('/',(req,res) =>{
res.render('homePage')
});




// Researcehr pages.
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



// Center General Manager pages.
router.get('/CGMhomepage',(req,res) =>{
   res.render('CGMhomepage')
});

router.get('/CGMcomm',(req,res) =>{
   res.render('CGMcomm')
});





module.exports = router;