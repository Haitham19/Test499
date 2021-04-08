const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

// we use process.env for security => detrnv .
//we can creat file with coonection and importit whene we whant.
const db = mysql.createConnection({
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE,
});


exports.userLogin = async (req, res) => {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         return res.status(400).render('userLogin', {
            message: 'Please provide an email and password'
         })
      }
      db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
         db.query('SELECT * FROM general WHERE email = ?', [email], async (error, gen) => {
            db.query('SELECT * FROM education WHERE email = ?', [email], async (error, edu) => {
               db.query('SELECT * FROM cgm WHERE email = ?', [email], async (error, cgm) => {
                  db.query('SELECT * FROM advisor WHERE email = ?', [email], async (error, adv) => {
                     db.query('SELECT * FROM deputy WHERE email = ?', [email], async (error, depu) => {
                        db.query('SELECT * FROM dean WHERE email = ?', [email], async (error, dean) => {
                           db.query('SELECT * FROM mission WHERE email = ?', [email], async (error, mis) => {
                              db.query('SELECT * FROM rd WHERE email = ?', [email], async (error, rd) => {
                                 db.query('SELECT * FROM organizationresearcher WHERE email = ?', [email], async (error, org) => {
                                    db.query('SELECT * FROM studentresearcher WHERE email = ?', [email], async (error, sr) => {
                                       if (gen.length == 0) {
                                          if (edu.length == 0) {
                                             if (cgm.length == 0) {
                                                if (adv.length == 0) {
                                                   if (depu.length == 0) {
                                                      if (dean.length == 0) {
                                                         if (mis.length == 0) {
                                                            if (rd.length == 0) {
                                                               if (sr.length == 0) {
                                                                  if (org.length == 0) {
                                                                     if (results.length == 0) {
                                                                        res.status(401).render("userLogin", {
                                                                           message: 'Email does not exist'
                                                                        })
                                                                     }
                                                                     else if (!(await bcrypt.compare(password, results[0].password))) {
                                                                        res.status(401).render("userLogin", {
                                                                           message: 'Email or Password is incorrect'
                                                                        })
                                                                     }
                                                                     else {
                                                                        const id = results[0].userID;
                                                                        const email = results[0].email;
                                                                        const token = jwt.sign({ id: id, email: email }, process.env.JWT_SECRET, {
                                                                           expiresIn: process.env.JWT_EXPIRES_IN
                                                                        })
                                                                        console.log("the token is: " + token);
                                                                        const cookieOption = {
                                                                           expires: new Date(
                                                                              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                                                                           ),
                                                                           httpOnly: true
                                                                        }
                                                                        res.cookie('jwt', token, cookieOption);
                                                                        res.status(200).redirect("/adminHP");//
                                                                        return;
                                                                     }
                                                                  }
                                                                  else if (!(await bcrypt.compare(password, org[0].password))) {
                                                                     res.status(401).render("userLogin", {
                                                                        message: 'Email or Password is incorrect'
                                                                     })
                                                                  }
                                                                  else {
                                                                     const id = org[0].id;
                                                                     const email = org[0].email;
                                                                     const token = jwt.sign({ id: id, email: email }, process.env.JWT_SECRET, {
                                                                        expiresIn: process.env.JWT_EXPIRES_IN
                                                                     })
                                                                     console.log("the token is: " + token);
                                                                     const cookieOption = {
                                                                        expires: new Date(
                                                                           Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                                                                        ),
                                                                        httpOnly: true
                                                                     }
                                                                     res.cookie('jwt', token, cookieOption);
                                                                     res.status(200).redirect("/orgHP");
                                                                  }
                                                               }
                                                               else if (!(await bcrypt.compare(password, sr[0].password))) {
                                                                  res.status(401).render("userLogin", {
                                                                     message: 'Email or Password is incorrect'
                                                                  })
                                                               }
                                                               else {
                                                                  const id = sr[0].id;
                                                                  const email = sr[0].email;
                                                                  const token = jwt.sign({ id: id, email: email }, process.env.JWT_SECRET, {
                                                                     expiresIn: process.env.JWT_EXPIRES_IN
                                                                  })
                                                                  console.log("the token is: " + token);
                                                                  const cookieOption = {
                                                                     expires: new Date(
                                                                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                                                                     ),
                                                                     httpOnly: true
                                                                  }
                                                                  res.cookie('jwt', token, cookieOption);
                                                                  res.status(200).redirect("/SRhomepage");
                                                               }
                                                            }
                                                            else if (!(await bcrypt.compare(password, rd[0].password))) {
                                                               res.status(401).render("userLogin", {
                                                                  message: 'Email or Password is incorrect'
                                                               })
                                                            }
                                                            else {
                                                               const id = rd[0].id;
                                                               const email = rd[0].email;
                                                               const token = jwt.sign({ id: id, email: email }, process.env.JWT_SECRET, {
                                                                  expiresIn: process.env.JWT_EXPIRES_IN
                                                               })
                                                               console.log("the token is: " + token);
                                                               const cookieOption = {
                                                                  expires: new Date(
                                                                     Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                                                                  ),
                                                                  httpOnly: true
                                                               }
                                                               res.cookie('jwt', token, cookieOption);
                                                               res.status(200).redirect("/rdHP");
                                                            }
                                                         }
                                                         else if (!(await bcrypt.compare(password, mis[0].password))) {
                                                            res.status(401).render("userLogin", {
                                                               message: 'Email or Password is incorrect'
                                                            })
                                                         }
                                                         else {
                                                            const id = mis[0].id;
                                                            const email = mis[0].email;
                                                            const token = jwt.sign({ id: id, email: email }, process.env.JWT_SECRET, {
                                                               expiresIn: process.env.JWT_EXPIRES_IN
                                                            })
                                                            console.log("the token is: " + token);
                                                            const cookieOption = {
                                                               expires: new Date(
                                                                  Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                                                               ),
                                                               httpOnly: true
                                                            }
                                                            res.cookie('jwt', token, cookieOption);
                                                            res.status(200).redirect("/missionHP");//missionHP
                                                         }
                                                      }
                                                      else if (!(await bcrypt.compare(password, dean[0].password))) {
                                                         res.status(401).render("userLogin", {
                                                            message: 'Email or Password is incorrect'
                                                         })
                                                      }
                                                      else {
                                                         const id = dean[0].id;
                                                         const email = dean[0].email;
                                                         const token = jwt.sign({ id: id, email: email }, process.env.JWT_SECRET, {
                                                            expiresIn: process.env.JWT_EXPIRES_IN
                                                         })
                                                         console.log("the token is: " + token);
                                                         const cookieOption = {
                                                            expires: new Date(
                                                               Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                                                            ),
                                                            httpOnly: true
                                                         }
                                                         res.cookie('jwt', token, cookieOption);
                                                         res.status(200).redirect("/deanHP");
                                                      }
                                                   }
                                                   else if (!(await bcrypt.compare(password, depu[0].password))) {
                                                      res.status(401).render("userLogin", {
                                                         message: 'Email or Password is incorrect'
                                                      })
                                                   }
                                                   else {
                                                      const id = depu[0].id;
                                                      const email = depu[0].email;
                                                      const token = jwt.sign({ id: id, email: email }, process.env.JWT_SECRET, {
                                                         expiresIn: process.env.JWT_EXPIRES_IN
                                                      })
                                                      console.log("the token is: " + token);
                                                      const cookieOption = {
                                                         expires: new Date(
                                                            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                                                         ),
                                                         httpOnly: true
                                                      }
                                                      res.cookie('jwt', token, cookieOption);
                                                      res.status(200).redirect("/deputyHP");
                                                   }
                                                }
                                                else if (!(await bcrypt.compare(password, adv[0].password))) {
                                                   res.status(401).render("userLogin", {
                                                      message: 'Email or Password is incorrect'
                                                   })
                                                }
                                                else {
                                                   const id = adv[0].id;
                                                   const email = adv[0].email;
                                                   const token = jwt.sign({ id: id, email: email }, process.env.JWT_SECRET, {
                                                      expiresIn: process.env.JWT_EXPIRES_IN
                                                   })
                                                   console.log("the token is: " + token);
                                                   const cookieOption = {
                                                      expires: new Date(
                                                         Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                                                      ),
                                                      httpOnly: true
                                                   }
                                                   res.cookie('jwt', token, cookieOption);
                                                   res.status(200).redirect("/advisorHP");
                                                }
                                             }
                                             else if (!(await bcrypt.compare(password, cgm[0].password))) {
                                                res.status(401).render("userLogin", {
                                                   message: 'Email or Password is incorrect'
                                                })
                                             }
                                             else {
                                                const id = cgm[0].id;
                                                const email = cgm[0].email;
                                                const token = jwt.sign({ id: id, email: email }, process.env.JWT_SECRET, {
                                                   expiresIn: process.env.JWT_EXPIRES_IN
                                                })
                                                console.log("the token is: " + token);
                                                const cookieOption = {
                                                   expires: new Date(
                                                      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                                                   ),
                                                   httpOnly: true
                                                }
                                                res.cookie('jwt', token, cookieOption);
                                                res.status(200).redirect("/cgmHP");
                                             }
                                          }
                                          else if (!(await bcrypt.compare(password, edu[0].password))) {
                                             res.status(401).render("userLogin", {
                                                message: 'Email or Password is incorrect'
                                             })
                                          }
                                          else {
                                             const id = edu[0].id;
                                             const email = edu[0].email;
                                             const token = jwt.sign({ id: id, email: email }, process.env.JWT_SECRET, {
                                                expiresIn: process.env.JWT_EXPIRES_IN
                                             })
                                             console.log("the token is: " + token);
                                             const cookieOption = {
                                                expires: new Date(
                                                   Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                                                ),
                                                httpOnly: true
                                             }
                                             res.cookie('jwt', token, cookieOption);
                                             res.status(200).redirect("/eduHP");
                                          }
                                       }
                                       else if (!(await bcrypt.compare(password, gen[0].password))) {
                                          res.status(401).render("userLogin", {
                                             message: 'Email or Password is incorrect'
                                          })
                                       }
                                       else {
                                          const id = gen[0].id;
                                          const email = gen[0].email;
                                          const token = jwt.sign({ id: id, email: email }, process.env.JWT_SECRET, {
                                             expiresIn: process.env.JWT_EXPIRES_IN
                                          })
                                          console.log("the token is: " + token);
                                          const cookieOption = {
                                             expires: new Date(
                                                Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                                             ),
                                             httpOnly: true
                                          }
                                          res.cookie('jwt', token, cookieOption);
                                          res.status(200).redirect("/genHP");
                                       }

                                    })
                                 })
                              })
                           })
                        })
                     })
                  })
               })
            })
         })
      })
   }
   catch (error) {
      console.log(error);
   }
}
/*
         */

