/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <jkehl.dev@gmail.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return Johann KEHL.
 * ----------------------------------------------------------------------------
 */

const express = require('express');
const controller_main = require('../controllers/controller_main');
const controller_SignInUp = require('../controllers/controller_SignInUp');

/**
 * @author KEHL Johann <jkehl.dev@gmail.com>
 * @version 1.0.0
 * @description Main router module.
 */
const router_main = express.Router();

router_main.get('/', controller_main.homePage);
router_main.get('/signin/', controller_main.getSignIn);
router_main.post('/signin/', controller_SignInUp.signIn);
router_main.get('/signup/', controller_main.getSignUp);
router_main.post('/signup/', controller_SignInUp.signUp);

module.exports = router_main;