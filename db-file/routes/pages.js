const { request } = require("express");
const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();

// res.render => this is to git the thing that you do it in the folder .

// Home page.
router.get("/", (req, res) => {
  res.render("homePage");
});

// Researcehr pages.
router.get("/ResHomePage", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("ResHomePage", {
      user: req.user,
    });
  } else {
    res.redirect("/researcherLogin");
  }
});

router.get("/researcherLogin", (req, res) => {
  //res.send("<h1> Home Page </h1>")
  res.render("researcherLogin");
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

//Student Researcher pages
router.get("/SRhomepage", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("SRhomepage", {
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
router.get("/SRaddnewrequest", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("SRaddnewrequest", {
      user: req.user,
    });
  } else {
    res.redirect("/researcherLogin");
  }
});
router.get("/SRIupdateinfo", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("SRIupdateinfo", {
      user: req.user,
    });
    console.log(req.user);
  } else {
    res.redirect("/researcherLogin");
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
router.get("/ministryHP", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("ministryHP", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/ministryU", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("ministryU", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});

// Center General Manager pages.
router.get("/cgmHP", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("cgmHP", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});
router.get("/userSignup", (req, res) => {
  res.render("userSignup");
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
    res.render("deputyReq", {
      request: req.request,
    });
  } else {
    if (req.user) {
      res.render("cgmHP", {
        message: "there is no request to chick",
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

// RD pages.
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

// Cultural mission pages.
router.get("/missionHP", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("missionHP", {
      user: req.user,
    });
  } else {
    res.redirect("/userLogin");
  }
});

// Advisor pages.
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
        message: "there is no request to chick",
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

// College Dean pages.
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
        message: "there is no request to chick",
        user: req.user,
      });
    } else {
      res.redirect("/userLogin");
    }
  }
});

// Deputyship pages.
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
        message: "there is no request to chick",
        user: req.user,
      });
    } else {
      res.redirect("/userLogin");
    }
  }
});

module.exports = router;
