const { request } = require("express");
const express = require("express");
const authController = require('../controllers/auth');

const router = express.Router();


// res.render => this is to git the thing that you do it in the folder .
//
router.post('/researcherSignup', authController.researcherSignup);
router.post('/OrgResSignup', authController.OrgResSignup);
router.post('/MinistrySignup',authController.MinistrySignup);
router.post('/deanSignup',authController.deanSignup);
router.post('/deputySignup',authController.deputySignup);
router.post('/advisorSignup',authController.advisorSignup);
router.post('/missionSignup',authController.missionSignup);
router.post('/CGMSignup',authController.CGMSignup);
router.post('/RDSignup',authController.RDSignup);
router.post('/userLogin',authController.userLogin);
router.post('/researcherLogin',authController.researcherLogin);
router.post('/SRaddnewrequest', authController.SRaddnewrequest);
router.post('/SRIupdateinfo', authController.SRIupdateinfo);
router.get('/logout',authController.logout);
router.post('/Duser', authController.Duser);
router.post('/Uuser', authController.Uuser);


module.exports = router;