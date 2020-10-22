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
const errorHandeler = require('../errors/errors_handeler');

/**
 * @author KEHL Johann <jkehl.dev@gmail.com>
 * @version 1.0.0
 * @description Sign In / Up controller module.
 */

const controller_signInUp = {
    /**
     * @method controller_signInUp#signIn - POST SIGN IN ACTION TRAITEMENT
     * @param {Express.Request} request - Express server request
     * @param {Express.Response} response - Express server response
     */
    signIn(request, response) {
        let user = {};
        user.user_name = request.body.user_name;

        const verifyUser = (error, results) => {
            if (error) {
                errorHandeler.redirectHtmlError(error, '/error/error_406', request, response);
                return;
            }
            let isSignIn = false;
            if (results.rows.length == 1) {
                if (bcrypt.compareSync(request.body.user_password, results.rows[0].user_password)) {
                    user = results.rows[0];
                    isSignIn = true;
                }
            }
            if (isSignIn) {
                user.isSignIn = true;
                request.session.user = user;
                request.session.message.info = 'Bienvenue ' + user.user_name + '.';
                response.redirect('/');
            } else {
                response.locals.message.error = 'Login incorrect.';
                response.render('signIn');
            }
        };
        dataMapper.getUser(user.user_name, verifyUser);
    },

    /**
     * @method controller_signInUp#signUp - POST SIGN UP ACTION TRAITEMENT
     * @param {Express.Request} request - Express server request
     * @param {Express.Response} response - Express server response
     */
    signUp(request, response) {
        const user = {};
        user.user_name = request.body.user_name;
        user.user_mail = request.body.user_mail;
        user.user_password = request.body.user_password;

        const setUser = (error, results) => {
            if (error) {
                errorHandeler.redirectHtmlError(error, '/error/error_406', request, response);
                return;
            }
            if (results.rows.length !== 1) {
                response.status(406).render('errors/error_406');
                return;
            } else {
                const user = results.rows[0];
                request.session.user = user;
                request.session.message.info = 'Compte utilisateur ajouté.';
                response.redirect('/');
            }
        };

        const verifyUser = (error, results) => {
            if (error) {
                errorHandeler.redirectHtmlError(error, '/error/error_406', request, response);
                return;
            }
            if (results.rows.length > 0) {
                response.locals.message.error = 'Nom d\'utlisateur déjà utlisé.';
                response.render('signUp');
                return;
            } else {
                bcrypt.hash(user.user_password, 10, (error, hash) => {
                    if (error) {
                        errorHandeler.redirectHtmlError(error, '/error/error_406', request, response);
                        return;
                    }
                    user.user_password = hash;
                    dataMapper.addUser(user, setUser);
                });
            }
        };
        dataMapper.getUser(user.user_name, verifyUser);
    },
        /**
     * @method controller_signInUp#deleteProfil - POST SIGN UP ACTION TRAITEMENT
     * @param {Express.Request} request - Express server request
     * @param {Express.Response} response - Express server response
     */
    deleteProfil(request, response) {
        const user = {};
        user.user_name = request.session.user.user_name;
        user.user_password = request.body.user_password;

        const deleteUser = (error, results) => {
            if (error) {
                errorHandeler.redirectHtmlError(error, '/error/error_406', request, response);
                return;
            }
                request.session.user = null;
                request.session.message.info = 'Compte utilisateur supprimé.';
                response.redirect('/');
        };
        const verifyUser = (error, results) => {
            if (error) {
                errorHandeler.redirectHtmlError(error, '/error/error_406', request, response);
                return;
            }
            let isSignIn = false;
            if (results.rows.length == 1) {
                if (bcrypt.compareSync(request.body.user_password, results.rows[0].user_password)) {
                    isSignIn = true;
                }
            }
            if (isSignIn) {
                dataMapper.deleteUser(user.user_name, deleteUser);
            } else {
                response.locals.message.error = 'Login incorrect.';
                response.render('profil');
            }
        };
        dataMapper.getUser(user.user_name, verifyUser);
    },
};
module.exports = controller_signInUp;