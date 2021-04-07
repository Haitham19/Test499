const { request } = require("express");
const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

// res.render => this is to git the thing that you do it in the folder .
//
router.post('/researcherSignup', authController.researcherSignup);
router.post('/OrgResSignup', authController.OrgResSignup);
router.post('/generalSignup',authController.generalSignup);
router.post('/educSignup',authController.educSignup);
router.post('/deanSignup',authController.deanSignup);
router.post('/deputySignup',authController.deputySignup);
router.post('/advisorSignup',authController.advisorSignup);
router.post('/missionSignup',authController.missionSignup);
router.post('/CGMSignup',authController.CGMSignup);
router.post('/RDSignup',authController.RDSignup);
router.post('/userLogin',authController.userLogin);
router.post('/SRaddnewrequest', authController.SRaddnewrequest);
router.post('/orgANR', authController.orgANR);
router.post('/SRIupdateinfo', authController.SRIupdateinfo);
router.post('/orgUpdateinfo', authController.orgUpdateinfo);
router.get('/logout',authController.logout);
router.get('/advApp',authController.advApp);
router.get('/deanApp',authController.deanApp);
router.get('/deputyApp',authController.deputyApp);
router.get('/cgmApp',authController.cgmApp);

router.get('/Edone',authController.Edone);

router.post('/Duser', authController.Duser);
router.post('/Uuser', authController.Uuser);

router.post('/advisorUP', authController.advisorUP);
router.post('/deanUP', authController.deanUP);
router.post('/deputyUP', authController.deputyUP);
router.post('/rdUP', authController.rdUP);
router.post('/cgmUP', authController.cgmUP);
router.post('/genUP', authController.genUP);
router.post('/eduUP', authController.eduUP);

router.post('/advRej',authController.advRej);
router.post('/deanRej',authController.deanRej);
router.post('/deputyRej',authController.deputyRej);
router.post('/cgmRej',authController.cgmRej);


router.get('/Dreq',authController.Dreq);
module.exports = router;
