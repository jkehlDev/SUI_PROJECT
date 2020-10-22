const {
    request,
    response
} = require('express');
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
router_main.get('/mentions', controller_main.getMentions);


router_main.get('/signup/', controller_main.getSignUp);
router_main.get('/signin/', controller_main.getSignIn);

router_main.post('/signin/', controller_SignInUp.signIn);
router_main.post('/signup/', controller_SignInUp.signUp);

// PAGES APRES SIGN IN SINON REDIRECTION VERS SIGNUP
router_main.use((request, response, next) => {
    if (!request.session.user.isSignIn) {
        response.redirect('/signup');
        return;
    }
    next();
});

router_main.get('/profil', controller_main.getProfil);
router_main.get('/signout/', controller_main.getSignOut);


module.exports = router_main;