//this section is for Sign up 
exports.researcherSignup = (req, res) => {
   const { name, email, college, deptName, mobNum, country, level, university, password, passwordConfirm } = req.body;

   db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
      if (error) {
         console.log(error)
      }

      if (results.length > 0) {
         return res.render('researcherSignup', {
            message: 'The email is already in use'
         })
      }
      else if (password !== passwordConfirm) {
         return res.render('researcherSignup', {
            message: 'password do not match'
         })
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      db.query('INSERT INTO users SET ?', { email: email, mobNum: mobNum, password: hashedPassword }, (erro, result) => {
         if (erro) {
            return res.render('researcherSignup', {
               message: 'The mobile number is already in use'
            })
         }
         db.query('SELECT * FROM users WHERE email=?', [email], (error, resul) => {
            db.query('INSERT INTO studentresearcher SET ?', { userID: resul[0].userID, name: name, email: email, password: hashedPassword, college: college, deptName: deptName, mobNum: mobNum, country: country, level: level, university: university }, (error, results) => {
               if (error) {
                  console.log(error);
               }
               else {
                  return res.render('researcherSignup', {
                     message: 'Student Researcher Registered'
                  });
               }
            })

         })
      })
   })
}
exports.OrgResSignup = (req, res) => {
   console.log(req.body);

   const { name, email, mobNum, organization, password, passwordConfirm } = req.body;

   db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
      if (error) {
         console.log(error)
      }

      if (results.length > 0) {
         return res.render('researcherSignup', {
            message: 'The email is already in use'
         })
      }
      else if (password !== passwordConfirm) {
         return res.render('researcherSignup', {
            message: 'password do not match'
         })
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      db.query('INSERT INTO users SET ?', { email: email, mobNum: mobNum, password: hashedPassword }, (erro, result) => {
         if (erro) {
            return res.render('researcherSignup', {
               message: 'The mobile number is already in use'
            })
         }
         db.query('SELECT * FROM users WHERE email=?', [email], (error, resul) => {
            db.query('INSERT INTO organizationresearcher SET ?', { userID: resul[0].userID, name: name, email: email, password: hashedPassword, mobNum: mobNum, organization: organization }, (error, results) => {
               if (error) {
                  console.log(error);
               }
               else {
                  return res.render('researcherSignup', {
                     message: 'Organization Researcher Registered'
                  });
               }
            })
         })
      })
   })
}
exports.researcherOutSideSignup = (req, res) => {
   const { name, email, college, deptName, mobNum, country, level, university, password, passwordConfirm } = req.body;

   db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
      if (error) {
         console.log(error)
      }

      if (results.length > 0) {
         return res.render('researcherSignup', {
            message: 'The email is already in use'
         })
      }
      else if (password !== passwordConfirm) {
         return res.render('researcherSignup', {
            message: 'password do not match'
         })
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      db.query('INSERT INTO users SET ?', { email: email, mobNum: mobNum, password: hashedPassword }, (erro, result) => {
         if (erro) {
            return res.render('researcherSignup', {
               message: 'The mobile number is already in use'
            })
         }
         db.query('SELECT * FROM users WHERE email=?', [email], (error, resul) => {
            db.query('INSERT INTO studentresearcher SET ?', { advisorEmail: adv, userID: resul[0].userID, name: name, email: email, password: hashedPassword, college: college, debtName: deptName, mobNum: mobNum, country: country, level: level, university: university }, (error, results) => {
               if (error) {
                  console.log(error);
               }
               else {
                  return res.render('researcherLogin', {
                     message: 'Student Researcher Registered'
                  });
               }
            })

         })
      })
   })
}
exports.advisorSignup = (req, res) => {
   const { name, email, password, mobNum, passwordConfirm, de } = req.body;

   db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
      if (error) {
         console.log(error)
      }

      if (results.length > 0) {
         return res.render('adminHP', {
            message: 'The email is already in use'
         })
      }
      else if (password !== passwordConfirm) {
         return res.render('adminHP', {
            message: 'password do not match'
         })
      }
      let hashedPassword = await bcrypt.hash(password, 8);
      db.query('SELECT * FROM dean WHERE email=?', [de], (error, resu) => {

         if (error) {
            console.log(error);
         }
         if (resu.length == 0) {
            return res.render('adminHP', {
               message: 'College Dean email does not exist'
            })
         }
         else {
            db.query('INSERT INTO users SET ?', { email: email, mobNum: mobNum, password: hashedPassword }, (erro, result) => {
               if (erro) {
                  return res.render('adminHP', {
                     message: 'The mobile number is already in use'
                  })
               }
               db.query('SELECT * FROM users WHERE email=?', [email], (error, resul) => {
                  db.query('INSERT INTO advisor SET ?', { deanEmail: de, userID: resul[0].userID, name: name, email: email, password: hashedPassword, mobNum: mobNum, }, (error, results) => {
                     if (error) {
                        console.log(error);
                     }
                     else {
                        return res.render('adminHP', {
                           message: 'Advisor Registered'
                        });
                     }
                  })
               })
            })
         }
      })
   })
}
exports.deanSignup = (req, res) => {
   const { name, email, password, mobNum, passwordConfirm, de } = req.body;

   db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
      if (error) {
         console.log(error)
      }

      if (results.length > 0) {
         return res.render('adminHP', {
            message: 'The email is already in use'
         })
      }
      else if (password !== passwordConfirm) {
         return res.render('adminHP', {
            message: 'password do not match'
         })
      }
      let hashedPassword = await bcrypt.hash(password, 8);
      db.query('SELECT * FROM deputy WHERE email=?', [de], (error, resu) => {

         if (error) {
            console.log(error);
         }
         if (resu.length == 0) {
            return res.render('adminHP', {
               message: 'Deputy email does not exist'
            })
         }
         else {
            db.query('INSERT INTO users SET ?', { email: email, mobNum: mobNum, password: hashedPassword }, (erro, result) => {
               if (erro) {
                  return res.render('adminHP', {
                     message: 'The mobile number is already in use'
                  })
               }
               db.query('SELECT * FROM users WHERE email=?', [email], (error, resul) => {
                  db.query('INSERT INTO dean SET ?', { deputyEmail: de, userID: resul[0].userID, name: name, email: email, password: hashedPassword, mobNum: mobNum, }, (error, results) => {
                     if (error) {
                        console.log(error);
                     }
                     else {
                        return res.render('adminHP', {
                           message: 'College Dean Registered'
                        });
                     }
                  })
               })
            })
         }
      })

   })
}
exports.deputySignup = (req, res) => {
   const { name, email, password, mobNum, passwordConfirm } = req.body;

   db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
      if (error) {
         console.log(error)
      }

      if (results.length > 0) {
         return res.render('adminHP', {
            message: 'The email is already in use'
         })
      }
      else if (password !== passwordConfirm) {
         return res.render('adminHP', {
            message: 'password do not match'
         })
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      db.query('INSERT INTO users SET ?', { email: email, mobNum: mobNum, password: hashedPassword }, (erro, result) => {
         if (erro) {
            return res.render('adminHP', {
               message: 'The mobile number is already in use'
            })
         }
         db.query('SELECT * FROM users WHERE email=?', [email], (error, resul) => {
            db.query('INSERT INTO deputy SET ?', { userID: resul[0].userID, name: name, email: email, password: hashedPassword, mobNum: mobNum, }, (error, results) => {
               if (error) {
                  console.log(error);
               }
               else {
                  return res.render('adminHP', {
                     message: 'Deputyship user Registered'
                  });
               }
            })
         })
      })
   })
}
exports.missionSignup = (req, res) => {
   const { name, email, password, mobNum, passwordConfirm } = req.body;

   db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
      if (error) {
         console.log(error)
      }

      if (results.length > 0) {
         return res.render('adminHP', {
            message: 'The email is already in use'
         })
      }
      else if (password !== passwordConfirm) {
         return res.render('adminHP', {
            message: 'password do not match'
         })
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      db.query('INSERT INTO users SET ?', { email: email, mobNum: mobNum, password: hashedPassword }, (erro, result) => {
         if (erro) {
            return res.render('adminHP', {
               message: 'The mobile number is already in use'
            })
         }
         db.query('SELECT * FROM users WHERE email=?', [email], (error, resul) => {
            db.query('INSERT INTO mission SET ?', { userID: resul[0].userID, name: name, email: email, password: hashedPassword, mobNum: mobNum, }, (error, results) => {
               if (error) {
                  console.log(error);
               }
               else {
                  return res.render('adminHP', {
                     message: 'Cultural Mission user Registered'
                  });
               }
            })
         })
      })
   })
}
exports.CGMSignup = (req, res) => {
   const { name, email, password, mobNum, passwordConfirm } = req.body;

   db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
      if (error) {
         console.log(error)
      }

      if (results.length > 0) {
         return res.render('adminHP', {
            message: 'The email is already in use'
         })
      }
      else if (password !== passwordConfirm) {
         return res.render('adminHP', {
            message: 'password do not match'
         })
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      db.query('INSERT INTO users SET ?', { email: email, mobNum: mobNum, password: hashedPassword }, (erro, result) => {
         if (erro) {
            return res.render('adminHP', {
               message: 'The mobile number is already in use'
            })
         }
         db.query('SELECT * FROM users WHERE email=?', [email], (error, resul) => {
            db.query('INSERT INTO cgm SET ?', { userID: resul[0].userID, name: name, email: email, mobNum: mobNum, password: hashedPassword, }, (error, results) => {
               if (error) {
                  console.log(error);
               }
               else {
                  return res.render('adminHP', {
                     message: 'Center General Manager Registered'
                  });
               }
            })
         })
      })
   })
}
exports.generalSignup = (req, res) => {
   const { name, email, password, mobNum, passwordConfirm } = req.body;
   db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
      if (error) {
         console.log(error)
      }
      if (results.length > 0) {
         return res.render('adminHP', {
            message: 'The email is already in use'
         })
      }
      else if (password !== passwordConfirm) {
         return res.render('adminHP', {
            message: 'password do not match'
         })
      }
      let hashedPassword = await bcrypt.hash(password, 8);
      db.query('INSERT INTO users SET ?', { email: email, mobNum: mobNum, password: hashedPassword }, (erro, result) => {
         if (erro) {
            return res.render('adminHP', {
               message: 'The mobile number is already in use'
            })
         }
         db.query('SELECT * FROM users WHERE email=?', [email], (error, resul) => {
            db.query('INSERT INTO general SET ?', { userID: resul[0].userID, name: name, email: email, mobNum: mobNum, password: hashedPassword }, (error, results) => {
               if (error) {
                  console.log(error);
               }
               else {
                  return res.render('adminHP', {
                     message: 'General department Registered'
                  });
               }
            })
         })
      })
   })
}
exports.educSignup = (req, res) => {
   const { name, email, password, mobNum, passwordConfirm } = req.body;
   db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
      if (error) {
         console.log(error)
      }
      if (results.length > 0) {
         return res.render('adminHP', {
            message: 'The email is already in use'
         })
      }
      else if (password !== passwordConfirm) {
         return res.render('adminHP', {
            message: 'password do not match'
         })
      }
      let hashedPassword = await bcrypt.hash(password, 8);
      db.query('INSERT INTO users SET ?', { email: email, mobNum: mobNum, password: hashedPassword }, (erro, result) => {
         if (erro) {
            return res.render('adminHP', {
               message: 'The mobile number is already in use'
            })
         }
         db.query('SELECT * FROM users WHERE email=?', [email], (error, resul) => {
            db.query('INSERT INTO education SET ?', { userID: resul[0].userID, name: name, email: email, mobNum: mobNum, password: hashedPassword }, (error, results) => {
               if (error) {
                  console.log(error);
               }
               else {
                  return res.render('adminHP', {
                     message: 'Education directorates user Registered'
                  });
               }
            })
         })
      })
   })
}
exports.RDSignup = (req, res) => {
   const { name, email, password, mobNum, passwordConfirm } = req.body;

   db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
      if (error) {
         console.log(error)
      }

      if (results.length > 0) {
         return res.render('adminHP', {
            message: 'The email is already in use'
         })
      }
      else if (password !== passwordConfirm) {
         return res.render('adminHP', {
            message: 'password do not match'
         })
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      db.query('INSERT INTO users SET ?', { email: email, mobNum: mobNum, password: hashedPassword }, (erro, result) => {
         if (erro) {
            return res.render('adminHP', {
               message: 'The mobile number is already in use'
            })
         }
         db.query('SELECT * FROM users WHERE email=?', [email], (error, resul) => {
            db.query('INSERT INTO rd SET ?', { userID: resul[0].userID, name: name, email: email, mobNum: mobNum, password: hashedPassword, }, (error, results) => {
               if (error) {
                  console.log(error);
               }
               else {
                  return res.render('adminHP', {
                     message: 'Research and Development Department User Registered'
                  });
               }
            })
         })
      })
   })
}


