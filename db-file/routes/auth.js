const { request } = require("express");
const express = require("express");
const authController = require('../controllers/auth');

const router = express.Router();


// res.render => this is to git the thing that you do it in the folder .
//
router.post('/researcherSignup', authController.researcherSignup);
router.post('/researcherLogin',authController.researcherLogin);
router.post('/OrgResSignup', authController.OrgResSignup);
router.post('/MinistrySignup',authController.MinistrySignup);
router.post('/CGMSignup',authController.CGMSignup);
router.post('/userLogin',authController.userLogin);


module.exports = router;