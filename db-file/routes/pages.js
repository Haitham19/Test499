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
//Student Researcher pages
router.get('/SRhomepage',(req,res) =>{
   res.render('SRhomepage')
});
router.get('/SRaddnewrequest',(req,res) =>{
   res.render('SRaddnewrequest')
});
//--------------------------------------------//
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

router.get('/CGMrequests',(req,res) =>{
   res.render('CGMrequests')
});


// RD pages.
router.get('/rdHP',(req,res) =>{
   res.render('rdHP')
});

router.get('/rdCOMM',(req,res) =>{
   res.render('rdCOMM')
});

router.get('/rdRequests',(req,res) =>{
   res.render('rdRequests')
});


// Cultural mission pages.
router.get('/missionHP',(req,res) =>{
   res.render('missionHP')
});

// Advisor pages.
router.get('/advisorHP',(req,res) =>{
   res.render('advisorHP')
});
router.get('/advisorCOMM',(req,res) =>{
   res.render('advisorCOMM')
});

// College Dean pages.
router.get('/deanHP',(req,res) =>{
   res.render('deanHP')
});
router.get('/deanCOMM',(req,res) =>{
   res.render('deanCOMM')
});

// Deputyship pages.
router.get('/deputyHP',(req,res) =>{
   res.render('deputyHP')
});
router.get('/deputyCOMM',(req,res) =>{
   res.render('deputyCOMM')
});


module.exports = router;