// add request 
exports.SRaddnewrequest = async (req, res) => {
   const { projectTitle, researchArea, advisorsEmail, url, targetAudience, edu, gen } = req.body;
   console.log(req.body.gen);
   console.log(req.body.edu);
   if (researchArea == "base") {
      return res.render('SRhomepage', {
         message: 'research area is not selected'
      })
   }

   const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
   db.query('SELECT * FROM advisor WHERE email=?', [advisorsEmail], (error, resu) => {
      if (error) {
         console.log(error);
      }
      if (resu.length == 0) {
         return res.render('SRhomepage', {
            message: 'Advisor email does not exist'
         })
      }
      else {
         db.query('SELECT * FROM studentresearcher WHERE email=?', [decoded.email], (erro, results) => {
            db.query('INSERT INTO sr_request SET ?', { from: decoded.email, SRname: results[0].name, projectTitle: projectTitle, area: researchArea, next: advisorsEmail, url: url, target: targetAudience, SRI_ID: decoded.id, status: 0 }, (erro, result) => {
               db.query('SELECT * FROM sr_request WHERE SRI_ID=?', [decoded.id], (erro, sr) => {
                  for (var i = 0; i < edu.length; i++) {
                     db.query("INSERT INTO req_e SET ?", [{ reqID: sr[0].reqID, email: edu[i] }], (er, re) => {
                        if (er) {
                           console.log(er);
                        }
                     })
                  }
                  for (var j = 0; j < gen.length; j++) {
                     db.query("INSERT INTO req_g SET ?", [{ reqID: sr[0].reqID, email: gen[j] }], (er, re) => {
                        if (er) {
                           console.log(er);
                        }
                     })
                  }
                  if (erro) {
                     console.log(erro)
                     return res.render('SRhomepage', {
                        message: 'something went wrong'
                     })
                  }
                  else {
                     return res.render('SRhomepage', {
                        message: 'Request is submitted'
                     })
                  }
               })
            })
         })
      }
   })
}
exports.orgANR = async (req, res) => {
   const { projectTitle, researchArea, url, targetAudience, educationalDirectorates, } = req.body;
   const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
   db.query("INSERT INTO orgRequest SET ?", { projectTitle: projectTitle, researchArea: researchArea, url: url, targetAudience: targetAudience, educationalDirectorates: educationalDirectorates, orgID: decoded.id, status: 0, },
      (erro, result) => {
         if (erro) {
            return res.render("orgHP", {
               message: "something went wrong",
            });
         } else {
            return res.render("orgHP", {
               message: "Request is submitted",
            });
         }
      }
   );
}


