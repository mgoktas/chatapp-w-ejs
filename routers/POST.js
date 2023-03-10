const express = require('express')
let routerPOST = express.Router()
// const csrf = require('../middlewares/csrf')

const controller = require('../controllers/user')
const chat = require('../controllers/chat')
const auth = require('../controllers/signup')
const authLogin = require('../controllers/login')
const cors = require("cors");
const multer = require("multer");

const memoStorage = multer.memoryStorage();
const upload = multer({ memoStorage });

routerPOST.post('/admin/del/:id', controller.adminDeletePost)


routerPOST.post('/admin/edit/:userid', upload.single("pic"), controller.adminEditPost)

routerPOST.post('/chat', chat.userPost)

routerPOST.post('/login', authLogin.adminLogin)

routerPOST.post('/reset-password', controller.adminResetPasswordPost)

routerPOST.post('/new-password/:token', controller.adminNewPasswordPost)


routerPOST.post("/signup",  upload.single("pic"), auth.adminSignUp);

module.exports = routerPOST