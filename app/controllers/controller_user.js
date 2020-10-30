/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <jkehl.dev@gmail.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return Johann KEHL.
 * ----------------------------------------------------------------------------
 */

const bcrypt = require('bcrypt');
const {
    User
} = require('../models/user');
const RenderError = require('./RenderError');

/**
 * @author KEHL Johann <jkehl.dev@gmail.com>
 * @version 1.0.0
 * @description User controller module.
 */

const controller_user = {
    /**
     * @method controller_user#signIn - POST SIGN IN ACTION TRAITEMENT
     * @param {Express.Request} request - Express server request
     * @param {Express.Response} response - Express server response
     */
    signIn(request, response) {
        const renderError = new RenderError(request, response);
        User.findOne({
            where: {
                name: request.body.user_name
            }
        }).then(user => {
            if (!user) {
                response.locals.message.error = 'Login incorrect.';
                response.render('signin');
                return;
            }
            if (bcrypt.compareSync(request.body.user_password, user.password)) {
                request.session.message.info = 'Bienvenue ' + user.name + '.';
                request.session.user = user.getUserObj();
                response.redirect('/');
            } else {
                response.locals.message.error = 'Login incorrect.';
                response.render('signin');
            }
        }).catch(renderError.renderError);
    },

    /**
     * @method controller_user#signUp - POST SIGN UP ACTION TRAITEMENT
     * @param {Express.Request} request - Express server request
     * @param {Express.Response} response - Express server response
     */
    signUp(request, response) {
        if (request.body.user_password != request.body.user_passwordConfirm) {
            response.locals.message.error = `Impossible de créer l'utilisateur : Confirmation du mot de passe erronée.`;
            response.locals.fields = {
                user_name : request.body.user_name,
                user_email : request.body.user_email,
            };
            response.render('signup');
        } else {
            const renderError = new RenderError(request, response);
            User.findOne({
                where: {
                    name: request.body.user_name
                }
            }).then(user => {
                if (user) {
                    response.locals.message.error = 'Nom d\'utlisateur déjà utlisé.';
                    response.render('signup');
                    return;
                }
                User.create({
                    name: request.body.user_name,
                    email: request.body.user_email,
                    password: request.body.user_password,
                }).then(() => {
                    request.session.message.info = 'Compte utilisateur ajouté. Vous pouvez vous identifier.';
                    response.redirect('/signin');
                }).catch(renderError.renderError);
            }).catch(renderError.renderError);
        }
    },
    
    /**
     * @method controller_user#deleteProfil - POST SIGN UP ACTION TRAITEMENT
     * @param {Express.Request} request - Express server request
     * @param {Express.Response} response - Express server response
     */
    deleteProfil(request, response) {
        const renderError = new RenderError(request, response);
        User.findOne({
            where: {
                name: request.session.user.name
            }
        }).then(user => {
            if (!user) {
                response.locals.message.error = 'Login incorrect.';
                response.render('profil');
                return;
            }
            if (bcrypt.compareSync(request.body.user_password, user.password)) {
                User.destroy({
                    where: {
                        name: request.session.user.name
                    }
                }).then(() => {
                    request.session.message.info = 'Compte utilisateur supprimé.';
                    request.session.user = null;
                    response.redirect('/');
                }).catch(renderError.renderError);
            } else {
                response.locals.message.error = 'Login incorrect.';
                response.render('profil');
            }
        }).catch(renderError.renderError);
    },

    /**
     * @method controller_main#homePage - GET SIGN UP PAGE RENDERING
     * @param {Express.Response} response - Express server response
     */
    getSignUp(_, response) {
        response.render('signup');
    },

    /**
     * @method controller_main#signIn - GET SIGN IN ACTION RENDERING
     * @param {Express.Response} response - Express server response
     */
    getSignIn(_, response) {
        response.render('signin');
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
module.exports = controller_user;