//Rating
exports.SRrating = async (req, res) => {
   const { ratingN, ratingT } = req.body;
   if (ratingN == "base") {
      return res.render('SRhomepage', {
         message: 'Rating Option  is not selected'
      })
   }

   const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
   db.query('SELECT * FROM studentresearcher WHERE email=?', [decoded.email], (erro, results) => {
      db.query('INSERT INTO sr_rating SET ?', { email: decoded.email, ratingNumber: ratingN, ratingText: ratingT, SRI_ID: decoded.id }, (erro, result) => {
         if (erro) {
            console.log(er);
         }
         else {
            return res.render('SRhomepage', {
               message: 'Rating is submitted'
            })
         }
      })
   })

}


//for request
exports.advRequsets = async (req, res, next) => {
   if (req.cookies.jwt) {
      try {
         const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
         db.query("SELECT * FROM advisor WHERE email=?", [decoded.email], (error, result) => {
            if (result.length == 0) {
               return next();
            }
            else {
               db.query("SELECT * FROM sr_request WHERE status=0 AND next=?", [decoded.email], (err, resul) => {
                  if (err) {
                     console.log(err);
                  } else if (resul.length == 0) {
                     req.user = result[0];
                     return next();
                  }
                  else {
                     req.request = resul;
                     return next();
                  }
               })
            }
         })
      } catch (error) {
         console.log(error);
         return next();
      }
   }
   else {
      next();
   }
}
exports.SRIRequsets = async (req, res, next) => {
   if (req.cookies.jwt) {
      try {
         const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
         db.query("SELECT * FROM studentresearcher WHERE email=?", [decoded.email], (error, result) => {
            if (result.length == 0) {
               return next();
            }
            else {
               db.query("SELECT * FROM sr_request WHERE SRI_ID=? AND status=-1", [decoded.id], (err, resul) => {
                  if (err) {
                     console.log(err);
                  } else if (resul.length == 0) {
                     db.query("SELECT * FROM sr_request WHERE SRI_ID=? AND status>=0", [decoded.id], (err, resu) => {
                        if (err) {
                           console.log(err);
                        } else if (resu.length == 0) {
                           req.user = result[0];
                           return next();
                        }
                        else {
                           req.reqW = resu;
                           return next();
                        }
                     })
                  }
                  else {
                     req.reqJ = resul;
                     return next();
                  }
               })
            }
         })
      } catch (error) {
         console.log(error);
         return next();
      }
   }
   else {
      next();
   }
}
exports.deanRequsets = async (req, res, next) => {
   if (req.cookies.jwt) {
      try {
         const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
         db.query("SELECT * FROM dean WHERE email=?", [decoded.email], (error, result) => {
            if (result.length == 0) {
               return next();
            }
            else {
               db.query("SELECT * FROM sr_request WHERE status=1 AND next=?", [decoded.email], (err, resul) => {
                  if (err) {
                     console.log(err);
                  } else if (resul.length == 0) {
                     req.user = result[0];
                     return next();
                  }
                  else {
                     req.request = resul;
                     return next();
                  }
               })
            }
         })
      } catch (error) {
         console.log(error);
         return next();
      }
   }
   else {
      next();
   }
}
exports.deputyRequsets = async (req, res, next) => {
   if (req.cookies.jwt) {
      try {
         const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
         db.query("SELECT * FROM deputy WHERE email=?", [decoded.email], (error, result) => {
            if (result.length == 0) {
               return next();
            }
            else {
               db.query("SELECT * FROM sr_request WHERE status=2 AND next=?", [decoded.email], (err, resul) => {
                  if (err) {
                     console.log(err);
                  } else if (resul.length == 0) {
                     req.user = result[0];
                     return next();
                  }
                  else {
                     req.request = resul;
                     return next();
                  }
               })
            }
         })
      } catch (error) {
         console.log(error);
         return next();
      }
   }
   else {
      next();
   }
}
exports.cgmRequsets = async (req, res, next) => {
   if (req.cookies.jwt) {
      try {
         const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
         db.query("SELECT * FROM cgm WHERE email=?", [decoded.email], (error, result) => {
            if (result.length == 0) {
               return next();
            }
            else {
               db.query("SELECT * FROM sr_request WHERE status=3 AND next=?", [decoded.email], (err, resul) => {
                  if (err) {
                     console.log(err);
                  } else if (resul.length == 0) {
                     req.user = result[0];
                     return next();
                  }
                  else {
                     req.request = resul;
                     return next();
                  }
               })
            }
         })
      } catch (error) {
         console.log(error);
         return next();
      }
   }
   else {
      next();
   }
}
exports.eduRequsets = async (req, res, next) => {
   if (req.cookies.jwt) {
      try {
         const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
         db.query("SELECT * FROM education WHERE email=?", [decoded.email], (error, result) => {
            if (result.length == 0) {
               return next();
            }
            else {
               db.query("SELECT * FROM req_e WHERE email=?", [decoded.email], (err, resul) => {
                  db.query("SELECT * FROM sr_request WHERE reqID=? AND status>3", [resul[0].reqID], (er, re) => {
                     if (er) {
                        console.log(er);
                     } else if (resul.length == 0) {
                        req.user = result[0];
                        return next();
                     }
                     else {
                        if (re.length == 0) {
                           req.user = result[0];
                           return next();
                        }
                        else {
                           req.request = re;
                           return next();
                        }
                     }
                  })
               })
            }
         })
      } catch (error) {
         console.log(error);
         return next();
      }
   }
   else {
      next();
   }
}
exports.genRequsets = async (req, res, next) => {
   if (req.cookies.jwt) {
      try {
         const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
         db.query("SELECT * FROM general WHERE email=?", [decoded.email], (error, result) => {
            if (result.length == 0) {
               return next();
            }
            else {
               db.query("SELECT * FROM req_g WHERE email=?", [decoded.email], (err, resul) => {
                  db.query("SELECT * FROM sr_request WHERE reqID=? AND status>3", [resul[0].reqID], (er, re) => {
                     if (er) {
                        console.log(er);
                     } else if (resul.length == 0) {
                        req.user = result[0];
                        return next();
                     }
                     else {
                        if (re.length == 0) {
                           req.user = result[0];
                           return next();
                        }
                        else {
                           req.request = re;
                           return next();
                        }
                     }
                  })
               })
            }
         })
      } catch (error) {
         console.log(error);
         return next();
      }
   }
   else {
      next();
   }
}

