const { request } = require("express");
const express = require("express");
const authController1 = require('../controllers/auth1');

const router = express.Router();


// res.render => this is to git the thing that you do it in the folder .
//
router.post('/researcherSignup', authController1.researcherSignup);
router.post('/researcherLogin',authController1.researcherLogin);



module.exports = router;