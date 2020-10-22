const messages = require('../data/errors_message.json');
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
 * @description Error handeler module.
 */

const error_handeler = {
    /**
     * @method controller_error#redirectHtmlError - GET ERROR 404 PAGE RENDERING
     * @param {Error} request - Error
     * @param {String} renderPage - EJS page
     * @param {Express.Request} request - Express server request
     * @param {Express.Response} response - Express server response
     */
    redirectHtmlError(error, renderPage, request, response) {
        console.error(error);
        if (messages[error.code]!=null) {
            request.session.message.error = messages[error.code];
        } else {
            request.session.message.error = error.code + '::' + error.message;
        }
        response.redirect(renderPage);
    }
}
module.exports = error_handeler;