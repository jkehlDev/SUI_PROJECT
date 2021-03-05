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
 * @description Renderring error class
 */
class RenderError {
    constructor(request, response) {
        this.request = request;
        this.response = response;
    }

    renderError(error) {
        console.error(error);
        this.request.session.message.error = error.code + '::' + error.message;
        this.response.redirect('/');
    }

    renderHTML406(error) {
        console.error(error);
        this.request.session.message.error = 'ERROR 406 ::' + error.message;
        this.response.redirect('/error/406');
    }

    renderHTML503(error) {
        console.error(error);
        this.request.session.message.error = error.code + 'ERROR 503 ::' + error.message;
        this.response.redirect('/error/503');
    }

    renderHTML500(error) {
        console.error(error);
        this.request.session.message.error = error.code + 'ERROR 500 ::' + error.message;
        this.response.redirect('/error/500');
    }
}

module.exports = RenderError;