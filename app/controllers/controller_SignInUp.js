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
 * @description Sign In / Up controller module.
 */

const controller_signInUp = {
    /**
     * @method controller_signInUp#signIn - SIGN IN ACTION RENDERING
     * @param {Express.Response} response - Express server response
     */
    signIn(request, response) {
        let user = {};
        user.user_name = request.body.user_name;

        const verifyUser = (error, results) => {
            if (error) {
                response.status(406).render('errors/error_406');
                return;
            }
            let isSignIn = false;
            if (results.rows.length == 1) {
                if(bcrypt.compareSync(request.body.user_password, results.rows[0].user_password)){
                    user = results.rows[0];
                    isSignIn = true;
                }                
            }            
            if(isSignIn){
                request.session.user = user;
                request.session.message.info = 'Bienvenu ' + user.user_name + '.';
                response.redirect('/');
            }else{
                response.locals.message.error = 'Login incorrect.';
                response.render('signIn');
            }
        };
        dataMapper.getUser(user.user_name, verifyUser);
    },
    /**
     * @method controller_signInUp#signUp - SIGN UP ACTION RENDERING
     * @param {Express.Response} response - Express server response
     */
    signUp(request, response) {
        const user = {};
        user.user_name = request.body.user_name;
        user.user_mail = request.body.user_mail;
        user.user_password = request.body.user_password;

        const setUser = (error, results) => {
            if (error) {
                response.status(406).render('errors/error_406');
                return;
            }
            if (results.rows.length !== 1) {
                response.status(406).render('errors/error_406');
                return;
            } else {
                const user = results.rows[0];
                request.session.user = user;
                request.session.message.info = 'Nouvel utilisateur enregistré.';
                response.redirect('/');
            }
        };

        const verifyUser = (error, results) => {
            if (error) {
                response.status(406).render('errors/error_406');
                return;
            }
            if (results.rows.length > 0) {
                response.locals.message.error = 'Nom d\'utlisateur déjà utlisé.';
                response.render('signUp');
                return;
            } else {
                bcrypt.hash(user.user_password, 10, (error, hash) => {
                    if (error) {
                        response.status(406).render('errors/error_406');
                        return;
                    }
                    user.user_password = hash;
                    dataMapper.setUser(user, setUser);
                });
            }
        };
        dataMapper.getUser(user.user_name, verifyUser);
    }

};

module.exports = controller_signInUp;