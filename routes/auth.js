const express = require('express');
const {body}= require('express-validator');
const authController = require('../controllers/auth');
const User = require('../models/user');
const router = express.Router();


router.put('/signup',[
    body('email')
    .isEmail()
    .withMessage('Please Enter a Valid Email.')
    .custom((value,{req})=>{
        return User.findOne({email:value})
        .then(userDoc => {
            if(userDoc){
                return Promise.reject('Email exist');
            }
        });
    })
    .normalizeEmail(),
    body('password').trim().isLength({min:5})
],authController.signup);

router.post('/login',authController.login);

module.exports = router;