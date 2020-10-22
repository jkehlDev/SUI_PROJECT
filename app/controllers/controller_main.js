/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <jkehl.dev@gmail.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return Johann KEHL.
 * ----------------------------------------------------------------------------
 */

const bcrypt = require('bcrypt');
const dataMapper = require('../DB/dataMapper');

/**
 * @author KEHL Johann <jkehl.dev@gmail.com>
 * @version 1.0.0
 * @description Main controller module.
 */

const controller_main = {
    /**
     * @method controller_main#homePage - GET HOME PAGE RENDERING
     * @param {Express.Response} response - Express server response
     */
    homePage(_, response) {
        response.render('index');
    },

    /**
     * @method controller_main#getMentions - GET LEGAL MENTIONS PAGE RENDERING
     * @param {Express.Response} response - Express server response
     */
    getMentions(_, response) {
        const mentions_data = require('../data/mentions_legals.json')
        response.locals.mentions = mentions_data;
        response.render('mentions');
    },

    /**
     * @method controller_main#homePage - GET SIGN UP PAGE RENDERING
     * @param {Express.Response} response - Express server response
     */
    getSignUp(_, response) {
        response.render('signUp');
    },

    /**
     * @method controller_main#signIn - GET SIGN IN ACTION RENDERING
     * @param {Express.Response} response - Express server response
     */
    getSignIn(_, response) {
        response.render('signIn');
    },

    /**
     * @method controller_main#getProfil - GET PROFIL PAGE RENDERING
     * @param {Express.Response} response - Express server response
     */
    getProfil(_, response) {
        response.render('profil');
    },

    /**
     * @method controller_main#getSignOut - GET HOME PAGE RENDERING FROM SIGNOUT ACTION
     * @param {Express.Request} request - Express server request
     * @param {Express.Response} response - Express server response
     */
    getSignOut(request, response) {
        request.session.user = null;
        request.session.message.info = "Vous êtes déconnecté.";
        response.redirect('/');
    },

    /**
     * @method controller_main#getDeleteProfil - GET DELETE ACCOUNT PAGE RENDERING
     * @param {Express.Response} response - Express server response
     */
    getDeleteProfil(request, response) {
        response.render('delete_account');
    },
};

module.exports = controller_main;