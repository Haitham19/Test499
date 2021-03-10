const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// we use process.env for security => detrnv .
//we can creat file with coonection and importit whene we whant.
const db = mysql.createConnection({
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   password:process.env.DATABASE_PASSWORD,
   database:process.env.DATABASE
});

exports.researcherLogin = async(req,res)=>{
   try{
      const {email,password}=req.body;

      if(!email || !password){
         return res.status(400).render('researcherLogin',{
            message: 'Please provide an email and password'
         })
      }
   db.query('SELECT * FROM organizationresearcher WHERE email = ?',[email],async(error,result)=>{
      db.query('SELECT * FROM studentresearcher WHERE email = ?', [email], async(error,results)=>{
         console.log("organization -"+result)
         console.log("student -"+results);
         if (results.length==0) {
            if(result.length==0){
            res.status(401).render("researcherLogin", {
               message: 'Email does not exist'
            }) //this is what you are missing
            }
            else if(!(await bcrypt.compare(password,result[0].password))){
               res.status(401).render("researcherLogin", {
                  message: 'Email or Password is incorrect'
               }) 
            }
            else{
               const id=result[0].id;
            const token= jwt.sign({id:id}, process.env.JWT_SECRET,{
               expiresIn: process.env.JWT_EXPIRES_IN
            })
            console.log("the token is: "+token);
            const cookieOption={
               expires: new Date(
                  Date.now()+ process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
               ),
                  httpOnly:true
            }
            res.cookie('jwt',token,cookieOption);
            res.status(200).redirect("/");//"/OrgHomePage"
            return;
            }
/////////////////////////////////////////////////////////////////////////////////////////
          }
         else if(!(await bcrypt.compare(password,results[0].password))){
            res.status(401).render("researcherLogin", {
               message: 'Email or Password is incorrect'
            })
         }else {
            const id=results[0].id;
            const token= jwt.sign({id:id}, process.env.JWT_SECRET,{
               expiresIn: process.env.JWT_EXPIRES_IN
            })
            console.log("the token is: "+token);
            const cookieOption={
               expires: new Date(
                  Date.now()+ process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
               ),
                  httpOnly:true
            }
            res.cookie('jwt',token,cookieOption);
            res.status(200).redirect("/SRhomepage");
         }
         
      })
   })
   }
   catch(error){
      console.log(error);
   }
}

exports.userLogin = async(req,res)=>{
   try{
      const {email,password}=req.body;

      if(!email || !password){
         return res.status(400).render('userLogin',{
            message: 'Please provide an email and password'
         })
      }
      db.query('SELECT * FROM users WHERE email = ?', [email], async(error,results)=>{
         db.query('SELECT * FROM ministry WHERE email = ?', [email], async(erro,result)=>{
         
         if (result.length==0) {

            if(results.length==0){
            res.status(401).render("userLogin", {
               message: 'Email does not exist'
            })
            }
            else if(!(await bcrypt.compare(password,results[0].password))){
               res.status(401).render("userLogin", {
                  message: 'Email or Password is incorrect'
               }) 
            }
            else{
               const id=results[0].userID;
            const token= jwt.sign({id:id}, process.env.JWT_SECRET,{
               expiresIn: process.env.JWT_EXPIRES_IN
            })
            console.log("the token is: "+token);
            const cookieOption={
               expires: new Date(
                  Date.now()+ process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
               ),
                  httpOnly:true
            }
            res.cookie('jwt',token,cookieOption);
            res.status(200).redirect("/adminHP");//"/OrgHomePage"
            return;
            }
          }
         else if(!(await bcrypt.compare(password,result[0].password))){
            res.status(401).render("userLogin", {
               message: 'Email or Password is incorrect'
            })
         }else {
            const id=result[0].id;
            const token= jwt.sign({id:id}, process.env.JWT_SECRET,{
               expiresIn: process.env.JWT_EXPIRES_IN
            })
            console.log("the token is: "+token);
            const cookieOption={
               expires: new Date(
                  Date.now()+ process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
               ),
                  httpOnly:true
            }
            res.cookie('jwt',token,cookieOption);
            res.status(200).redirect("/ministryHP");
         }
      })
      })
   }
   catch(error){
      console.log(error);
   }
}
/*
         */
      
