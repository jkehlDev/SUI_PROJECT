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
    homePage(request, response) {
        console.log(request.session.user);
        response.render('index');
    },
    /**
     * @method controller_main#signIn - SIGN IN ACTION RENDERING
     * @param {Express.Response} response - Express server response
     */
    getSignIn(request, response) {
        console.log(request.session.user);
        response.render('signIn');
    },
    /**
     * @method controller_main#signIn - SIGN IN ACTION RENDERING
     * @param {Express.Response} response - Express server response
     */
    signIn(request, response) {
        const user_password = request.body.user_password;
        const user_name = request.body.user_name;

        response.render('index');
    },
     /**
     * @method controller_main#homePage - GET HOME PAGE RENDERING
     * @param {Express.Response} response - Express server response
     */
    getSignUp(request, response) {
        console.log(request.session.user);
        response.render('signUp');
    },
    /**
     * @method controller_main#signUp - SIGN UP ACTION RENDERING
     * @param {Express.Response} response - Express server response
     */
    signUp(request, response) {
        const user = {};
        user.user_name = request.body.user_name;
        user.user_lastName = request.body.user_lastName;
        user.user_firstName = request.body.user_firstName;
        user.user_mail = request.body.user_mail;
        user.user_password = request.body.user_password;

        const setUser = (error, results) => {
            if(error){
                response.status(406).render('errors/error_406');
                return;
            }
            if(results.rows.length !== 1 ){
                response.status(406).render('errors/error_406');
                return;
            }else{
                const user = results.rows[0];
                request.session.user = user;
                response.redirect('/');
            }            
        };

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

module.exports = controller_main;