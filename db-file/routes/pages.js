const { request } = require("express");
const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();

// res.render => this is to git the thing that you do it in the folder .

// Home page.
router.get("/", (req, res) => {
  res.render("homePage");
});


router.get("/orgHP", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("orgHP", {
      user: req.user,
    });
  } else {
    res.redirect("/researcherLogin");
  }
});
router.get("/orgANR", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("orgANR", {
      user: req.user,
    });
  } else {
    res.redirect("/orgANR");
  }
});
router.get("/orgUpdateinfo", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("orgUpdateinfo", {
      user: req.user,
    });
    console.log(req.user);
  } else {
    res.redirect("/orgUpdateinfo");
  }
});
//-----------------------STUDENT=--------------------//
router.get("/SRhomepage", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("SRhomepage", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/SRaddnewrequest", authController.srREq, (req, res) => {
  if (!req.edu) {
    if(!req.gen){
      if(req.user){
        res.render("SRhomepage", {
          user: req.user,
        });
      }
      else {
        res.redirect("/userLogin");
      }
    }
  }
  else{
    return res.status(200).render("SRaddnewrequest",{
      edu:req.edu,
      gen:req.gen
    })
  }
});
router.get("/SRI_Req", authController.SRIRequsets, (req, res) => {
  if (req.reqJ) {
      return res.status(200).render("SRI_Req", {
      reqJ: req.reqJ
    });
  }
  if (req.request) {
    if(req.edu){
      if(req.gen){
        res.render("SRI_Req", {
          edu:req.edu,
          gen:req.gen,
          request: req.request,
        });
      }
      else{
        res.render("SRI_Req", {
        edu:req.edu,
        request: req.request,
        })
      }
    }
    else if(req.gen){
      res.render("SRI_Req", {
        gen:req.gen,
        request: req.request,
        })
    }else{
      res.render("SRI_Req", {
        request: req.request,
        })
    }
    
  } else {
    if (req.user) {
      res.render("SRhomepage", {
        message: "there are no requests to check",
        user: req.user,
      });
    } else {
      res.redirect("/userLogin");
    }
  }
});
router.get("/SRIupdateinfo", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("SRIupdateinfo", {
      user: req.user,
    });
    console.log(req.user);
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/SRcomm", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("SRcomm", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/SRInbox", authController.SRinbox, (req, res) => {
  if (req.mes) {
    res.render("SRInbox", {
      mes: req.mes,
    });
  }else if(req.user){
    res.render("SRhomepage", {
      message: "you don't have any messages",
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/SRrating", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("SRrating", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
//--------------------------------------------//
router.get("/userLogin", (req, res) => {
  //res.send("<h1> Home Page </h1>")
  res.render("userLogin");
});
router.get("/researcherSignup", (req, res) => {
  res.render("researcherSignup");
});
//--------------ADMIN--------------------
router.get("/adminReg", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("adminReg", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/adminHP", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("adminHP", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/adminD", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("adminD", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/adminU", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("adminU", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});


// -------------------------Center General Manager pages---------------------------------
router.get("/cgmHP", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("cgmHP", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/userLogin", (req, res) => {
  res.render("userLogin");
});
router.get("/cgmCOMM", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("cgmCOMM", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/cgmReq", authController.cgmRequsets, (req, res) => {
  if (req.request) {
    if(req.edu){
      if(req.gen){
        res.render("cgmReq", {
          edu:req.edu,
          gen:req.gen,
          request: req.request,
        });
      }
      else{
        res.render("cgmReq", {
        edu:req.edu,
        request: req.request,
        })
      }
    }
    else if(req.gen){
      res.render("cgmReq", {
        gen:req.gen,
        request: req.request,
        })
    }else{
      res.render("cgmReq", {
        request: req.request,
        })
    }
    
  } else {
    if (req.user) {
      res.render("cgmHP", {
        message: "there are no requests to check",
        user: req.user,
      });
    } else {
      res.redirect("/userLogin");
    }
  }
});
router.get("/cgmFind", authController.cgmfinds, (req, res) => {
  if (req.request) {
    return res.status(200).render("cgmFind", {
      request: req.request,
    });
  }
  if(req.uesr){
    res.render("cgmHP", {
      uesr: req.uesr,
      message:"there are no requests to Find"
    });
  }
  else {
    res.redirect("/userLogin");
  }
});
router.get("/cgmFinded", authController.isLoggedIn, (req, res) => {
  if(req.request){
    
    res.render("cgmFinded", {
      request: req.request,
    });
  }
  else{
    res.render("cgmHP", {
      message: "didn't find",
    });
  }
  res.redirect("/userLogin");
});
router.get("/cgmU", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("cgmU", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/cgmInbox", authController.cgminbox, (req, res) => {
  if (req.mes) {
    res.render("cgmInbox", {
      mes: req.mes,
    });
  }else if(req.user){
    res.render("cgmHP", {
      message: "you don't have any messages",
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});

// -------------------RD pages-----------------------------//.
router.get("/rdHP", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("rdHP", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/rdU", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("rdU", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/rdCOMM", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("rdCOMM", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/rdFind", authController.rdfinds, (req, res) => {
  if (req.request) {
    return res.status(200).render("rdFind", {
      request: req.request,
    });
  }
  if(req.uesr){
    res.render("rdHP", {
      uesr: req.uesr,
      message:"there are no requests to Find"
    });
  }
  else {
    res.redirect("/userLogin");
  }
});
router.get("/rdFinded", authController.isLoggedIn, (req, res) => {
    if(req.request){
      
      res.render("rdFinded", {
        request: req.request,
      });
    }
    else{
      res.render("rdHP", {
        message: "didn't find",
      });
    }
    res.redirect("/userLogin");
});
router.get("/rdRequests", authController.rdRequests, (req, res) => {
  if (req.request) {
    if(req.edu){
      if(req.gen){
        res.render("rdRequests", {
          edu:req.edu,
          gen:req.gen,
          request: req.request,
        });
      }
      else{
        res.render("rdRequests", {
        edu:req.edu,
        request: req.request,
        })
      }
    }
    else if(req.gen){
      res.render("rdRequests", {
        gen:req.gen,
        request: req.request,
        })
    }else{
      res.render("rdRequests", {
        request: req.request,
        })
    }
    
  } else {
    if (req.user) {
      res.render("rdHP", {
        message: "there are no requests to check",
        user: req.user,
      });
    } else {
      res.redirect("/userLogin");
    }
  }
});
router.get("/rdInbox", authController.RDinbox, (req, res) => {
  if (req.mes) {
    res.render("rdInbox", {
      mes: req.mes,
    });
  }else if(req.user){
    res.render("rdHP", {
      message: "you don't have any messages",
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});

// ---------------------Cultural mission pages------------------//
router.get("/missionHP", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("missionHP", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});

// ------------------------Advisor pages----------------------------//
router.get("/advisorHP", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("advisorHP", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/advisorReq", authController.advRequsets, (req, res) => {
  if (req.request) {
    if(req.edu){
      if(req.gen){
        res.render("advisorReq", {
          edu:req.edu,
          gen:req.gen,
          request: req.request,
        });
      }
      else{
        res.render("advisorReq", {
        edu:req.edu,
        request: req.request,
        })
      }
    }
    else if(req.gen){
      res.render("advisorReq", {
        gen:req.gen,
        request: req.request,
        })
    }else{
      res.render("advisorReq", {
        request: req.request,
        })
    }
    
  } else {
    if (req.user) {
      res.render("advisorHP", {
        message: "there are no requests to check",
        user: req.user,
      });
    } else {
      res.redirect("/userLogin");
    }
  }
});
router.get("/advisorU", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("advisorU", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/advisorCOMM", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("advisorCOMM", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/advisorInbox", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("advisorInbox", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});


// --------------------------College Dean pages----------------//
router.get("/deanHP", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("deanHP", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/deanU", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("deanU", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/deanCOMM", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("deanCOMM", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/deanInbox", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("deanInbox", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/deanReq", authController.deanRequsets, (req, res) => {
  if (req.request) {
    if(req.edu){
      if(req.gen){
        res.render("deanReq", {
          edu:req.edu,
          gen:req.gen,
          request: req.request,
        });
      }
      else{
        res.render("deanReq", {
        edu:req.edu,
        request: req.request,
        })
      }
    }
    else if(req.gen){
      res.render("deanReq", {
        gen:req.gen,
        request: req.request,
        })
    }else{
      res.render("deanReq", {
        request: req.request,
        })
    }
    
  } else {
    if (req.user) {
      res.render("deanHP", {
        message: "there are no requests to check",
        user: req.user,
      });
    } else {
      res.redirect("/userLogin");
    }
  }
});

// ----------------------Deputyship pages--------------------------//
router.get("/deputyHP", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("deputyHP", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/deputyU", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("deputyU", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/deputyCOMM", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("deputyCOMM", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/deputyInbox", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("deputyInbox", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/deputyReq", authController.deputyRequsets, (req, res) => {
  if (req.request) {
    if(req.edu){
      if(req.gen){
        res.render("deputyReq", {
          edu:req.edu,
          gen:req.gen,
          request: req.request,
        });
      }
      else{
        res.render("deputyReq", {
        edu:req.edu,
        request: req.request,
        })
      }
    }
    else if(req.gen){
      res.render("deputyReq", {
        gen:req.gen,
        request: req.request,
        })
    }else{
      res.render("deputyReq", {
        request: req.request,
        })
    }
    
  } else {
    if (req.user) {
      res.render("deputyHP", {
        message: "there are no requests to check",
        user: req.user,
      });
    } else {
      res.redirect("/userLogin");
    }
  }
});
//----------------------General----------------//
router.get("/genHP", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("genHP", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/genU", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("genU", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/genCOMM", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("genCOMM", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/genInbox", authController.geninbox, (req, res) => {
  if (req.mes) {
    res.render("genInbox", {
      mes: req.mes,
    });
  }else if(req.user){
    res.render("genHP", {
      message: "you don't have any messages",
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/genReq", authController.genRequsets, (req, res) => {
  if (req.request) {
    res.render("genReq", {
      request: req.request,
    });
  } else {
    if (req.user) {
      res.render("genHP", {
        message: "there are no requests to check",
        user: req.user,
      });
    } else {
      res.redirect("/userLogin");
    }
  }
});



//-----------------------Education-----------------//
router.get("/eduHP", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("eduHP", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/eduU", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("eduU", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/eduCOMM", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("eduCOMM", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/eduInbox", authController.eduinbox, (req, res) => {
  if (req.mes) {
    res.render("eduInbox", {
      mes: req.mes,
    });
  }else if(req.user){
    res.render("eduHP", {
      message: "you don't have any messages",
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/eduReq", authController.eduRequsets, (req, res) => {
  if (req.request) {
    res.render("eduReq", {
      request: req.request,
    });
  } else {
    if (req.user) {
      res.render("eduHP", {
        message: "there are no requests to check",
        user: req.user,
      });
    } else {
      res.redirect("/userLogin");
    }
  }
});

module.exports = router;
