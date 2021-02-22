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

exports.ResHomePage=async(req,res)=>{
   try{
      const {email,password}=req.body;

      if(!email || !password){
         return res.status(400).render('ResHomePage',{
            message: 'Please provide an email and password'
         })
      }
      db.query('SELECT * FROM studentresearcher WHERE email = ?', [email], async(error,results)=>{
         console.log(results);
         if(!results|| !(await bcrypt.compare(password,results[0].password))){
            res.status(401).render("/ResHomePage", {
               message: 'Email or Password in incorrect'
            })
         }
         else {
            const id=results[0].id;
            const token= jwt.sign({id:id}, process.env.JWT_SECRET,{
               expiresIn: process.env.JWT_EXPIRES_IN
            })
            console.log("the token is: "+token);
            const cookieOption={
               expires: new Date(
                  Date.now()+ process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60
               ),
                  httpOnly:true
            }
            res.cookie('jwt',token,cookieOption);
            res.status(200).redirect("/ResHomePage");
         }
      })
   }
   catch(error){
      console.log(error);
   }
}

exports.researcherSignup = (req, res) =>{
   console.log(req.body);

   const { name, email, college, deptName, mobNum, country, level, university, password, passwordConfirm }= req.body;

   db.query('SELECT email FROM studentresearcher WHERE email = ?',[email], async(error, results) =>{
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

      db.query('INSERT INTO studentresearcher SET ?',{name:name, email:email, password:hashedPassword, college:college, debtName:deptName, mobNum:mobNum, country:country, level:level, university:university},(error,results) =>{
         if(error){
            console.log(error);
         }
         else{
            console.log(results)
            return res.render('researcherSignup',{
               message:'Researcher Register'
            });
         }
      })
   })
}