//to here
exports.isLoggedIn = async (req, res, next) => {
   if (req.cookies.jwt) {
      try {
         //verify token
         const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
         console.log(decoded);
         // check if the user exist
         db.query('SELECT * FROM studentresearcher WHERE email=?', [decoded.email], (error, SR) => {
            db.query('SELECT * FROM organizationresearcher WHERE email=?', [decoded.email], (error, org) => {
               db.query('SELECT * FROM advisor WHERE email=?', [decoded.email], (error, adv) => {
                  db.query('SELECT * FROM dean WHERE email=?', [decoded.email], (error, dean) => {
                     db.query('SELECT * FROM deputy WHERE email=?', [decoded.email], (error, deputy) => {
                        db.query('SELECT * FROM mission WHERE email=?', [decoded.email], (error, miss) => {
                           db.query('SELECT * FROM rd WHERE email=?', [decoded.email], (error, rd) => {
                              db.query('SELECT * FROM cgm WHERE email=?', [decoded.email], (error, cgm) => {
                                 db.query('SELECT * FROM general WHERE email=?', [decoded.email], (error, gen) => {
                                    db.query('SELECT * FROM education WHERE email=?', [decoded.email], (error, edu) => {
                                       db.query('SELECT * FROM users WHERE email=?', [decoded.email], (error, result) => {
                                          if (SR.length == 0) {
                                             if (org.length == 0) {
                                                if (adv.length == 0) {
                                                   if (dean.length == 0) {
                                                      if (deputy.length == 0) {
                                                         if (miss.length == 0) {
                                                            if (rd.length == 0) {
                                                               if (cgm.length == 0) {
                                                                  if (gen.length == 0) {
                                                                     if (edu.length == 0) {
                                                                        if (result.length == 0) {
                                                                           return next();
                                                                        }
                                                                        else {
                                                                           req.user = result[0];//sending user data                                                                  
                                                                           return next();
                                                                        }
                                                                     }
                                                                     else {
                                                                        req.user = edu[0];//sending user data                                                                  
                                                                        return next();
                                                                     }
                                                                  }
                                                                  else {
                                                                     req.user = gen[0];//sending user data                                                                  
                                                                     return next();
                                                                  }
                                                               }
                                                               else {
                                                                  req.user = cgm[0];//sending user data
                                                                  return next();
                                                               }
                                                            }
                                                            else {
                                                               req.user = rd[0];//sending user data
                                                               return next();
                                                            }
                                                         }
                                                         else {
                                                            req.user = miss[0];//sending user data
                                                            return next();
                                                         }
                                                      }
                                                      else {
                                                         req.user = deputy[0];//sending user data
                                                         return next();
                                                      }
                                                   }
                                                   else {
                                                      req.user = dean[0];//sending user data
                                                      return next();
                                                   }
                                                }
                                                else {
                                                   req.user = adv[0];//sending user data
                                                   return next();
                                                }
                                             }
                                             else {
                                                req.user = org[0];//sending user data
                                                return next();
                                             }
                                          }
                                          else {
                                             req.user = SR[0];//sending user data
                                             return next();
                                          }
                                       });
                                    })
                                 })
                              })
                           })
                        })
                     })
                  })
               })
            })
         })
      } catch (error) {
         console.log(error);
         return next();
      }
   }
   else {
      next();
   }
}
exports.logout = async (req, res) => {
   res.cookie('jwt', 'logout', {
      expires: new Date(Date.now() + 2 * 1000),
      httpOnly: true
   });
   res.status(200).redirect('/');
}
//approve request from here
exports.advApp = async (req, res) => {
   const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
   db.query("SELECT * FROM advisor WHERE email=?", [decoded.email], (err, resul) => {
      db.query("SELECT * FROM sr_request WHERE next=?", [decoded.email], (erro, resu) => {
         db.query("UPDATE sr_request SET ? WHERE next=? AND reqID=?", [{ status: 1, next: resul[0].deanEmail, from: decoded.email }, decoded.email, resu[0].reqID], (error, result) => {
            if (error) {
               return res.render("advisorHP", {
                  message: "something went wrong"
               })
            }
            else {
               return res.render("advisorHP", {
                  message: "request approved"
               })
            }
         })
      })
   })
}
exports.deanApp = async (req, res) => {
   const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
   db.query("SELECT * FROM dean WHERE email=?", [decoded.email], (err, resul) => {
      db.query("SELECT * FROM sr_request WHERE next=?", [decoded.email], (erro, resu) => {
         db.query("UPDATE sr_request SET ? WHERE next=? AND reqID=?", [{ status: 2, next: resul[0].deputyEmail, from: decoded.email }, decoded.email, resu[0].reqID], (error, result) => {
            if (error) {
               return res.render("deanHP", {
                  message: "something went wrong"
               })
            }
            else {
               return res.render("deanHP", {
                  message: "request approved"
               })
            }
         })
      })
   })
}
exports.deputyApp = async (req, res) => {
   const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
   db.query("SELECT * FROM cgm ", (err, resul) => {
      db.query("SELECT * FROM sr_request WHERE next=?", [decoded.email], (erro, resu) => {
         db.query("UPDATE sr_request SET ? WHERE next=? AND reqID=?", [{ status: 3, next: resul[0].email, from: decoded.email }, decoded.email, resu[0].reqID], (error, result) => {
            if (error) {
               return res.render("deputyHP", {
                  message: "something went wrong"
               })
            }
            else {
               return res.render("deputyHP", {
                  message: "request approved"
               })
            }
         })
      })
   })
}
exports.cgmApp = async (req, res) => {
   const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
   db.query("SELECT * FROM sr_request WHERE next=?", [decoded.email], (erro, resu) => {
      db.query("UPDATE sr_request SET ? WHERE next=? AND reqID=?", [{ status: 4, from: decoded.email }, decoded.email, resu[0].reqID], (error, result) => {
         if (error) {
            return res.render("cgmHP", {
               message: "something went wrong"
            })
         }
         else {
            return res.render("cgmHP", {
               message: "request approved"
            })
         }
      })
   })
}

