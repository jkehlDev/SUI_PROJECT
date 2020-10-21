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
 * @description Error controller module.
 */

const controller_error = {
    /**
     * @method controller_error#error_404 - GET ERROR 404 PAGE RENDERING
     * @param {Express.Request} request - Express server request
     * @param {Express.Response} response - Express server response
     * @param {CallableFunction} next - next Express middleware
     */
    error_404(request, response, next) {
        response.status(404).render('errors/error_404',{errorUrl : request.url});
        next();
    },
    /**
     * @method controller_error#error_406 - GET ERROR 404 PAGE RENDERING
     * @param {Express.Response} response - Express server response
     * @param {CallableFunction} next - next Express middleware
     */
    error_406(_, response, next) {
        response.status(406).render('errors/error_406');
        next();
    },
    /**
     * @method controller_error#error_503 - GET ERROR 404 PAGE RENDERING
     * @param {Express.Response} response - Express server response
     * @param {CallableFunction} next - next Express middleware
     */
    error_503(_, response, next) {
        response.status(503).render('errors/error_503');
        next();
    }
};

module.exports = controller_error;