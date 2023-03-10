const express = require('express')
let routerGET = express.Router()
const fs = require('fs')
const path = require('path')
const { where } = require('sequelize')
const config = require('../js/config/config')       
const emailService = require('../helpers/send-mail')
const crypto = require('crypto')
const reSize = require('../helpers/sharp')
const bcrypt = require('bcrypt')

const User = require('../models/user')
const UserType = require('../models/userType')


exports.adminLogin = async function(req,res){

    const username = req.body.username
    const password = req.body.password
    
    try {

        var user = await User.findOne({where : {username: username}});
        req.session.message = {text:'Please check your username and password.', class:'alert-secondary'}

        if (!user) {
            console.log('user not found')
            return res.render('../views/login', {
                page_name: 'login',
                message: {text:'Please check your username and password.', class:'alert-secondary'}
            })
    }

    const match = await bcrypt.compare(password, user.password )

    if(match){ 
        user.lastLoginTime = Date.now()
        user.save()

        req.session.userid =  await user.id
        req.session.isAuth = true;
        if(user.typeId == 1){req.session.isAdmin = 1}
        else{                req.session.isAdmin = 0}
        const url = await req.query.returnUrl || '/';
        return res.redirect(url)
    } 
    else{
        console.log('user not found')
        return res.render('../views/login', {
            page_name: 'login',
            username: username,
            message: {text:'Please check your username and password.', class:'alert-secondary'}
        })    }


    return res.render('../views/login', {
        page_name: 'login',
        message: 'Wrong password or email.'
    })
    }

    catch(err) {
        console.log('err',err)
    }

    res.render('/', {user})
}

module.exports