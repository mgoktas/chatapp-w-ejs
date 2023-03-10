const express = require('express')
let routerGET = express.Router()
const fs = require('fs')
const { Op } = require('sequelize')
const User = require('../models/user')
const controller = require('../controllers/user')
const chat = require('../controllers/chat')
const isAuth = require('../middlewares/isAuth')


// const csrf = require('../middlewares/csrf')

routerGET.get('/admin/del/:userid', isAuth, controller.adminDelete)

routerGET.get('/admin/edit/:userid', isAuth, controller.adminEdit)

routerGET.get('/admin/edit/usertype/:id', isAuth, controller.adminEditUserType)

routerGET.get('/admin', isAuth, controller.adminContent)

routerGET.get('/chat', chat.chatGet)

routerGET.get('/moderator', isAuth,(req,res)=>{
    var {page_name} = 'moderator'
    res.render('../views/admin/moderator', {page_name:page_name})
})

routerGET.get('/login',(req,res)=>{
    const message = req.session.message
    delete req.session.message
    var {page_name} = 'login'
    res.render('../views/login',{page_name:page_name, message,
    })
})

routerGET.get('/reset-password',(req,res)=>{
    var {page_name} = 'reset_password'
    res.render('../views/reset-password',{page_name:page_name
    })
})

routerGET.get('/new-password/:token',async (req,res)=>{
    const token = req.params.token

    try {
        var user = await User.findOne({where : {
            resetToken: token,
            resetTokenExpiry: {
            [Op.gt] : Date.now()
        }
        }})

    }
    catch(err){console.log(err)}
    var {page_name} = 'reset_password'
    res.render('../views/new-password',{page_name:page_name, token, username: ''
    })
})

routerGET.get('/signup',(req,res)=>{
    var {page_name} = 'signup'
    res.render('../views/signup',{page_name:page_name})
})

routerGET.get('/about',(req,res)=>{
    var {page_name} = 'about'
    res.render('../views/about',{page_name:page_name})
})

routerGET.get('/logout', controller.logout)

routerGET.get('/',(req,res)=>{
    var {page_name} = 'home';
    res.render('../views/home', {page_name:page_name, action:req.query.action, userid:req.query.id})
})

module.exports = routerGET