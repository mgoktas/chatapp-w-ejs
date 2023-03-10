const express = require('express')
let routerGET = express.Router()
const fs = require('fs')
const path = require('path')
const { where } = require('sequelize')
const config = require('../js/config/config')       
const emailService = require('../helpers/send-mail')
const crypto = require('crypto')
const reSize = require('../helpers/sharp')

const User = require('../models/user')
const UserType = require('../models/userType')

exports.getUser = async function(req,res){
    const username = req.params.username
    try {
        var user = await User.findOne({where: { username: username}},{include: UserType})
    }
    catch(err) {
        console.log(err)
    }
    var {page_name} = 'admin'
}

exports.adminContent = async function(req,res){
    try {
        var user = await User.findAll({
            include: UserType
        })
        var usertypes = await UserType.findAll()
    }
    catch(err) {
        console.log(err)
    }
    var {page_name} = 'admin'
    res.render('../views/admin/admin', {page_name:page_name, user, usertypes})
}

exports.adminEdit = async function(req,res){
    const userid = req.params.userid
    try {
        const user = await User.findOne({where: { id: userid}})
        page_name = 'edit'
        res.render('../views/admin/edit', {page_name:page_name, user})
    }
    catch(err) {
        console.log(err)
    }
}

exports.adminEditUserType = async function(req,res){
    const id = req.params.id
    try {
        const usertype = await UserType.findOne({where: { id: id}})
        page_name = 'editusertype'
        res.render('../views/admin/editusertype', {page_name:page_name, usertype})
    }
    catch(err) {
        console.log(err)
    }
}

exports.adminDelete = async function(req,res){
    const userid = req.params.userid

    try {
        const [users,] = await User.findByPk(userid)
        const user = users[0];

        res.render("../views/admin/delete", {user:user}
        );
    }
    catch(err) {
        console.log(err)
    }
}

exports.adminDeletePost = async function(req,res){
    const userid = req.body.id
    try {
        await User.destroy({where :{ id: userid}})
        res.redirect('/?action=delete&id=' + userid)
        }
    catch(err) {
        console.log(err)
    }
}

exports.adminEditPost = async function(req,res){
    const userid = req.params.userid
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    let img = req.body.image;
    
    if(req.file){
        fs.unlink('/Users/admin/Downloads/vsc/github-projects/live-chatapp w ejs/public/images/' + img, (err) => {
            if (err) {
                throw err;
            }
        
            console.log("file is deleted.");
        })
        img = req.file.filename;
    }

    try {
        await User.update({name: name, email:email, password:password, img:img}, {
            where: {
              id: userid
            }
          })
        res.redirect('/?action=edit&id=' + userid)
    }
    catch(err) {
        console.log(err)
    }
}


exports.adminResetPasswordPost = async function(req,res){
    const message = req.session.message
    delete req.session.message
    const {email} = req.body
        try   {
        const user = await User.findOne({where : {    email: email}})
            var token = crypto.randomBytes(32).toString('hex')
            user.resetToken = token
            user.resetTokenExpiry = Date.now() + (1000 * 60 * 60 )

            await user.save()

            emailService.sendMail({
                from: config.email.from,
                to: user.email,
                subject: 'Reset Password',
                html: `<p>To reset your password, please click the link below.</p>
                       <p>  <a href="http://127.0.0.1:4000/new-password/${token}"/>Reset my password</p>     
                `
            })

            req.session.message = {text: 'Please check your mail box.', class:'alert-success'}
            return res.redirect('login')}       
        
        catch(err){console.log(err)}
            var {page_name} = 'login'
            res.render('../views/login',{page_name:page_name, message})
    }
    
exports.adminResetPasswordGet = function(req,res){
        var {page_name} = 'reset'
        res.render('../views/reset-password', page_name, message)
}

exports.adminNewPasswordPost = async function(req,res){
    const token = req.params.token
    const passwordNew = req.body.password
    try {
        var user = await User.findOne({where : {
            resetToken: token,
        }})
        
        user.password = await bcrypt.hash(passwordNew, 10)
        user.resetToken = null
        user.resetTokenExpiry = null
        await user.save()
        
        req.session.message = {message: 'You have succesfully reset your password. You can now login.', class: 'alert-success'}
        
        return res.redirect('login')
        
            }
            catch(err){console.log(err)}
            const message = req.session.message

    var {page_name} = 'reset_password'
    res.render('../views/reset-password', page_name, message)
}
    
exports.logout = async function (req,res){
        await req.session.destroy()
        var {page_name} = 'home';
        res.render('../views/home', {page_name:page_name, action:req.query.action})
    }
    
    
    module.exports