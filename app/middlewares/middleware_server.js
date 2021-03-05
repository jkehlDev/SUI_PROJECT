/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <jkehl.dev@gmail.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return Johann KEHL.
 * ----------------------------------------------------------------------------
 */

const path = require('path');
/**
 * @author KEHL Johann <jkehl.dev@gmail.com>
 * @version 1.0.0
 * @description Server middleware module.
 */
const middleware_server = {

    /**
     * @method controller_main#init - INITIALISE SESSION AND LOCALS
     * @param {Express.Request} request - Express server request
     * @param {Express.Response} response - Express server response
     * @param {CallableFunction} next - next middleware
     */
    initilizeLocalsNdSession(request, response, next) {
        response.locals.rootpath = path.resolve('./app/views/');

        if (response.locals.message == null) {
            response.locals.message = {};
        }
        if (request.session.message == null) {
            request.session.message = {};
        } else {
            const message = request.session.message;
            if (Object.keys(message).length > 0) {
                response.locals.message = message;
                request.session.message = {};
            }
        }

        if (request.session.user == null) {
            request.session.user = {
                isSignIn: false,
                isAdmin: false
            };
        }
        response.locals.user = request.session.user;
        next();
    },
    /**
     * @method controller_main#redirect - CTRL IS SIGNIN OK OR SIGNUP
     * @param {Express.Request} request - Express server request
     * @param {Express.Response} response - Express server response
     * @param {CallableFunction} next - next middleware
     */
    isSignInOrRedirect(request, response, next) {
        if (!request.session.user.isSignIn) {
            response.redirect('/signin');
            return;
        }
        next();
    },
    /**
     * @method controller_main#isAdmin - CTRL IS ADMIN OK OR 404
     * @param {Express.Request} request - Express server request
     * @param {Express.Response} response - Express server response
     * @param {CallableFunction} next - next middleware
     */
    isAdminOrRedirect(request, response, next) {
        if (!(request.session.user.isAdmin && request.session.user.isSignIn)) {
            response.redirect('/error/404');
            return;
        }
        next();
    },
}
module.exports = middleware_server;