exports.Edone = async (req, res) => {
   const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
   db.query("SELECT * FROM req_e WHERE email=?", [decoded.email], (erro, resu) => {
      db.query("SELECT * FROM sr_request WHERE status>3 AND reqID=?", [resu[0].reqID], (error, result) => {
         db.query("UPDATE sr_request SET ? WHERE reqID=?", [{ status: 5, reason: result[0].reason + "---Done in :" + decoded.email }, result[0].reqID], (er, re) => {
            if (er) {
               return res.render("eduHP", {
                  message: "something went wrong"
               })
            }
            else {
               db.query("SELECT * FROM req_e WHERE email=?", [decoded.email], (err, resul) => {
                  if (resul.length == 0) {
                     db.query("SELECT * FROM req_g", (erorrr, resuuuu) => {
                        if (resuuuu.length == 0) {
                           db.query("UPDATE sr_request SET ? WHERE reqID=?", [{ status: 10, reason: "Completed" }, result[0].reqID], (er, re) => {
                              if (er) {
                                 return res.render("eduHP", {
                                    message: "something went wrong"
                                 })
                              }
                           })
                        }
                     })
                  }
               })
               return res.render("eduHP", {
                  message: "Request Done"
               })
            }
         })
      })
   })
}
//to here
//these two for admine Delete and Update
exports.Duser = async (req, res) => {
   const email = req.body.email;
   db.query('DELETE FROM users WHERE email=?', [email], (error, result) => {
      console.log(result);
      if (error) {
         console.log(error);
      }
      else {
         return res.render('adminD', {
            message: "user deleted"
         })
      }
   })
}
exports.Uuser = (req, res) => {
   const { email, Nemail, password } = req.body;
   db.query('SELECT * FROM users WHERE email=?', [email], async (error, result) => {
      if (error) {
         console.log(error);
      }
      if (!result) {
         return res.render('adminU', {
            message: 'user does not exist'
         })
      }
      else {
         let hashedPassword = await bcrypt.hash(password, 8);
         db.query('UPDATE users SET email=? , password=? WHERE email=?', [Nemail, hashedPassword, email], (error, resu) => {
            if (error) {
               console.log(error);
            }
            else {
               return res.render('adminU', {
                  message: 'user updated'
               })
            }
         })
      }
   })
}
//reject request
exports.advRej = async (req, res) => {
   const reason = req.body.reason;
   console.log(reason);
   const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
   db.query("SELECT * FROM sr_request WHERE next=?", [decoded.email], (erro, resu) => {
      db.query("UPDATE sr_request SET ? WHERE next=? AND reqID=?", [{ status: -1, reason: reason }, decoded.email, resu[0].reqID], (error, result) => {
         if (error) {
            console.log(error);
            return res.render("advisorHP", {
               message: "something went wrong"
            })
         }
         else {
            return res.render("advisorHP", {
               message: "request rejected"
            })
         }
      })
   })
}
exports.deanRej = async (req, res) => {
   const reason = req.body.reason;
   console.log(reason);
   const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
   db.query("SELECT * FROM sr_request WHERE next=?", [decoded.email], (erro, resu) => {
      db.query("UPDATE sr_request SET ? WHERE next=? AND reqID=?", [{ status: -1, reason: reason }, decoded.email, resu[0].reqID], (error, result) => {
         if (error) {
            console.log(error);
            return res.render("deanHP", {
               message: "something went wrong"
            })
         }
         else {
            return res.render("deanHP", {
               message: "request rejected"
            })
         }
      })
   })
}
exports.deputyRej = async (req, res) => {
   const reason = req.body.reason;
   console.log(reason);
   const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
   db.query("SELECT * FROM sr_request WHERE next=?", [decoded.email], (erro, resu) => {
      db.query("UPDATE sr_request SET ? WHERE next=? AND reqID=?", [{ status: -1, reason: reason }, decoded.email, resu[0].reqID], (error, result) => {
         if (error) {
            console.log(error);
            return res.render("deputyHP", {
               message: "something went wrong"
            })
         }
         else {
            return res.render("deputyHP", {
               message: "request rejected"
            })
         }
      })
   })
}
exports.cgmRej = async (req, res) => {
   const reason = req.body.reason;
   console.log(reason);
   const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
   db.query("SELECT * FROM sr_request WHERE next=?", [decoded.email], (erro, resu) => {
      db.query("UPDATE sr_request SET ? WHERE next=? AND reqID=?", [{ status: -1, reason: reason }, decoded.email, resu[0].reqID], (error, result) => {
         if (error) {
            console.log(error);
            return res.render("cgmHP", {
               message: "something went wrong"
            })
         }
         else {
            return res.render("cgmHP", {
               message: "request rejected"
            })
         }
      })
   })
}

