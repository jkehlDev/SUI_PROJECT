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
  error_404(request, response) {
    response.locals.message.error = `Sorry, the page you request for isn't exist, please go back.`;
    response.status(404).render("errors/error_404");
  },
  /**
   * @method controller_error#error_406 - GET ERROR 406 PAGE RENDERING
   * @param {Express.Response} response - Express server response
   * @param {CallableFunction} next - next Express middleware
   */
  error_406(_, response) {
    response.status(406).render("errors/error_406");
  },
  /**
   * @method controller_error#error_503 - GET ERROR 503 PAGE RENDERING
   * @param {Express.Response} response - Express server response
   * @param {CallableFunction} next - next Express middleware
   */
  error_503(_, response) {
    response.status(503).render("errors/error_503");
  },

  /**
   * @method controller_error#error_500 - GET ERROR 500 PAGE RENDERING
   * @param {Express.Response} response - Express server response
   * @param {CallableFunction} next - next Express middleware
   */
  error_500(_, response) {
    response.status(500).render("errors/error_500");
  },
};

module.exports = controller_error;
