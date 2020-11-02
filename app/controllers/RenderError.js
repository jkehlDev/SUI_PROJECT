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
    _request;
    _response;
    constructor(request, response) {
        this._request = request;
        this._response = response;
    }
    get request() {
        return this._request;
    }
    get response() {
        return this._response;
    }
    
    renderError(error) {
        console.error(error);
        if (messages[error.code]!=null) {
            request.session.message.error = messages[error.code];
        } else {
            request.session.message.error = error.code + '::' + error.message;
        }
        this.response.redirect('/');
    }

    renderErrorOnPage(error, renderPage) {
        console.error(error);
        if (messages[error.code]!=null) {
            request.session.message.error = messages[error.code];
        } else {
            request.session.message.error = error.code + '::' + error.message;
        }
        response.redirect(renderPage);
    }

    renderHTML403(error) {
        console.error(error);
        if (messages[error.code]!=null) {
            request.session.message.error = messages[error.code];
        } else {
            request.session.message.error = error.code + '::' + error.message;
        }
        response.redirect('error/error_406');
    }
    renderHTML506(error) {
        console.error(error);
        if (messages[error.code]!=null) {
            request.session.message.error = messages[error.code];
        } else {
            request.session.message.error = error.code + '::' + error.message;
        }
        response.redirect('error/error_503');
    }
}

module.exports = RenderError;