//update info from here
exports.SRIupdateinfo = async (req, res) => {
   const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
   const { name, email, college, deptName, mobNum, country, level, university, password } = req.body;
   let hashedPassword = await bcrypt.hash(password, 8);
   db.query('UPDATE users SET ? WHERE email=?', [{ email: email, password: hashedPassword, mobNum: mobNum }, decoded.email], async (erro, resu) => {
      if (erro) {
         return res.render('SRhomepage', {
            message: 'The mobile number is already in use or mobile number is used'
         })
      }
      else {
         db.query('UPDATE studentresearcher SET ? WHERE id=?', [{ name: name, college: college, deptName: deptName, country: country, level: level, university: university }, decoded.id], (err, rese) => {
            if (err) {
               console.log(err)
            }
            else {//update the cookie
               const token = jwt.sign({ id: decoded.id, email: email }, process.env.JWT_SECRET, {
                  expiresIn: process.env.JWT_EXPIRES_IN
               })
               console.log("the token is: " + token);
               const cookieOption = {
                  expires: new Date(
                     Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                  ),
                  httpOnly: true
               }
               res.cookie('jwt', token, cookieOption);
               return res.render('SRhomepage', {
                  message: 'user information updated'
               })
            }
         })
      }
   })
}
exports.orgUpdateinfo = async (req, res) => {
   const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
   const { name, email, mobNum, organization, password } = req.body;
   let hashedPassword = await bcrypt.hash(password, 8);
   db.query('UPDATE users SET ? WHERE email=?', [{ email: email, password: hashedPassword, mobNum: mobNum }, decoded.email], async (erro, resu) => {
      if (erro) {
         return res.render("orgHP", {
            message:
               "The mobile number is already in use or mobile number is used",
         });
      }
      else {
         db.query('UPDATE organizationresearcher SET ? WHERE id=?', [{ name: name, organization: organization }, decoded.id], (err, rese) => {
            if (err) {
               console.log(err)
            }
            else {//update the cookie
               const token = jwt.sign({ id: decoded.id, email: email }, process.env.JWT_SECRET, {
                  expiresIn: process.env.JWT_EXPIRES_IN
               })
               console.log("the token is: " + token);
               const cookieOption = {
                  expires: new Date(
                     Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                  ),
                  httpOnly: true
               }
               res.cookie('jwt', token, cookieOption);
               return res.render('orgHP', {
                  message: 'user information updated'
               })
            }
         })
      }
   })
}


exports.advisorUP = async (req, res) => {
   const { email, password, mobNum, name } = req.body;
   let hashedPassword = await bcrypt.hash(password, 8);
   const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
   db.query("UPDATE users SET ? WHERE email=?", [{ email: email, mobNum: mobNum, password: hashedPassword }, decoded.email], (error, result) => {
      if (error) {
         return res.render('advisorHP', {
            message: 'The email is already in use or mobile number is used'
         })
      }
      else (
         db.query('UPDATE advisor SET name=? WHERE id=?', [name, decoded.id], (err, resul) => {
            if (err) {
               console.log(err);
            }
            else {
               const token = jwt.sign({ id: decoded.id, email: email }, process.env.JWT_SECRET, {
                  expiresIn: process.env.JWT_EXPIRES_IN
               })
               console.log("the token is: " + token);
               const cookieOption = {
                  expires: new Date(
                     Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                  ),
                  httpOnly: true
               }
               res.cookie('jwt', token, cookieOption);
               return res.render('advisorHP', {
                  message: 'user information updated'
               })
            }
         })
      )
   })
}
exports.deanUP = async (req, res) => {
   const { email, password, mobNum, name } = req.body;
   let hashedPassword = await bcrypt.hash(password, 8);
   const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
   db.query("UPDATE users SET ? WHERE email=?", [{ email: email, mobNum: mobNum, password: hashedPassword }, decoded.email], (error, result) => {
      if (error) {
         return res.render('deanHP', {
            message: 'The email is already in use or mobile number is used'
         })
      }
      else (
         db.query('UPDATE dean SET name=? WHERE id=?', [name, decoded.id], (err, resul) => {
            if (err) {
               console.log(err);
            }
            else {
               const token = jwt.sign({ id: decoded.id, email: email }, process.env.JWT_SECRET, {
                  expiresIn: process.env.JWT_EXPIRES_IN
               })
               console.log("the token is: " + token);
               const cookieOption = {
                  expires: new Date(
                     Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                  ),
                  httpOnly: true
               }
               res.cookie('jwt', token, cookieOption);
               return res.render('deanHP', {
                  message: 'user information updated'
               })
            }
         })
      )
   })
}
exports.deputyUP = async (req, res) => {
   const { email, password, mobNum, name } = req.body;
   let hashedPassword = await bcrypt.hash(password, 8);
   const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
   db.query("UPDATE users SET ? WHERE email=?", [{ email: email, mobNum: mobNum, password: hashedPassword }, decoded.email], (error, result) => {
      if (error) {
         return res.render('deputyHP', {
            message: 'The email is already in use or mobile number is used'
         })
      }
      else (
         db.query('UPDATE deputy SET name=? WHERE id=?', [name, decoded.id], (err, resul) => {
            if (err) {
               console.log(err);
            }
            else {
               const token = jwt.sign({ id: decoded.id, email: email }, process.env.JWT_SECRET, {
                  expiresIn: process.env.JWT_EXPIRES_IN
               })
               console.log("the token is: " + token);
               const cookieOption = {
                  expires: new Date(
                     Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                  ),
                  httpOnly: true
               }
               res.cookie('jwt', token, cookieOption);
               return res.render('deputyHP', {
                  message: 'user information updated'
               })
            }
         })
      )
   })
}