//this is function for  Researcher rejesterition 
exports.researcherSignup = (req, res) =>{
   console.log(req.body);

   const { name, email, college, deptName, mobNum, country, level, university, password, passwordConfirm }= req.body;
   const type="student";
   db.query('SELECT email FROM users WHERE email = ?',[email], async(error, results) =>{
      if(error){
         console.log(error)
      }

      if(results.length > 0){
         return res.render('researcherSignup',{
            message:'The email is already in use'
         })
      }
      else if (password !== passwordConfirm){
         return res.render('researcherSignup',{
            message:'password do not match'
         })
      }
      
      let hashedPassword = await bcrypt.hash(password, 8);
      db.query('INSERT INTO users SET ?',{email:email, mobNum:mobNum,password:hashedPassword},(erro,result) =>{
         if(erro){
            return res.render('researcherSignup',{
               message:'The mobile number is already in use'
            })
         }
         db.query('INSERT INTO studentresearcher SET ?',{name:name, email:email, password:hashedPassword, college:college, debtName:deptName, mobNum:mobNum, country:country, level:level, university:university},(error,results) =>{
            if(error){
               console.log(error);
            }
            else{
               console.log(results);
               console.log(result);
               return res.render('researcherSignup',{
               message:'Researcher Register'
            });
            }
         })
      })
   })
}

exports.OrgResSignup = (req, res) =>{
   console.log(req.body);

   const { name, email,  mobNum, organization, password, passwordConfirm }= req.body;

   db.query('SELECT email FROM users WHERE email = ?',[email], async(error, results) =>{
      if(error){
         console.log(error)
      }

      if(results.length > 0){
         return res.render('researcherSignup',{
            message:'The email is already in use'
         })
      }
      else if (password !== passwordConfirm){
         return res.render('researcherSignup',{
            message:'password do not match'
         })
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);
      db.query('INSERT INTO users SET ?',{email:email,  mobNum:mobNum,password:hashedPassword},(erro,result) =>{
         if(erro){
            return res.render('researcherSignup',{
               message:'The mobile number is already in use'
            })
         }
         db.query('INSERT INTO organizationresearcher SET ?',{name:name, email:email, password:hashedPassword, mobNum:mobNum,organization:organization},(error,results) =>{
         
            if(error){
               console.log(error);
            }
            else{
               console.log(results)
               return res.render('researcherSignup',{
               message:'Organization Researcher Registered'
               });
            }
         })   
      })
   })
}


exports.MinistrySignup = (req, res) =>{
   console.log(req.body);

   const { name, email,  password,mobNum, passwordConfirm }= req.body;

   db.query('SELECT email FROM users WHERE email = ?',[email], async(error, results) =>{
      if(error){
         console.log(error)
      }

      if(results.length > 0){
         return res.render('adminReg',{
            message:'The email is already in use'
         })
      }
      else if (password !== passwordConfirm){
         return res.render('adminReg',{
            message:'password do not match'
         })
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);
   db.query('INSERT INTO users SET ?',{email:email,  mobNum:mobNum,password:hashedPassword},(erro,result) =>{
      if(erro){
         return res.render('researcherSignup',{
         message:'The mobile number is already in use'
         })
      }
      db.query('INSERT INTO ministry SET ?',{name:name, email:email, password:hashedPassword, mobNum:mobNum,},(error,results) =>{
         if(error){
            console.log(error);
         }
         else{
            console.log(results)
            return res.render('adminReg',{
            message:'Ministry Register'
            });
         }
      })
      })
   })
}