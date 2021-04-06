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
router.get("/SRaddnewrequest", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("SRaddnewrequest", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/SRI_Req", authController.SRIRequsets, (req, res) => {
  if (req.reqJ) {
    res.render("SRI_Req", {
      reqJ: req.reqJ,
    });
  } 
  else if(req.reqW){
    res.render("SRI_Req", {
      reqW: req.reqW,
    });
  }
  else {
    if (req.user) {
      res.render("SRhomepage", {
        message: "you don't have any requests",
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
    console.log(req.user);
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/SRInbox", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("SRInbox", {
      user: req.user,
    });
    console.log(req.user);
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
    res.render("cgmReq", {
      request: req.request,
    });
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
router.get("/cgmU", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("cgmU", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/cgmInbox", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("cgmInbox", {
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

router.get("/rdRequests", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("rdRequests", {
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
    res.render("advisorReq", {
      request: req.request,
    });
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
router.get("/deanReq", authController.deanRequsets, (req, res) => {
  if (req.request) {
    res.render("deanReq", {
      request: req.request,
    });
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
router.get("/deputyReq", authController.deputyRequsets, (req, res) => {
  if (req.request) {
    res.render("deputyReq", {
      request: req.request,
    });
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
