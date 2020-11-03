/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <jkehl.dev@gmail.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return Johann KEHL.
 * ----------------------------------------------------------------------------
 */
const messages = require('../data/errors_message.json');
/**
 * @author KEHL Johann <jkehl.dev@gmail.com>
 * @version 1.0.0
 * @description Renderring error class
 */
class RenderError {
    constructor(request, response) {
        this.request = request;
        this.response = response;
    }
    
    renderError(error) {
        console.error(error);
        if (messages[error.code]!=null) {
            this.request.session.message.error = messages[error.code];
        } else {
            this.request.session.message.error = error.code + '::' + error.message;
        }
        this.response.redirect('/');
    }

    renderErrorOnPage(error, renderPage) {
        console.error(error);
        if (messages[error.code]!=null) {
            this.request.session.message.error = messages[error.code];
        } else {
            this.request.session.message.error = error.code + '::' + error.message;
        }
        this.response.redirect(renderPage);
    }

    renderHTML406(error) {
        console.error(error);
        if (messages[error.code]!=null) {
            this.request.session.message.error = messages[error.code];
        } else {
            this.request.session.message.error = error.code + '::' + error.message;
        }
        this.response.redirect('/error/406');
    }

    renderHTML503(error) {
        console.error(error);
        if (messages[error.code]!=null) {
            this.request.session.message.error = messages[error.code];
        } else {
            this.request.session.message.error = error.code + '::' + error.message;
        }
        this.response.redirect('/error/503');
    }
}

module.exports = RenderError;
