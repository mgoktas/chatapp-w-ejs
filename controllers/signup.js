const express = require('express')
let routerGET = express.Router()
const fs = require('fs')
const { where } = require('sequelize')
const config = require('../js/config/config')       
const emailService = require('../helpers/send-mail')
const crypto = require('crypto')
const reSize = require('../helpers/sharp')
const bcrypt = require('bcrypt')
const {
    ref,
    uploadBytes,
    listAll,
    deleteObject,
    getDownloadURL,
  } = require("firebase/storage");
const User = require('../models/user')
const UserType = require('../models/userType')
const path = require('path')

const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //...
};
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp)


exports.adminSignUp = async function(req, res) {
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;
    const file = await req.file;
    
    var fileNew = await reSize.reSizeImage(await req.file.path)
    // img = await path.parse(req.file.path).name + '0' + path.parse(req.file.path).ext
    
    const hashedPassword = await bcrypt.hash(password, 10)
    
    try {
        if(password != password2) {
            throw new Error("Please check passwords and try again.");
        }
        
        var tryUsername = await User.findOne({where : {username: username}})
        var tryEmail = await User.findOne({where : {username: username}})
        
        if(tryUsername || tryEmail) {
            throw new Error("The email or username is already in use.");
        }

    

  const imageRef = ref(storage, `${username}/profile${path.extname(file.originalname)}`);
  const metatype = { contentType: file.mimetype, name: `${username}/profile${path.extname(file.originalname)}` };
  await uploadBytes(imageRef, file.buffer, metatype)
    .then((snapshot) => {
    })
    .catch((error) =>          {   throw new Error(error.message);
    });
  getDownloadURL(imageRef)
  .then(async (url) => {
    const newUser = await User.create({
        name: name,
        username: username,
        email: email,
        password: hashedPassword,
        img : url,
        lastLoginTime: Date.now()
    });
  })

        req.session.usernameLog = username
        
        emailService.sendMail({
            from: config.email.from,
            to: email,
            subject: 'Thank You'
        })
        req.session.message = {text: 'You can now login to your account', class:'alert-success'}
        return res.redirect('login')}
        
        
        catch(err) {
            let msg = "";
            
            if(err instanceof Error) {
                msg += err.message;
                
                res.render("signup", {
                    page_name: "signup",
                    message: {text: msg, class:"alert-danger"}
                })
            }
            
            
            
            
        }
        
        
    }

module.exports