const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {promisify} =require("util");
const { error } = require("console");
const e = require("express");

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
               const email=result[0].email;
            const token= jwt.sign({id:id,email:email}, process.env.JWT_SECRET,{
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
            const email=results[0].email;
            const token= jwt.sign({id:id,email:email}, process.env.JWT_SECRET,{
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
         db.query('SELECT * FROM ministry WHERE email = ?', [email], async(error,mini)=>{
            db.query('SELECT * FROM cgm WHERE email = ?', [email], async(error,cgm)=>{
               db.query('SELECT * FROM advisor WHERE email = ?', [email], async(error,adv)=>{
                  db.query('SELECT * FROM deputy WHERE email = ?', [email], async(error,depu)=>{
                     db.query('SELECT * FROM dean WHERE email = ?', [email], async(error,dean)=>{
                        db.query('SELECT * FROM mission WHERE email = ?', [email], async(error,mis)=>{
                           db.query('SELECT * FROM rd WHERE email = ?', [email], async(error,rd)=>{
                              if (mini.length==0){
                                 if(cgm.length==0){
                                    if(adv.length==0){
                                       if(depu.length==0){
                                          if(dean.length==0){
                                             if(mis.length==0){
                                                if(rd.length==0){
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
                                                      const email=results[0].email;
                                                   const token= jwt.sign({id:id,email:email}, process.env.JWT_SECRET,{
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
                                                   res.status(200).redirect("/adminHP");//
                                                   return;
                                                   }
                                                }
                                                else if(!(await bcrypt.compare(password,rd[0].password))){
                                                   res.status(401).render("userLogin", {
                                                      message: 'Email or Password is incorrect'
                                                   })
                                                }
                                                else{
                                                   const id=rd[0].id;
                                                   const email=rd[0].email;
                                                const token= jwt.sign({id:id,email:email}, process.env.JWT_SECRET,{
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
                                                res.status(200).redirect("/rdHP");
                                                }
                                             }
                                             else if(!(await bcrypt.compare(password,mis[0].password))){
                                                res.status(401).render("userLogin", {
                                                   message: 'Email or Password is incorrect'
                                                })
                                             }
                                             else{
                                                const id=mis[0].id;
                                                const email=mis[0].email;
                                             const token= jwt.sign({id:id,email:email}, process.env.JWT_SECRET,{
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
                                             res.status(200).redirect("/missionHP");//missionHP
                                             }
                                          }
                                          else if(!(await bcrypt.compare(password,dean[0].password))){
                                             res.status(401).render("userLogin", {
                                                message: 'Email or Password is incorrect'
                                             })
                                          }
                                          else {
                                             const id=dean[0].id;
                                             const email=dean[0].email;
                                             const token= jwt.sign({id:id,email:email}, process.env.JWT_SECRET,{
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
                                             res.status(200).redirect("/deanHP");
                                          }
                                       }
                                       else if(!(await bcrypt.compare(password,depu[0].password))){
                                          res.status(401).render("userLogin", {
                                             message: 'Email or Password is incorrect'
                                          })
                                       }
                                       else {
                                          const id=depu[0].id;
                                          const email=depu[0].email;
                                          const token= jwt.sign({id:id,email:email}, process.env.JWT_SECRET,{
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
                                          res.status(200).redirect("/deputyHP");
                                       }
                                    }
                                    else if(!(await bcrypt.compare(password,adv[0].password))){
                                          res.status(401).render("userLogin", {
                                             message: 'Email or Password is incorrect'
                                          })
                                       }
                                       else {
                                          const id=adv[0].id;
                                          const email=adv[0].email;
                                          const token= jwt.sign({id:id,email:email}, process.env.JWT_SECRET,{
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
                                          res.status(200).redirect("/advisorHP");
                                       }
                                    }
                                    else if(!(await bcrypt.compare(password,cgm[0].password))){
                                       res.status(401).render("userLogin", {
                                          message: 'Email or Password is incorrect'
                                       })
                                    }
                                    else {
                                       const id=cgm[0].id;
                                       const email=cgm[0].email;
                                       const token= jwt.sign({id:id,email:email}, process.env.JWT_SECRET,{
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
                                       res.status(200).redirect("/cgmHP");
                                    }
                                 }
                                 else if(!(await bcrypt.compare(password,mini[0].password))){
                                    res.status(401).render("userLogin", {
                                       message: 'Email or Password is incorrect'
                                    })
                                 }
                                 else {
                                    const id=mini[0].id;
                                    const email=mini[0].email;
                                    const token= jwt.sign({id:id,email:email}, process.env.JWT_SECRET,{
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
                     })
                  })
               })
            })
         })
      })
   }
   catch(error){
      console.log(error);
   }
}
/*
         */
      
//this section is for Sign up 
exports.researcherSignup = (req, res) =>{
   const { name, email, college, deptName, mobNum, country, level, university, password, passwordConfirm }= req.body;
   
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
         db.query('SELECT * FROM users WHERE email=?',[email],(error,resul)=>{
            db.query('INSERT INTO studentresearcher SET ?',{userID:resul[0].userID,name:name, email:email, password:hashedPassword, college:college, deptName:deptName, mobNum:mobNum, country:country, level:level, university:university },(error,results) =>{
               if(error){
                  console.log(error);
               }
               else{
                  return res.render('researcherSignup',{
                  message:'Student Researcher Registered'
               });
               }
            })
               
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
      db.query('INSERT INTO users SET ?',{email:email,mobNum:mobNum,password:hashedPassword},(erro,result) =>{
         if(erro){
            return res.render('researcherSignup',{
               message:'The mobile number is already in use'
            })
         }
         db.query('SELECT * FROM users WHERE email=?',[email],(error,resul)=>{
         db.query('INSERT INTO organizationresearcher SET ?',{userID:resul[0].userID,name:name, email:email, password:hashedPassword, mobNum:mobNum,organization:organization},(error,results) =>{
            if(error){
               console.log(error);
            }
            else{
               return res.render('researcherSignup',{
               message:'Organization Researcher Registered'
               });
            }
         })
      })   
      })
   })
}
exports.researcherOutSideSignup= (req,res)=>{
   const { name, email, college, deptName, mobNum, country, level, university, password, passwordConfirm }= req.body;
   
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
         db.query('SELECT * FROM users WHERE email=?',[email],(error,resul)=>{
                  db.query('INSERT INTO studentresearcher SET ?',{advisorEmail:adv,userID:resul[0].userID,name:name, email:email, password:hashedPassword, college:college, debtName:deptName, mobNum:mobNum, country:country, level:level, university:university },(error,results) =>{
                     if(error){
                        console.log(error);
                     }
                     else{
                        return res.render('researcherLogin',{
                        message:'Student Researcher Registered'
                     });
                     }
                  }) 
            
         })
      })
   })
}
exports.advisorSignup=(req,res)=>{
   const { name, email,  password,mobNum, passwordConfirm,de }= req.body;

   db.query('SELECT email FROM users WHERE email = ?',[email], async(error, results) =>{
      if(error){
         console.log(error)
      }

      if(results.length > 0){
         return res.render('userSignup',{
            message:'The email is already in use'
         })
      }
      else if (password !== passwordConfirm){
         return res.render('userSignup',{
            message:'password do not match'
         })
      }
      let hashedPassword = await bcrypt.hash(password, 8);
         db.query('SELECT * FROM dean WHERE email=?',[de],(error,resu)=>{
           
            if(error){
               console.log(error);
            }
            if(resu.length==0){
               return res.render('userSignup',{
                  message:'College Dean email does not exist'
               })
            }
            else{
            db.query('INSERT INTO users SET ?',{email:email,  mobNum:mobNum,password:hashedPassword},(erro,result) =>{
               if(erro){
                  return res.render('userSignup',{
                  message:'The mobile number is already in use'
                  })
               }
               db.query('SELECT * FROM users WHERE email=?',[email],(error,resul)=>{
                  db.query('INSERT INTO advisor SET ?',{deanEmail:de,userID:resul[0].userID,name:name, email:email, password:hashedPassword, mobNum:mobNum,},(error,results) =>{
                     if(error){
                        console.log(error);
                     }
                     else{
                        return res.render('userSignup',{
                        message:'Advisor Registered'
                        });
                     }
                  })               
               })
            })
            }
         })      
   })
}
exports.deanSignup=(req,res)=>{
   const { name, email,  password,mobNum, passwordConfirm,de }= req.body;

   db.query('SELECT email FROM users WHERE email = ?',[email], async(error, results) =>{
      if(error){
         console.log(error)
      }

      if(results.length > 0){
         return res.render('userSignup',{
            message:'The email is already in use'
         })
      }
      else if (password !== passwordConfirm){
         return res.render('userSignup',{
            message:'password do not match'
         })
      }
      let hashedPassword = await bcrypt.hash(password, 8);
         db.query('SELECT * FROM deputy WHERE email=?',[de],(error,resu)=>{
           
            if(error){
               console.log(error);
            }
            if(resu.length==0){
               return res.render('userSignup',{
                  message:'Deputy email does not exist'
               })
            }
            else{
            db.query('INSERT INTO users SET ?',{email:email,  mobNum:mobNum,password:hashedPassword},(erro,result) =>{
               if(erro){
                  return res.render('userSignup',{
                  message:'The mobile number is already in use'
                  })
               }
               db.query('SELECT * FROM users WHERE email=?',[email],(error,resul)=>{
                  db.query('INSERT INTO dean SET ?',{deputyEmail:de,userID:resul[0].userID,name:name, email:email, password:hashedPassword, mobNum:mobNum,},(error,results) =>{
                     if(error){
                        console.log(error);
                     }
                     else{
                        return res.render('userSignup',{
                        message:'College Dean Registered'
                        });
                     }
                  })               
               })
            })
            }
         })
      
   })
}
exports.deputySignup=(req,res)=>{
   const { name, email,  password,mobNum, passwordConfirm }= req.body;

   db.query('SELECT email FROM users WHERE email = ?',[email], async(error, results) =>{
      if(error){
         console.log(error)
      }

      if(results.length > 0){
         return res.render('userSignup',{
            message:'The email is already in use'
         })
      }
      else if (password !== passwordConfirm){
         return res.render('userSignup',{
            message:'password do not match'
         })
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      db.query('INSERT INTO users SET ?',{email:email,  mobNum:mobNum,password:hashedPassword},(erro,result) =>{
         if(erro){
            return res.render('userSignup',{
            message:'The mobile number is already in use'
            })
         }
         db.query('SELECT * FROM users WHERE email=?',[email],(error,resul)=>{
            db.query('INSERT INTO deputy SET ?',{userID:resul[0].userID,name:name, email:email, password:hashedPassword, mobNum:mobNum,},(error,results) =>{
               if(error){
                  console.log(error);
               }
               else{
                  return res.render('userSignup',{
                  message:'Deputyship user Registered'
                  });
               }
            })
         })
      })
   })
}
exports.missionSignup=(req,res)=>{
   const { name, email,  password,mobNum, passwordConfirm }= req.body;

   db.query('SELECT email FROM users WHERE email = ?',[email], async(error, results) =>{
      if(error){
         console.log(error)
      }

      if(results.length > 0){
         return res.render('userSignup',{
            message:'The email is already in use'
         })
      }
      else if (password !== passwordConfirm){
         return res.render('userSignup',{
            message:'password do not match'
         })
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      db.query('INSERT INTO users SET ?',{email:email,  mobNum:mobNum,password:hashedPassword},(erro,result) =>{
         if(erro){
            return res.render('userSignup',{
            message:'The mobile number is already in use'
            })
         }
         db.query('SELECT * FROM users WHERE email=?',[email],(error,resul)=>{
            db.query('INSERT INTO mission SET ?',{userID:resul[0].userID,name:name, email:email, password:hashedPassword, mobNum:mobNum,},(error,results) =>{
               if(error){
                  console.log(error);
               }
               else{
                  return res.render('userSignup',{
                  message:'Cultural Mission user Registered'
                  });
               }
            })
         })
      })
   })
}
exports.MinistrySignup = (req, res) =>{
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
      db.query('INSERT INTO users SET ?',{email:email,  mobNum:mobNum,password:hashedPassword},(erro,result) =>{
         if(erro){
            return res.render('adminReg',{
            message:'The mobile number is already in use'
            })
         }
         db.query('SELECT * FROM users WHERE email=?',[email],(error,resul)=>{
            db.query('INSERT INTO ministry SET ?',{userID:resul[0].userID,name:name, email:email, password:hashedPassword, mobNum:mobNum,},(error,results) =>{
               if(error){
                  console.log(error);
               }
               else{
                  return res.render('adminReg',{
                  message:'Ministry Registered'
                  });
               }
            })
         })
      })
   })
}
exports.CGMSignup = (req, res) =>{
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
      db.query('INSERT INTO users SET ?',{email:email, mobNum:mobNum, password:hashedPassword},(erro,result) =>{
         if(erro){
            return res.render('adminReg',{
            message:'The mobile number is already in use'
            })
         }
         db.query('SELECT * FROM users WHERE email=?',[email],(error,resul)=>{
            db.query('INSERT INTO cgm SET ?',{userID:resul[0].userID,name:name, email:email, mobNum:mobNum, password:hashedPassword, },(error,results) =>{
               if(error){
                  console.log(error);
               }
               else{
                  return res.render('adminReg',{
                  message:'Center General Manager Registered'
                  });
               }
            })
         })
      })
   })
}
exports.RDSignup = (req, res) =>{
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
      db.query('INSERT INTO users SET ?',{email:email, mobNum:mobNum, password:hashedPassword},(erro,result) =>{
         if(erro){
            return res.render('adminReg',{
            message:'The mobile number is already in use'
            })
         }
         db.query('SELECT * FROM users WHERE email=?',[email],(error,resul)=>{
            db.query('INSERT INTO rd SET ?',{userID:resul[0].userID,name:name, email:email, mobNum:mobNum, password:hashedPassword, },(error,results) =>{
               if(error){
                  console.log(error);
               }
               else{
                  return res.render('adminReg',{
                  message:'Research and Development Department User Registered'
                  });
               }
            })
         })
      })
   })
}


// add SRrequest 
exports.SRaddnewrequest = async (req, res) =>{
   console.log(req.body);

   const { projectTitle, researchArea,  advisorsName,advisorsEmail, url, targetAudience, educationalDirectorates }= req.body;
   
   
   const decoded=await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);

   db.query('SELECT * FROM advisor WHERE email=?',[advisorsEmail],(error,resu)=>{
      if(error){
         console.log(error);
      }
      if(resu.length==0){
         return res.render('SRhomepage',{
            message:'Advisor email does not exist'
         })
      }
      else{
         db.query('INSERT INTO sriaddrequest SET ?',{projectTitle:projectTitle, researchArea:researchArea, advisorsName:advisorsName, advisorsEmail:advisorsEmail, url:url, targetAudience:targetAudience, educationalDirectorates:educationalDirectorates, SRI_ID: decoded.id},(erro,result) =>{
            if(erro){
               return res.render('SRhomepage',{
               message:'some spaces are empty'
               })
            }
            else {
               return res.render('SRhomepage',{
                  message:'Request is submitted'
                  })
            }
         })
      }
   })
} 
exports.SRIupdateinfo=async(req,res)=>{
   const decoded=await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);//create variable 
   console.log(req.body);

   const { name, email, college, deptName, mobNum, country, level, university, password}= req.body;

   db.query('SELECT * FROM users WHERE email=?',[email],async(error,result)=>{
      if(error){
         console.log(error);
      }else if(decoded.email!=email){
         if(result.length>0){
            return res.render('SRhomepage',{
               message:'The email is already in use'
            })
         }
      }
      else{
         let hashedPassword = await bcrypt.hash(password, 8);
         db.query('UPDATE users SET ? WHERE email=?',[{email:email,password:hashedPassword, mobNum:mobNum},decoded.email],async(err,resu)=>{
            if(err){
               console.log('here1')
               return res.render('SRhomepage',{
                  message:'The mobile number is already in use'
               })
            }
            else{
               db.query('UPDATE studentresearcher SET ? WHERE id=?',[{name:name, email:email, password:hashedPassword, college:college, deptName:deptName, mobNum:mobNum, country:country, level:level, university:university},decoded.id],(err,rese)=>{
                  if(error){
                  console.log(error)
                  }
                  else{//update the cookie
                     const token= jwt.sign({id:decoded.id,email:email}, process.env.JWT_SECRET,{
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
                     return res.render('SRhomepage',{
                        message:'user information updated'
                     })
                  }
               })
            }
         
         })
      }
   }) 
}
   
exports.isLoggedIn= async (req,res,next)=>{
   if(req.cookies.jwt){
      try {
         //verify token
         const decoded=await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);
         console.log(decoded);
         // check if the user exist
         db.query('SELECT * FROM studentresearcher WHERE email=?',[decoded.email],(error,SR)=>{
            db.query('SELECT * FROM organizationresearcher WHERE email=?',[decoded.email],(error,org)=>{
               db.query('SELECT * FROM advisor WHERE email=?',[decoded.email],(error,adv)=>{
                  db.query('SELECT * FROM dean WHERE email=?',[decoded.email],(error,dean)=>{
                     db.query('SELECT * FROM deputy WHERE email=?',[decoded.email],(error,deputy)=>{
                        db.query('SELECT * FROM mission WHERE email=?',[decoded.email],(error,miss)=>{
                           db.query('SELECT * FROM rd WHERE email=?',[decoded.email],(error,rd)=>{
                              db.query('SELECT * FROM cgm WHERE email=?',[decoded.email],(error,cgm)=>{
                                 db.query('SELECT * FROM ministry WHERE email=?',[decoded.email],(error,mini)=>{
                                    db.query('SELECT * FROM users WHERE email=?',[decoded.email],(error,result)=>{
                                       if(SR.length==0){                                          
                                          if(org.length==0){
                                             if(adv.length==0){
                                                if(dean.length==0){
                                                   if(deputy.length==0){
                                                      if(miss.length==0){
                                                         if(rd.length==0){
                                                            if(cgm.length==0){
                                                               if(mini.length==0){
                                                                  if(result.length==0){                                                                     
                                                                     return next();
                                                                  }
                                                                  else{                                                                     
                                                                  req.user= result[0];//sending user data                                                                  
                                                                  return next();
                                                                  }
                                                               }
                                                               else{
                                                                  req.user= mini[0];//sending user data
                                                                  return next();
                                                               }
                                                            }
                                                            else{
                                                               req.user= cgm[0];//sending user data
                                                               return next();
                                                            }
                                                         }
                                                         else{
                                                            req.user= rd[0];//sending user data
                                                            return next();
                                                         }
                                                      }
                                                      else{
                                                         req.user= miss[0];//sending user data
                                                         return next();
                                                      }
                                                   }
                                                   else{
                                                      req.user= deputy[0];//sending user data
                                                      return next();
                                                   }
                                                }
                                                else{
                                                   req.user= dean[0];//sending user data
                                                   return next();
                                                }
                                             }
                                             else{
                                                req.user= adv[0];//sending user data
                                                return next();
                                             }
                                          }
                                          else{
                                             req.user= org[0];//sending user data
                                             return next();
                                          }
                                       }
                                       else{
                                          req.user= SR[0];//sending user data
                                          return next();
                                       }
                                    });
                                 });
                              });
                           });
                        });
                     });
                  });
               });
            });
         });
      } catch (error) {
         console.log(error);
         return next();
      }
   }
   else{
      next();
   }
}
exports.logout=async(req,res)=>{
   res.cookie('jwt','logout',{
      expires: new Date(Date.now()+2*1000),
      httpOnly: true
   });
   res.status(200).redirect('/');
}
exports.Duser=async(req, res)=>{
   const email=req.body.email;
   db.query('DELETE FROM users WHERE email=?',[email],(error,result)=>{
      console.log(result);
      if(error){
         console.log(error);
      }
      else{
         return res.render('adminD',{
            message:"user deleted"
         })
      }
   })
}
exports.Uuser=(req,res)=>{
   const {email,Nemail,password}=req.body;
   db.query('SELECT * FROM users WHERE email=?',[email],async(error,result)=>{
      if(error){
         console.log(error);
      }
      if(!result){
         return res.render('adminU',{
            message: 'user does not exist'
         })
      }
      else{
         let hashedPassword = await bcrypt.hash(password, 8);
         db.query('UPDATE users SET email=? , password=? WHERE email=?',[Nemail,hashedPassword,email],(error,resu)=>{
            if(error){
               console.log(error);
            }
            else{
               return res.render('adminU',{
                  message: 'user updated'
               })
            }
         })
      }
   })
}
exports.advisorUP=async(req,res)=>{
   const {email,password,mobNum,name}=req.body;
   const decoded=await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);
   db.query('SELECT * FROM users WHERE email=?',[email],async(error,result)=>{
      if(error){
         console.log(error);
      }else if(decoded.email!=email){
         if(result.length>0){
            return res.render('advisorU',{
               message:'The email is already in use'
            })
         }
      }
      else{
         let hashedPassword = await bcrypt.hash(password, 8);
         db.query('UPDATE users SET ? WHERE email=?',[{email:email,password:hashedPassword, mobNum:mobNum},decoded.email],async(err,resu)=>{
            if(err){
               console.log('here1')
               return res.render('advisorU',{
                  message:'The mobile number is already in use'
               })
            }
            else{
               db.query('UPDATE advisor SET ? WHERE id=?',[{name:name,},decoded.id],(err,rese)=>{
                  if(error){
                  console.log(error)
                  }
                  else{//update the cookie
                     const token= jwt.sign({id:decoded.id,email:email}, process.env.JWT_SECRET,{
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
                     return res.render('advisorHP',{
                        message:'user information updated'
                     })
                  }
               })
            }
         })
      }
   })
}
exports.deanUP=async(req,res)=>{
   const {email,password,mobNum,name}=req.body;
   const decoded=await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);
   db.query('SELECT * FROM users WHERE email=?',[email],async(error,result)=>{
      if(error){
         console.log(error);
      }else if(decoded.email!=email){
         if(result.length>0){
            return res.render('deanU',{
               message:'The email is already in use'
            })
         }
      }
      else{
         let hashedPassword = await bcrypt.hash(password, 8);
         db.query('UPDATE users SET ? WHERE email=?',[{email:email,password:hashedPassword, mobNum:mobNum},decoded.email],async(err,resu)=>{
            if(err){
               console.log('here1')
               return res.render('deanU',{
                  message:'The mobile number is already in use'
               })
            }
            else{
               db.query('UPDATE dean SET ? WHERE id=?',[{name:name},decoded.id],(err,rese)=>{
                  if(error){
                  console.log(error)
                  }
                  else{//update the cookie
                     const token= jwt.sign({id:decoded.id,email:email}, process.env.JWT_SECRET,{
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
                     return res.render('deanHP',{
                        message:'user information updated'
                     })
                  }
               })
            }
         })
      }
   })
}
exports.deputyUP=async(req,res)=>{
   const {email,password,mobNum,name}=req.body;
   const decoded=await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);
   db.query('SELECT * FROM users WHERE email=?',[email],async(error,result)=>{
      if(error){
         console.log(error);
      }else if(decoded.email!=email){
         if(result.length>0){
            return res.render('deputyU',{
               message:'The email is already in use'
            })
         }
      }
      else{ 
         let hashedPassword = await bcrypt.hash(password, 8);
         db.query('UPDATE users SET ? WHERE email=?',[{email:email,password:hashedPassword, mobNum:mobNum},decoded.email],async(err,resu)=>{
            if(err){
               console.log('here1')
               return res.render('deputyU',{
                  message:'The mobile number is already in use'
               })
            }
            else{
               db.query('UPDATE deputy SET ? WHERE id=?',[{name:name},decoded.id],(err,rese)=>{
                  if(error){
                  console.log(error)
                  }
                  else{//update the cookie
                     const token= jwt.sign({id:decoded.id,email:email}, process.env.JWT_SECRET,{
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
                     return res.render('deputyHP',{
                        message:'user information updated'
                     })
                  }
               })
            }
         })
      }
   })
}
exports.ministryUP=async(req,res)=>{
   const {email,password,mobNum,name}=req.body;
   const decoded=await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);
   db.query('SELECT * FROM users WHERE email=?',[email],async(error,result)=>{
      if(error){
         console.log(error);
      }else if(decoded.email!=email){
         if(result.length>0){
            return res.render('ministryU',{
               message:'The email is already in use'
            })
         }
      }
      else{ 
         let hashedPassword = await bcrypt.hash(password, 8);
         db.query('UPDATE users SET ? WHERE email=?',[{email:email,password:hashedPassword, mobNum:mobNum},decoded.email],async(err,resu)=>{
            if(err){
               console.log('here1')
               return res.render('ministryU',{
                  message:'The mobile number is already in use'
               })
            }
            else{
               db.query('UPDATE ministry SET ? WHERE id=?',[{name:name},decoded.id],(err,rese)=>{
                  if(error){
                  console.log(error)
                  }
                  else{//update the cookie
                     const token= jwt.sign({id:decoded.id,email:email}, process.env.JWT_SECRET,{
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
                     return res.render('ministryHP',{
                        message:'user information updated'
                     })
                  }
               })
            }
         })
      }
   })
}
exports.missionUP=async(req,res)=>{
   const {email,password,mobNum,name}=req.body;
   const decoded=await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);
   db.query('SELECT * FROM users WHERE email=?',[email],async(error,result)=>{
      if(error){
         console.log(error);
      }else if(decoded.email!=email){
         if(result.length>0){
            return res.render('missionU',{
               message:'The email is already in use'
            })
         }
      }
      else{ 
         let hashedPassword = await bcrypt.hash(password, 8);
         db.query('UPDATE users SET ? WHERE email=?',[{email:email,password:hashedPassword, mobNum:mobNum},decoded.email],async(err,resu)=>{
            if(err){
               console.log('here1')
               return res.render('missionU',{
                  message:'The mobile number is already in use'
               })
            }
            else{
               db.query('UPDATE mission SET ? WHERE id=?',[{name:name},decoded.id],(err,rese)=>{
                  if(error){
                  console.log(error)
                  }
                  else{//update the cookie
                     const token= jwt.sign({id:decoded.id,email:email}, process.env.JWT_SECRET,{
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
                     return res.render('missionHP',{
                        message:'user information updated'
                     })
                  }
               })
            }
         })
      }
   })
}
exports.rdUP=async(req,res)=>{
   const {email,password,mobNum,name}=req.body;
   const decoded=await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);
   db.query('SELECT * FROM users WHERE email=?',[email],async(error,result)=>{
      if(error){
         console.log(error);
      }else if(decoded.email!=email){
         if(result.length>0){
            return res.render('rdU',{
               message:'The email is already in use'
            })
         }
      }
      else{ 
         let hashedPassword = await bcrypt.hash(password, 8);
         db.query('UPDATE users SET ? WHERE email=?',[{email:email,password:hashedPassword, mobNum:mobNum},decoded.email],async(err,resu)=>{
            if(err){
               console.log('here1')
               return res.render('rdU',{
                  message:'The mobile number is already in use'
               })
            }
            else{
               db.query('UPDATE rd SET ? WHERE id=?',[{name:name},decoded.id],(err,rese)=>{
                  if(error){
                  console.log(error)
                  }
                  else{//update the cookie
                     const token= jwt.sign({id:decoded.id,email:email}, process.env.JWT_SECRET,{
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
                     return res.render('rdHP',{
                        message:'user information updated'
                     })
                  }
               })
            }
         })
      }
   })
}
exports.cgmUP=async(req,res)=>{
   const {email,password,mobNum,name}=req.body;
   const decoded=await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);
   db.query('SELECT * FROM users WHERE email=?',[email],async(error,result)=>{
      if(error){
         console.log(error);
      }else if(decoded.email!=email){
         if(result.length>0){
            return res.render('cgmU',{
               message:'The email is already in use'
            })
         }
      }
      else{ 
         let hashedPassword = await bcrypt.hash(password, 8);
         db.query('UPDATE users SET ? WHERE email=?',[{email:email,password:hashedPassword, mobNum:mobNum},decoded.email],async(err,resu)=>{
            if(err){
               console.log('here1')
               return res.render('cgmU',{
                  message:'The mobile number is already in use'
               })
            }
            else{
               db.query('UPDATE cgm SET ? WHERE id=?',[{name:name},decoded.id],(err,rese)=>{
                  if(error){
                  console.log(error)
                  }
                  else{//update the cookie
                     const token= jwt.sign({id:decoded.id,email:email}, process.env.JWT_SECRET,{
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
                     return res.render('cgmHP',{
                        message:'user information updated'
                     })
                  }
               })
            }
         })
      }
   })
}