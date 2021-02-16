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

<<<<<<< HEAD
      res.send("Testing");
=======
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
>>>>>>> ba2c4af13ad8a12dbdf1a0b44c0de52b7787a6c8
   })
}