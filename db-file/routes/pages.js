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
router.get('/SRhomepage',(req,res) =>{
   res.render('SRhomepage')
});
router.get("/userLogin", (req, res) => {
   //res.send("<h1> Home Page </h1>")
   res.render("userLogin")
});
router.get('/researcherSignup',(req,res) =>{
   res.render('researcherSignup')
});
router.get('/adminReg',(req,res) =>{
   res.render('adminReg')
});
router.get('/adminHP',(req,res) =>{
   res.render('adminHP')
});
router.get('/ministryHP',(req,res) =>{
   res.render('ministryHP')
});

// Center General Manager pages.
router.get('/CGMhomepage',(req,res) =>{
   res.render('CGMhomepage')
});
router.get('/userSignup',(req,res) =>{
   res.render('userSignup')
});

router.get('/CGMcomm',(req,res) =>{
   res.render('CGMcomm')
});

// Advisor pages.
router.get('/advisorHP',(req,res) =>{
   res.render('advisorHP')
});
router.get('/advisorCOMM',(req,res) =>{
   res.render('advisorCOMM')
});

module.exports = router;