exports.missionUP = async (req, res) => {
   const { email, password, mobNum, name } = req.body;
   let hashedPassword = await bcrypt.hash(password, 8);
   const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
   db.query("UPDATE users SET ? WHERE email=?", [{ email: email, mobNum: mobNum, password: hashedPassword }, decoded.email], (error, result) => {
      if (error) {
         return res.render('missionHP', {
            message: 'The email is already in use or mobile number is used'
         })
      }
      else (
         db.query('UPDATE mission SET name=? WHERE id=?', [name, decoded.id], (err, resul) => {
            if (err) {
               console.log(err);
            }
            else {
               const token = jwt.sign({ id: decoded.id, email: email }, process.env.JWT_SECRET, {
                  expiresIn: process.env.JWT_EXPIRES_IN
               })
               console.log("the token is: " + token);
               const cookieOption = {
                  expires: new Date(
                     Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                  ),
                  httpOnly: true
               }
               res.cookie('jwt', token, cookieOption);
               return res.render('missionHP', {
                  message: 'user information updated'
               })
            }
         })
      )
   })
}
exports.rdUP = async (req, res) => {
   const { email, password, mobNum, name } = req.body;
   let hashedPassword = await bcrypt.hash(password, 8);
   const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
   db.query("UPDATE users SET ? WHERE email=?", [{ email: email, mobNum: mobNum, password: hashedPassword }, decoded.email], (error, result) => {
      if (error) {
         return res.render('rdHP', {
            message: 'The email is already in use or mobile number is used'
         })
      }
      else (
         db.query('UPDATE rd SET name=? WHERE id=?', [name, decoded.id], (err, resul) => {
            if (err) {
               console.log(err);
            }
            else {
               const token = jwt.sign({ id: decoded.id, email: email }, process.env.JWT_SECRET, {
                  expiresIn: process.env.JWT_EXPIRES_IN
               })
               console.log("the token is: " + token);
               const cookieOption = {
                  expires: new Date(
                     Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                  ),
                  httpOnly: true
               }
               res.cookie('jwt', token, cookieOption);
               return res.render('rdHP', {
                  message: 'user information updated'
               })
            }
         })
      )
   })
}
exports.cgmUP = async (req, res) => {
   const { email, password, mobNum, name } = req.body;
   let hashedPassword = await bcrypt.hash(password, 8);
   const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
   db.query("UPDATE users SET ? WHERE email=?", [{ email: email, mobNum: mobNum, password: hashedPassword }, decoded.email], (error, result) => {
      if (error) {
         return res.render('cgmHP', {
            message: 'The email is already in use or mobile number is used'
         })
      }
      else (
         db.query('UPDATE cgm SET name=? WHERE id=?', [name, decoded.id], (err, resul) => {
            if (err) {
               console.log(err);
            }
            else {
               const token = jwt.sign({ id: decoded.id, email: email }, process.env.JWT_SECRET, {
                  expiresIn: process.env.JWT_EXPIRES_IN
               })
               console.log("the token is: " + token);
               const cookieOption = {
                  expires: new Date(
                     Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                  ),
                  httpOnly: true
               }
               res.cookie('jwt', token, cookieOption);
               return res.render('cgmHP', {
                  message: 'user information updated'
               })
            }
         })
      )
   })
}
exports.genUP = async (req, res) => {
   const { password, mobNum, name } = req.body;
   let hashedPassword = await bcrypt.hash(password, 8);
   const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
   db.query("UPDATE users SET ? WHERE email=?", [{ mobNum: mobNum, password: hashedPassword }, decoded.email], (error, result) => {
      if (error) {
         return res.render('genHP', {
            message: 'The mobile number is used'
         })
      }
      else (
         db.query('UPDATE general SET name=? WHERE id=?', [name, decoded.id], (err, resul) => {
            if (err) {
               console.log(err);
            }
            else {
               const token = jwt.sign({ id: decoded.id, email: decoded.email }, process.env.JWT_SECRET, {
                  expiresIn: process.env.JWT_EXPIRES_IN
               })
               console.log("the token is: " + token);
               const cookieOption = {
                  expires: new Date(
                     Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                  ),
                  httpOnly: true
               }
               res.cookie('jwt', token, cookieOption);
               return res.render('genHP', {
                  message: 'user information updated'
               })
            }
         })
      )
   })
}
exports.eduUP = async (req, res) => {
   const { password, mobNum, name } = req.body;
   let hashedPassword = await bcrypt.hash(password, 8);
   const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
   db.query("UPDATE users SET ? WHERE email=?", [{ mobNum: mobNum, password: hashedPassword }, decoded.email], (error, result) => {
      if (error) {
         return res.render('eduHP', {
            message: 'The mobile number is used'
         })
      }
      else (
         db.query('UPDATE education SET name=? WHERE id=?', [name, decoded.id], (err, resul) => {
            if (err) {
               console.log(err);
            }
            else {
               const token = jwt.sign({ id: decoded.id, email: decoded.email }, process.env.JWT_SECRET, {
                  expiresIn: process.env.JWT_EXPIRES_IN
               })
               console.log("the token is: " + token);
               const cookieOption = {
                  expires: new Date(
                     Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                  ),
                  httpOnly: true
               }
               res.cookie('jwt', token, cookieOption);
               return res.render('eduHP', {
                  message: 'user information updated'
               })
            }
         })
      )
   })
}
//to here
exports.Dreq = async (req, res) => {
   const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
   db.query("DELETE FROM sr_request WHERE SRI_ID=?", [decoded.id], (error, result) => {
      if (error) {
         console.log(error);
      }
      else {
         return res.render('SRhomepage', {
            message: "request deleted"
         })
      }
   })
}