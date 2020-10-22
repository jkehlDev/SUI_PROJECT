/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <jkehl.dev@gmail.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return Johann KEHL.
 * ----------------------------------------------------------------------------
 */
/**
 * @author KEHL Johann <jkehl.dev@gmail.com>
 * @version 1.0.0
 * @description Session middleware module.
 */
const sessionMiddleware = {

    /**
     * @method controller_main#homePage - GET HOME PAGE RENDERING
     * @param {Express.Request} request - Express server request
     * @param {Express.Response} response - Express server response
     * @param {CallableFunction} next - next middleware
     */
    init(request, response, next) {
        if (request.session.user == null) {
            request.session.user = {
                isSignIn: false
            };
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
        response.locals.user = request.session.user;
        next();
    }
}
module.exports = sessionMiddleware;