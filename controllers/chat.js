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
const Message = require('../models/messages')


exports.chatGet = async (req,res)=>{
    const senderId = req.params.senderId
    function getDayName(date = new Date(), locale = 'en-US') {
        return date.toLocaleDateString(locale, {weekday: 'long'});
      }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
      }

    function padTo1Digit(num) {
        return num.toString().padStart(1, '');
      }

    
    function convertMsToTime(milliseconds) {
        let seconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(minutes / 60)/24;
      
        seconds = seconds % 60;
        minutes = minutes % 60;
      
        hours = hours % 24;

        if(days>1){
            return `${Math.floor(padTo2Digits(days))} days`
        }

        if(hours>0){
            if(hours<10){
                return `${padTo1Digit(hours)} hours`
            }
            return `${padTo2Digits(hours)} hours`
        }
       

        if(minutes<1){
            return `1 minute`
        }

        if(minutes<10){
            return `${padTo1Digit(minutes)} minutes`
        }

      
        return `${padTo2Digits(minutes)} minutes`;
      }

    var users = await User.findAll({
        
    })

    var messages = await Message.findAll({raw: true})
    messages = JSON.stringify(messages)

    var timeNow = Date.now()
    await res.render('../views/chat',{users, messages, timeNow, convertMsToTime, getDayName, userId : req.session.userid})
}

exports.userPost = async function(req, res) {
    const text = await req.body.text;
    const senderId = await req.body.sender
    const receiverId = await req.body.receiver
    
    if(senderId){
    
    try {
        await Message.create({
            sendersId: senderId,
            senderId: senderId,
            receiverId: receiverId,
            msg: text,
            sentDate: Date()
        });

        return res.redirect('back')
    }

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
    }

module.exports;




