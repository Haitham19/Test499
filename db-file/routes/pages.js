const { request } = require("express");
const express = require("express");
const authController = require('../controllers/auth');
const router = express.Router();


// res.render => this is to git the thing that you do it in the folder .

// Home page.
router.get('/',(req,res) =>{
res.render('homePage')
});




// Researcehr pages.
router.get('/ResHomePage', authController.isLoggedIn,(req,res) =>{
   if(req.user){
    res.render('ResHomePage',{
       user:req.user
    })
    }else{
      res.redirect('/researcherLogin');
    }
});

router.get("/researcherLogin", (req, res) => {
   //res.send("<h1> Home Page </h1>")
   res.render("researcherLogin")
});


//Student Researcher pages
router.get('/SRhomepage',authController.isLoggedIn,(req,res) =>{
   if(req.user){
    res.render('SRhomepage',{
       user:req.user
    })
    }else{
      res.redirect('/researcherLogin');
    }
});
router.get('/SRaddnewrequest',authController.isLoggedIn,(req,res) =>{
   if(req.user){
    res.render('SRaddnewrequest',{
       user:req.user
    })
    }else{
      res.redirect('/researcherLogin');
    }
   
});
router.get('/SRIupdateinfo',authController.isLoggedIn,(req,res) =>{
   if(req.user){
    res.render('SRIupdateinfo',{
       user:req.user
    })
    }else{
      res.redirect('/researcherLogin');
    }
   
});
//--------------------------------------------//
router.get("/userLogin", (req, res) => {
   //res.send("<h1> Home Page </h1>")
   res.render("userLogin")
});
router.get('/researcherSignup',(req,res) =>{
   res.render('researcherSignup')
});
router.get('/adminReg', authController.isLoggedIn,(req,res) =>{
  if(req.user){
   res.render('adminReg',{
      user:req.user
   })
   }else{
     res.redirect('/userLogin');
   }
   
});
router.get('/adminHP', authController.isLoggedIn, (req,res) =>{
   if(req.user){
      res.render('adminHP',{
         user:req.user
      });
      }else{
        res.redirect('/userLogin');
      }
   
});
router.get('/adminD', authController.isLoggedIn, (req,res) =>{
   if(req.user){
      res.render('adminD',{
         user:req.user
      })
      }else{
        res.redirect('/userLogin');
      }
   
});
router.get('/ministryHP',authController.isLoggedIn,(req,res) =>{
   if(req.user){
    res.render('ministryHP',{
       user:req.user
    })
    }else{
      res.redirect('/userLogin');
    }
});

// Center General Manager pages.
router.get('/CGMhomepage',authController.isLoggedIn,(req,res) =>{
   if(req.user){
    res.render('CGMhomepage',{
       user:req.user
    })
    }else{
      res.redirect('/userLogin');
    }
  
});
router.get('/userSignup',(req,res) =>{
   res.render('userSignup')
});

router.get('/CGMcomm',authController.isLoggedIn,(req,res) =>{
   if(req.user){
    res.render('CGMcomm',{
       user:req.user
    })
    }else{
      res.redirect('/userLogin');
    }
  
});

router.get('/CGMrequests',authController.isLoggedIn,(req,res) =>{
   if(req.user){
    res.render('CGMrequests',{
       user:req.user
    })
    }else{
      res.redirect('/userLogin');
    }
   
});


// RD pages.
router.get('/rdHP',authController.isLoggedIn,(req,res) =>{
   if(req.user){
    res.render('rdHP',{
       user:req.user
    })
    }else{
      res.redirect('/userLogin');
    }
   
});

router.get('/rdCOMM',authController.isLoggedIn,(req,res) =>{
   if(req.user){
    res.render('rdCOMM',{
       user:req.user
    })
    }else{
      res.redirect('/userLogin');
    }
});

router.get('/rdRequests',authController.isLoggedIn,(req,res) =>{
   if(req.user){
    res.render('rdRequests',{
       user:req.user
    })
    }else{
      res.redirect('/userLogin');
    }
});


// Cultural mission pages.
router.get('/missionHP',authController.isLoggedIn,(req,res) =>{
   if(req.user){
    res.render('missionHP',{
       user:req.user
    })
    }else{
      res.redirect('/userLogin');
    }
});

// Advisor pages.
router.get('/advisorHP',authController.isLoggedIn,(req,res) =>{
   if(req.user){
    res.render('advisorHP',{
       user:req.user
    })
    }else{
      res.redirect('/userLogin');
    }
});
router.get('/advisorCOMM',authController.isLoggedIn,(req,res) =>{
   if(req.user){
    res.render('advisorCOMM',{
       user:req.user
    })
    }else{
      res.redirect('/userLogin');
    }
});

// College Dean pages.
router.get('/deanHP',authController.isLoggedIn,(req,res) =>{
   if(req.user){
    res.render('deanHP',{
       user:req.user
    })
    }else{
      res.redirect('/userLogin');
    }
});
router.get('/deanCOMM',authController.isLoggedIn,(req,res) =>{
   if(req.user){
    res.render('deanCOMM',{
       user:req.user
    })
    }else{
      res.redirect('/userLogin');
    }
});

// Deputyship pages.
router.get('/deputyHP',authController.isLoggedIn,(req,res) =>{
   if(req.user){
    res.render('deputyHP',{
       user:req.user
    })
    }else{
      res.redirect('/userLogin');
    }
});
router.get('/deputyCOMM',authController.isLoggedIn,(req,res) =>{
   if(req.user){
    res.render('deputyCOMM',{
       user:req.user
    })
    }else{
      res.redirect('/userLogin');
    }
});


module.exports = router;