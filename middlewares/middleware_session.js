const sessionMiddleware = {

    /**
     * @method controller_main#homePage - GET HOME PAGE RENDERING
     * @param {Express.Request} request - Express server request
     * @param {Express.Response} response - Express server response
     * @param {CallableFunction} next - next middleware
     */
    init(request, response, next) {
        if (!request.session.user) {
            request.session.user = {

            };
        }
        next();
    }
}
module.exports = sessionMiddleware;