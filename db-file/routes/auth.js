const { request } = require("express");
const express = require("express");
const authController = require('../controllers/auth');

const router = express.Router();


// res.render => this is to git the thing that you do it in the folder .
//
router.post('/researcherSignup', authController.researcherSignup);
router.post('/ResHomePage',authController.ResHomePage);



module.exports = router;